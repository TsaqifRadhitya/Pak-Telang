import Heading from '@/components/heading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function MenungguPembayaran() {
    return (
        <div className="flex flex-2/5 flex-col justify-between rounded-xl bg-white p-10 text-center shadow-sm">
            <Heading className="font-bold text-[#FFA114]" title="Segera Lakukan Pembayaran" />
            <DotLottieReact loop src="https://lottie.host/bb515c7b-6c2f-4be6-9dac-59f6787e9106/9tvxhemuPn.lottie" className="w-full" autoplay />
            <p className="text-xl">Segera Lakukan Pembayaran Agar Pesanan Anda Bisa Segera Kami Proses</p>
        </div>
    );
}
