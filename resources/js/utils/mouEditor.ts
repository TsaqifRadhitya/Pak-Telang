import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { supabaseService } from '../services/supabase';
import mitra from "@/types/mitra";


export class mouEditor extends supabaseService {

    private static mou: Blob | undefined;
    private basePath: string;

    constructor(user: string) {
        super()
        this.basePath = `Mou/${user}/`
    }

    static download(namaUsaha : string) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(this.mou as Blob);
        link.download = `Mou ${namaUsaha}.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    public async uploadMoU(params: File) {
        const result = await this.supabaseConnection.storage.from('paktelang').update(`${this.basePath}/MoU/${params.name}`, params, { contentType: params.type, upsert: true })
        const url = await this.getUrl(result.data!.path)
        return url
    }

    private static terbilang(n: number): string {
        const satuan = [
            '', 'satu', 'dua', 'tiga', 'empat', 'lima',
            'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'
        ];

        if (n < 12) return satuan[n];
        if (n < 20) return `${satuan[n - 10]} belas`;
        if (n < 100) return `${satuan[Math.floor(n / 10)]} puluh ${satuan[n % 10]}`.trim();
        if (n < 200) return `seratus ${this.terbilang(n - 100)}`.trim();
        if (n < 1000) return `${satuan[Math.floor(n / 100)]} ratus ${this.terbilang(n % 100)}`.trim();
        if (n < 2000) return `seribu ${this.terbilang(n - 1000)}`.trim();
        if (n < 1000000) return `${this.terbilang(Math.floor(n / 1000))} ribu ${this.terbilang(n % 1000)}`.trim();
        if (n < 1000000000) return `${this.terbilang(Math.floor(n / 1000000))} juta ${this.terbilang(n % 1000000)}`.trim();

        return n.toString(); // fallback
    }

    private static dateToStringLocale(tanggalStr: string): string {
        const hariMap = {
            Sun: "Minggu",
            Mon: "Senin",
            Tue: "Selasa",
            Wed: "Rabu",
            Thu: "Kamis",
            Fri: "Jumat",
            Sat: "Sabtu"
        };

        const bulanMap = {
            0: "satu",
            1: "dua",
            2: "tiga",
            3: "empat",
            4: "lima",
            5: "enam",
            6: "tujuh",
            7: "delapan",
            8: "sembilan",
            9: "sepuluh",
            10: "sebelas",
            11: "dua belas"
        };

        const date = new Date(tanggalStr);
        const hari = hariMap[tanggalStr.slice(0, 3) as keyof typeof hariMap];

        const tanggal = date.getDate();
        const bulan = date.getMonth(); // 0-based
        const tahun = date.getFullYear();

        const tanggalTerbilang = this.terbilang(tanggal);
        const bulanTerbilang = Object.entries(bulanMap)[bulan][1];
        const tahunTerbilang = this.terbilang(tahun);

        return `${hari}, tanggal ${tanggalTerbilang} bulan ${bulanTerbilang} tahun ${tahunTerbilang}`;
    }

    static async replacer(data: mitra): Promise<Blob> {
        const response = await fetch(import.meta.env.VITE_TEMPLATE_MOU)
        console.log(response)
        const zip = new PizZip(await response.arrayBuffer());
        const doc = new Docxtemplater(zip, {
            delimiters: {
                start: '{{',
                end: '}}'
            }
        })
        doc.setData({
            "TANGGAL": this.dateToStringLocale(new Date().toDateString()),
            "TANGGAL DATE": `(${new Date().toLocaleDateString('id-ID').replaceAll('/',' - ')})`,
            "NAMA PIHAK KEDUA": data.user.name,
            "ALAMAT": `${data.address?.address}, ${data.address.districtName}, ${data.address.cityName}, ${data.address.province} ${data.address.postalCode}`,
            "PIHAK KEDUA": data.namaUsaha
        });

        doc.render();
        const output = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        this.mou = output
        return output
    }
}
