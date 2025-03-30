import { supabaseService } from "./supabase";

export class supabaseImage extends supabaseService {

    private basePath: string;

    constructor(user: string, type: 'Image' | 'Video' | 'Mou') {
        super()
        this.basePath = `${type}/${user}/`
    }

    public async uploadBatch(params: FileList) {
        const promise = Object.values(params).map(async (item) => {
            await this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}${item.name}`, item, { contentType: item.type })
        })
        return Promise.all(promise)
    }

    public async upsertProfile(params: File) {

        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}profile`, params, { contentType: params.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
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
            return await this.supabaseConnection.storage.from('paktelang').getPublicUrl(params).data.publicUrl
        } else if (Array.isArray(params)) {
            return params.map(async (path) => this.supabaseConnection.storage.from('paktelang').getPublicUrl(path))
        }
    }
}
