import Heading from '@/components/heading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function MenungguPembayaran() {
    return (
        <div className="flex flex-2/5 flex-col justify-between rounded-xl bg-white p-10 text-center shadow-sm">
            <Heading className="font-bold text-[#FFA114]" title="Segera Lakukan Pembayaran" />
            <DotLottieReact src="https://lottie.host/d3553a30-65fc-40db-8bb4-ee6833b42553/xx35T6hHKB.lottie" className="w-full" autoplay />
            <p className="text-xl">Segera Lakukan Pembayaran Agar Pesanan Anda Bisa Segera Kami Proses</p>
        </div>
    );
}
