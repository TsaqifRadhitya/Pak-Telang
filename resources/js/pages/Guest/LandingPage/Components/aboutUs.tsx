import { Button } from '@/components/ui/button';
import { currentMediaQuerry } from '@/hooks/useMediaQuery';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LucideArrowRight } from 'lucide-react';

export default function About() {
    const { sm, md, lg, xl, xxl } = currentMediaQuerry();
    return (
        <div className="object-center relative min-h-screen overflow-hidden bg-[#EBEFFF] p-6">
            <div className=" z-30 flex w-full flex-col gap-y-10 p-6 md:gap-y-20 md:p-20 md:px-32 lg:gap-y-20">
                <h1 className="text-center text-4xl font-bold text-[#3B387E] md:text-5xl xl:text-6xl">About Us</h1>
                <div className="flex flex-col-reverse items-center gap-10 md:gap-x-20 lg:flex-row xl:items-start">
                    <article className="w-full space-y-14 xl:space-y-10 py-5 font-bold text-[#3B387E] md:flex-2/3 md:text-3xl">
                        <p className="text-[1rem] xl:text-xl">
                            Pak Telang hadir untuk membawa kebaikan alam yang baik untuk tubuhmu. Dengan bahan-bahan alami seperti bunga telang yang
                            kaya antioksidan dan daun mint yang menyegarkan, Setiap botolnya bukan sekadar pelepas dahaga, tetapi juga menjadi
                            relaksasi yang menyehatkan.
                        </p>
                        <p className="text-[1rem] xl:text-xl">
                            Kami percaya bahwa minuman bukan hanya sekadar menyegarkan, melainkan harus menjadi bagian dari gaya hidup sehat. Tanpa
                            pewarna buatan, tanpa pengawet, hanya kebaikan asli dari alam. Rasakan harmoni rasa dan manfaat dalam setiap tegukan
                            bersama Pak Telang!
                        </p>
                        <p className="text-[1rem] xl:text-xl">Siap untuk menjadi lebih sehat?</p>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                            className="z-30 origin-bottom"
                        >
                            <Button
                                onClick={() => router.get(route('produk'))}
                                className="w-full cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#4e55a1] sm:w-1/2 lg:w-1/3"
                            >
                                Pesan Sekarang <LucideArrowRight color="#EBEFFF" />
                            </Button>
                        </motion.div>
                    </article>
                    <div className="relative w-full max-w-2/5 md:w-2/5 xl:w-2/5">
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0, rotate: -60 }}
                            whileInView={{ scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.5 } }}
                            src="Asset/Image/bungaTelangAboutUs.png"
                            alt=""
                            className="w-full origin-bottom-right rounded-3xl"
                        />
                        <img
                            src="Asset/Particle/particleAboutUs2.svg"
                            alt=""
                            className="absolute right-0 bottom-0 w-1/4 translate-1/3 md:w-1/2 md:translate-x-1/2 md:translate-y-1/3 xl:w-1/5"
                        />
                    </div>
                </div>
            </div>
            <img src="Asset/Particle/particleAboutUs1.svg" alt="" className="absolute top-0 left-0 w-1/12 translate-1/3" />
            <img
                src="Asset/Particle/particleAboutUs2.svg"
                alt=""
                className="absolute bottom-0 left-0 z-0 hidden w-1/12 translate-x-1/3 -translate-y-1/3 md:block"
            />
        </div>
    );
}
