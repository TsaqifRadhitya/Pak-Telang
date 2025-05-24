import { imageCompresstionUtlis } from "@/utils/imageCompression";
import { supabaseService } from "./supabase";

export class supabaseImage extends supabaseService {

    private basePath: string;

    constructor(user: string, type: 'Image' | 'Video' | 'Mou' | 'Konten') {
        super()
        this.basePath = `${type}/${user}/`
    }

    public async uploadBatch(params: FileList) {
        const promise = Object.values(params).map(async (item) => {
            const compressedPhoto = await imageCompresstionUtlis(item)
            return this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}/Produk/${item.name}`, compressedPhoto, { contentType: item.type, upsert: true })
        })
        return await this.getUrl((await Promise.all(promise)).map((item) => (item.data?.path)) as string[])
    }

    public async uploadKonten(params: FileList | File[]) {
        try {
            const promise = Object.values(params).map(async (item) => {
                const compressedPhoto = await imageCompresstionUtlis(item)
                return this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}/${item.name}`, compressedPhoto, { contentType: item.type, upsert: true })
            })
            return await this.getUrl((await Promise.all(promise)).map((item) => (item.data?.path)) as string[])
        } catch {
            const promise = (params as File[]).map(async (item) => {
                const compressedPhoto = await imageCompresstionUtlis(item)
                return this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}/${item.name}`, compressedPhoto, { contentType: item.type, upsert: true })
            })
            return await this.getUrl((await Promise.all(promise)).map((item) => (item.data?.path)) as string[])
        }
    }

    public async uploadBuktiTf(param: File) {
        const compressedPhoto = await imageCompresstionUtlis(param)
        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}bukti/${param.name}`, compressedPhoto, { contentType: param.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
    }

    public async upsertProfile(params: File) {
        const compressedPhoto = await imageCompresstionUtlis(params)
        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}profile/profile`, compressedPhoto, { contentType: params.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
    }

    public async uploadBatchDapur(params: FileList) {
        const promise = Object.values(params).map(async (item) => {
            const compressedPhoto = await imageCompresstionUtlis(item)
            return this.supabaseConnection.storage.from('paktelang').upload(`${this.basePath}/fotodapur/${item.name}`, compressedPhoto, { contentType: item.type, upsert: true })
        })
        return await this.getUrl((await Promise.all(promise)).map((item) => (item.data?.path)) as string[])
    }

    public async upsertKTP(params: File) {
        const compressedPhoto = await imageCompresstionUtlis(params)
        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}ktp/fotoktp`, compressedPhoto, { contentType: params.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
    }

}
