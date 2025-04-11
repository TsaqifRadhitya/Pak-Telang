import { User } from '../types/index';
import { address } from '../types/address';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
export interface mouDataReplacer {
    User: User,
    address?: address
}

export class mouEditor {

    static async combiner(){
        // await this.replacer()
    }

    static async replacer(sourceUrl: string, data: mouDataReplacer): Promise<String> {
        const response = await fetch(sourceUrl)
        const zip = new PizZip(await response.arrayBuffer());
        const doc = new Docxtemplater(zip, {
            delimiters: {
                start: '{{',
                end: '}}'
            }
        })
        console.log(doc)
        doc.setData({
            "TANGGAL": new Date().toLocaleString('id-ID'),
            "TANGGAL DATE": new Date().toLocaleString('id-ID'),
            "NAMA PIHAK KEDUA": data.User.name,
            "JABATAN PIHAK KEDUA": "Owner",
            "ALAMAT": "Jl.Manggar No.127",
            "PIHAK KEDUA": "CV. Amanah Berkah"
        });

        doc.render();
        const output = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        return URL.createObjectURL(output)
    }
}
