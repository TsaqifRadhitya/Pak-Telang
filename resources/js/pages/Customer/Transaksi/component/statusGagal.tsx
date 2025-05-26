import Heading from '@/components/heading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Gagal() {
    return (
        <div className="flex flex-2/5 flex-col space-y-5 lg:space-y-0 justify-between rounded-xl bg-white p-10 text-center shadow-sm">
            <Heading className="font-bold text-[#FFA114] text-md md:text-xl" title="Pesanan Anda Tidak Dapat Diproses" />
            <DotLottieReact loop src="https://lottie.host/3bdb1646-ab46-4425-8064-0e6d286ae63e/h2freDTaU6.lottie" className="w-2/3 mx-auto lg:w-full" autoplay />
            <p className="text-sm md:text-xl">Mohon Maaf Untuk Saat Ini Pesanan Anda Tidak Dapat Kami Proses. Coba beberapa saat lagi</p>
        </div>
    );
}
