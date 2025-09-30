import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default abstract class SupabaseService {
    static supabaseConnection: SupabaseClient | null = null;

    public static async setSupabaseConnection(url: string, service_role: string): Promise<boolean> {
        try {
            const connection = createClient(url, service_role);

            // Test the connection by making a simple query
            const { error } = await connection.from("User").select("id").limit(1);

            if (!error) {
                SupabaseService.supabaseConnection = connection;
                return true;
            }
            return false;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_: unknown) {
            return false;
        }
    }

    public static async checkAlreadyConfigured(): Promise<boolean> {
        const response = await this.supabaseConnection?.from("User").select("id").limit(2);
        if (response && response.data && response.data.length) {
            return true;
        }

        return false;
    }

    public static async handleSaveAndReset(): Promise<boolean> {
        return true; // Unimplemeted for now as the DB schema and the storage buckets are not final yet
    }
}
