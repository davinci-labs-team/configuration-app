import { useSupabaseStore } from "@/stores/supabaseStore";
import JSZip from "jszip";
import type JSZipType from "jszip";
import type { SupabaseClient } from "@supabase/supabase-js";

export default abstract class SupabaseService {
    public static async setSupabaseConnection(url: string, service_role: string): Promise<boolean> {
        try {
            const supabaseStore = useSupabaseStore();

            supabaseStore.setSupabase(url, service_role);
            const supabaseClient = supabaseStore.client!;
            // Test the connection by making a simple query
            const { error } = await supabaseClient.from("User").select("id").limit(1);

            if (!error) {
                return true;
            }
            return false;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_: unknown) {
            return false;
        }
    }

    public static async checkAlreadyConfigured(): Promise<boolean> {
        const supabaseStore = useSupabaseStore();
        const supabaseClient = supabaseStore.client!;
        const response = await supabaseClient.from("User").select("id").limit(2);
        if (response && response.data && response.data.length) {
            return true;
        }

        return false;
    }

    public static async createAdminUser(email: string, password: string): Promise<boolean> {
        const supabaseStore = useSupabaseStore();
        const supabaseClient = supabaseStore.client!;
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });
        if (error) {
            console.error("Error creating admin user:", error.message);
            return false;
        }

        const supabaseUserId = data.user?.id;

        // Insert the user into the custom user table
        const { error: insertError } = await supabaseClient.from("User").insert({
            firstname: "Admin",
            lastname: "User",
            email: email,
            role: "ORGANIZER",
            supabaseUserId: supabaseUserId
        });

        if (insertError) {
            console.error("Error inserting user into custom table:", insertError.message);
            return false;
        }

        return true;
    }
    private static async backupStorage(
        supabaseClient: SupabaseClient,
        zip: JSZipType
    ): Promise<void> {
        const buckets = ["evaluations", "submissions", "users", "annonces"];
        for (const bucket of buckets) {
            // List only root files/folders, then recursively list subfolders
            await this._backupBucketRecursive(supabaseClient, zip, bucket, "");
        }
    }

    // Helper to recursively backup all files in a bucket
    private static async _backupBucketRecursive(
        supabaseClient: SupabaseClient,
        zip: JSZipType,
        bucket: string,
        path: string
    ): Promise<void> {
        const { data, error } = await supabaseClient.storage.from(bucket).list(path);
        if (error || !data) return;
        for (const file of data) {
            if (file.name && file.id && file.metadata && file.updated_at) {
                // It's a file
                const filePath = path ? `${path}/${file.name}` : file.name;
                const { data: fileData, error: fileError } = await supabaseClient.storage
                    .from(bucket)
                    .download(filePath);
                if (!fileError && fileData) {
                    const arrBuf = await fileData.arrayBuffer();
                    const storageFolder = zip.folder("storage");
                    const bucketFolder = storageFolder ? storageFolder.folder(bucket) : null;
                    if (bucketFolder) {
                        bucketFolder.file(filePath, arrBuf);
                    }
                }
            } else if (file.name && file.id && file.metadata === null) {
                // It's a folder
                const folderPath = path ? `${path}/${file.name}` : file.name;
                await this._backupBucketRecursive(supabaseClient, zip, bucket, folderPath);
            }
        }
    }

    private static async backupDB(supabaseClient: SupabaseClient, zip: JSZipType): Promise<void> {
        // List of tables to backup.
        const tables = ["User"];
        for (const table of tables) {
            const { data, error } = await supabaseClient.from(table).select("*");
            if (!error && data) {
                const dbFolder = zip.folder("database");
                if (dbFolder) {
                    dbFolder.file(`${table}.json`, JSON.stringify(data, null, 2));
                }
            }
        }
    }

    public static async handleSaveAndReset(): Promise<boolean> {
        try {
            const supabaseStore = useSupabaseStore();
            const supabaseClient = supabaseStore.client as SupabaseClient;
            const zip = new JSZip();

            // Backup storage
            await this.backupStorage(supabaseClient, zip);
            // Backup DB
            await this.backupDB(supabaseClient, zip);

            // Generate zip and trigger download
            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            const a = document.createElement("a");
            a.href = url;
            a.download = `backup_${new Date().toISOString()}.zip`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            return true;
        } catch (e) {
            console.error("Backup failed", e);
            return false;
        }
    }
}
