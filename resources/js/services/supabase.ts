import { createClient } from "@supabase/supabase-js";

export class supabaseService {
    protected supabaseConnection = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

    public async getUrl(params: string | string[]) {
        if (typeof params === 'string') {
            return await this.supabaseConnection.storage.from('paktelang').getPublicUrl(params).data.publicUrl
        } else if (Array.isArray(params)) {
            return Promise.all(params.map(async (path) => this.supabaseConnection.storage.from('paktelang').getPublicUrl(path).data.publicUrl))
        }
    }
}
