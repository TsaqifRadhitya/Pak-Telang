import Heading from '@/components/heading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Diproses() {
    return (
        <div className="flex flex-2/5 flex-col justify-between rounded-xl bg-white p-10 text-center shadow-sm">
            <Heading className="font-bold text-[#048730]" title="Pesanan Anda Sedang Diproses" />
            <DotLottieReact loop src="https://lottie.host/e77fe27f-0ca9-4ef1-b6ba-777ecc5a385e/IBxMUwOhiS.lottie" className="w-full" autoplay />
            <p className="text-xl">Mohon Maaf Untuk Saat Ini Pesanan Anda Tidak Dapat Kami Proses. Coba beberapa saat lagi</p>
        </div>
    );
}
