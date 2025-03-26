import { supabaseService } from "./supabase";

export class supabaseImage extends supabaseService {

    private basePath: string;

    constructor(user: string, type: 'Image' | 'Video' | 'Mou') {
        super()
        this.basePath = `${type}/${user}/`
    }

    public async upload(params: FileList) {
        const promise = Object.values(params).map(async (item) => {
            await this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}${item.name}`, item, { contentType: item.type })
        })
        return Promise.all(promise)
    }

    public async update(path: string, resource: File) {
        return await this.supabaseConnection.storage.from('paktelang').update(path, resource)
    }

    public async delete(params: string | string[]) {
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
