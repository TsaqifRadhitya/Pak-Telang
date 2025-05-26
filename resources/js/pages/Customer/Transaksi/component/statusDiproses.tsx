import Heading from '@/components/heading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Diproses() {
    return (
        <div className="flex flex-2/5 flex-col justify-between space-y-5 rounded-xl bg-white p-10 text-center shadow-sm lg:space-y-0">
            <Heading className="text-md font-bold text-[#048730] md:text-xl" title="Pesanan Anda Sedang Diproses" />
            <DotLottieReact loop src="https://lottie.host/e77fe27f-0ca9-4ef1-b6ba-777ecc5a385e/IBxMUwOhiS.lottie" className="w-full" autoplay />
            <p className="text-sm md:text-xl">Mohon Tunggu Pesanan Anda sedang Kami Proses</p>
        </div>
    );
}
