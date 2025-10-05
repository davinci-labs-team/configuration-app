import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSupabaseStore = defineStore("supabaseStore", () => {
    const client = ref<SupabaseClient | null>(null);
    const setSupabase = (url: string, service_role: string) => {
        client.value = createClient(url, service_role, {
            global: {
                headers: {
                    apikey: service_role,
                    authorization: "Bearer " + service_role
                }
            }
        });
    };
    return { setSupabase, client };
});
