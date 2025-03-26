import { supabaseService } from "./supabase";

export class supabaseImage extends supabaseService {

    private basePath: string;

    constructor(user: string) {
        super()
        this.basePath = `Image/${user}/`
    }

    public async uploadImage(params: FileList) {
        const promise = Object.values(params).map(async (item) => {
            await this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}${item.name}`, item, { contentType: item.type })
        })
        return Promise.all(promise)
    }

    public async deleteImage(params: string | string[]) {
        if (typeof params === 'string') {
            await this.supabaseConnection.storage.from('paktelang').remove([`${this.basePath}${params}`])
        } else if (Array.isArray(params)) {
            await this.supabaseConnection.storage.from('paktelang').remove(params.map((name) => `Image/${name}`))
        }
    }

    public async getUrl(params: string | string[]) {
        if (typeof params === 'string') {
            return await this.supabaseConnection.storage.from('paktelang').getPublicUrl(`${this.basePath}${params}`)
        } else if (Array.isArray(params)) {
            return params.map(async (path) => await this.supabaseConnection.storage.from('paktelang').getPublicUrl(`${this.basePath}${path}`))
        }
    }
}
