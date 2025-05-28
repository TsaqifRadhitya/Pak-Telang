import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Banner({ handleScrollToForm }: { handleScrollToForm: () => void }) {
    return (
        <div className="min-h-screen w-full bg-[#EBEFFF]">
            <section className="flex min-h-screen w-full flex-col-reverse gap-10 px-5 py-20 text-right lg:flex-row lg:px-20">
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#3B387E] lg:flex-4/7">
                    <h1 className="w-full text-2xl text-left font-semibold lg:text-right lg:text-4xl">
                        Buka Peluang Baru: Ajukan Kemitraan dan Jadilah Bagian dari Perjalanan Kami!
                    </h1>
                    <p className="w-full text-left lg:text-right lg:text-xl">Pilihan minuman berkualitas untuk hari-harimu yang lebih sehat</p>
                    <Button
                        onClick={handleScrollToForm}
                        className="w-full cursor-pointer self-end bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:w-fit"
                    >
                        Donasi Sekarang <ArrowRight />
                    </Button>
                </div>
                <img src="/Asset/Image/DonasiBanner.png" className="mx-auto max-w-2/3 object-contain lg:mx-0 lg:max-w-max" alt="" />
            </section>
            <section className="min-h-screen w-full gap-y-2.5 gap-x-20 px-5 text-right flex-col lg:flex-row flex lg:px-20">
                <img src="/Asset/Image/bagibagi.png" className="mx-auto max-w-2/3 object-contain lg:mx-0 lg:max-w-max lg:flex-1/2" alt="" />
                <div className="flex flex-1/2 flex-col items-center justify-center gap-5 text-left text-[#3B387E] lg:flex-4/7">
                    <h1 className="w-full text-2xl lg:text-4xl font-semibold">Bersama Mitra, Kami Tumbuh</h1>
                    <p className="w-full">
                        Lihat bagaimana para mitra kami berkembang dan meraih sukses bersama. Setiap wajah di sini punya cerita, dan setiap cerita
                        dimulai dari satu keputusan: bergabung sebagai mitra kami.
                    </p>
                </div>
            </section>
        </div>
    );
}
