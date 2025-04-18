import { User } from '../types/index';
import { addressType } from '../types/address';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { supabaseImage } from '@/services/imageStorage';
export interface mouDataReplacer {
    User: User,
    address?: addressType
}

export class mouEditor extends supabaseImage {

    public static mou: Blob | undefined;

    constructor(user: string, type: 'Image' | 'Video' | 'Mou') {
        super(user, type)
    }

    static download() {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(this.mou as Blob);
        link.download = 'Mou.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    public async uploadMoU(params : File) {
        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}/MoU/${params.name}`, params, { contentType: params.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
    }

    static async replacer(sourceUrl: string, data: mouDataReplacer): Promise<Blob> {
        const response = await fetch(sourceUrl)
        const zip = new PizZip(await response.arrayBuffer());
        const doc = new Docxtemplater(zip, {
            delimiters: {
                start: '{{',
                end: '}}'
            }
        })
        doc.setData({
            "TANGGAL": new Date().toLocaleString('id-ID'),
            "TANGGAL DATE": new Date().toLocaleString('id-ID'),
            "NAMA PIHAK KEDUA": data.User.name,
            "JABATAN PIHAK KEDUA": {},
            "ALAMAT": "Jl.Manggar No.127",
            "PIHAK KEDUA": "CV. Amanah Berkah"
        });

        doc.render();
        const output = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        this.mou = output;
        return output
    }
}
