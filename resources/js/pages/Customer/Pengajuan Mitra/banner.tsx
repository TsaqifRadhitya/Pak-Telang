import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function Banner({type} : {type : "Baru" | "Sudah Ada"}){
    return <section className="w-full min-h-screen bg-[#EBEFFF] gap-16 text-right text-[#3B387E] flex flex-col-reverse lg:flex-row lg:p-32 items-center">
        <div className="lg:w-2/3 w-full space-y-5">
            <h1 className="font-black text-[2.8rem] leading-14">Buka Peluang Baru: Ajukan <br/> Kemitraan dan Jadilah Bagian dari <br/> Perjalanan Kami!</h1>
            <h2 className="text-2xl">Pilihan minuman berkualitas untuk hari-harimu yang lebih <br/> sehat</h2>
            <Button
            onClick={() => router.get(route(type === "Baru" ? "customer.pengajuanmitra.create" : "customer.pengajuanmitra.status"))}
            className="bg-[#5961BE] hover:bg-[#4e55a1] cursor-pointer text-[#EBEFFF]">{type === "Baru" ? "Ajukan Mitra Sekarang" : "Lihat Pengajuan"} <ArrowRight/></Button>
        </div>
        <img src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Image/Group%2037276.webp" className="w-1/3" alt="" />
    </section>
}
