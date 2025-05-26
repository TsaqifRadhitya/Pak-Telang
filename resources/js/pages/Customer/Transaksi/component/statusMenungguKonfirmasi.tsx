import Heading from '@/components/heading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function MenungguKonfirmasi() {
    return (
        <div className="flex flex-2/5 flex-col justify-between rounded-xl space-y-5 lg:space-y-0 bg-white p-10 text-center shadow-sm">
            <Heading className='text-[#FFA114] font-bold text-md md:text-xl' title="Menunggu Pesanan Dikonfirmasi" />
            <DotLottieReact loop src="https://lottie.host/d3553a30-65fc-40db-8bb4-ee6833b42553/xx35T6hHKB.lottie" className='w-2/3 mx-auto lg:w-full' autoplay />
            <p className="text-sm md:text-xl">Mohon tunggu kami akan segera memproses pesanan Anda</p>
        </div>
    );
}
