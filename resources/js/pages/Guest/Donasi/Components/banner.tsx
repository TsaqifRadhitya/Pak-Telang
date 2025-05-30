import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Banner({ handleScrollToForm }: { handleScrollToForm: () => void }) {
    return (
        <div className="min-h-screen w-full bg-[#EBEFFF]">
            <section className="flex min-h-screen w-full flex-col-reverse gap-10 px-5 py-20 text-right lg:flex-row lg:px-20">
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#3B387E] lg:flex-4/7">
                    <h1 className="w-full text-left text-2xl font-semibold lg:text-right lg:text-4xl">
                        Satu Donasi Hari Ini Bisa Jadi Harapan untuk Masa Depan Mereka yang Penuh Arti
                    </h1>
                    <p className="w-full text-left lg:text-right lg:text-xl">Klik Donasi dan Tebarkan Kebaikan</p>
                    <Button
                        onClick={handleScrollToForm}
                        className="w-full cursor-pointer self-end bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:w-fit"
                    >
                        Donasi Sekarang <ArrowRight />
                    </Button>
                </div>
                <img src="/Asset/Image/DonasiBanner.png" className="mx-auto max-w-2/3 object-contain lg:mx-0 lg:max-w-max" alt="" />
            </section>
            <section className="flex min-h-screen w-full flex-col gap-x-20 gap-y-2.5 px-5 text-right lg:flex-row lg:px-20">
                <img src="/Asset/Image/bagibagi.png" className="mx-auto max-w-2/3 object-contain lg:mx-0 lg:max-w-max lg:flex-1/2" alt="" />
                <div className="flex flex-1/2 flex-col items-center justify-center gap-5 text-left text-[#3B387E] lg:flex-4/7">
                    <h1 className="w-full text-2xl font-semibold lg:text-4xl">Mari Jadi Bagian dari Kebaikan</h1>
                    <p className="w-full">Bersama Pak Telang, Jadilah Bagian dari Perjalanan Kebaikan yang Tak Pernah Usai</p>
                </div>
            </section>
        </div>
    );
}
