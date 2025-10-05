import { useSupabaseStore } from "@/stores/supabaseStore";

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

    public static async handleSaveAndReset(): Promise<boolean> {
        return true; // Unimplemeted for now as the DB schema and the storage buckets are not final yet
    }
}
