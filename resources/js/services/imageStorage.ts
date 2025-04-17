import { supabaseService } from "./supabase";

export class supabaseImage extends supabaseService {

    private basePath: string;

    constructor(user: string, type: 'Image' | 'Video' | 'Mou') {
        super()
        this.basePath = `${type}/${user}/`
    }

    public async uploadBatch(params: FileList) {
        const promise = Object.values(params).map((item) => {
            return this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}/Produk/${item.name}`, item, { contentType: item.type, upsert: true })
        })
        return await this.getUrl((await Promise.all(promise)).map((item) => (item.data?.path)) as string[])
    }

    public async upsertProfile(params: File) {
        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}profile/profile`, params, { contentType: params.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
    }

    public async uploadBatchDapur(params: FileList) {
        const promise = Object.values(params).map((item) => {
            return this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}/fotodapur/${item.name}`, item, { contentType: item.type, upsert: true })
        })
        return await this.getUrl((await Promise.all(promise)).map((item) => (item.data?.path)) as string[])
    }

    public async upsertKTP(params: File) {
        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}ktp/fotoktp`, params, { contentType: params.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
    }

    public async getUrl(params: string | string[]) {
        if (typeof params === 'string') {
            return await this.supabaseConnection.storage.from('paktelang').getPublicUrl(params).data.publicUrl
        } else if (Array.isArray(params)) {
            return Promise.all(params.map(async (path) => this.supabaseConnection.storage.from('paktelang').getPublicUrl(path).data.publicUrl))
        }
    }
}
