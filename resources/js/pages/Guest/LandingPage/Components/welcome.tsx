import { Button } from '@/components/ui/button';
import { LucideArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Welcome() {
    return (
        <div className="relative h-screen overflow-hidden bg-[#EBEFFF] flex items-center justify-center px-6 md:px-12">
            <div className="relative z-40 flex flex-col md:flex-row items-center text-center md:text-left gap-y-10 gap-x-10 max-w-5xl mx-auto">
                {/* Gambar */}
                <motion.img
                    src="Asset/Image/bungaTelangWelcome.png"
                    alt=""
                    className="w-1/2 max-w-xs md:max-w-md lg:max-w-lg"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                />

                {/* Teks dan Tombol */}
                <div className="flex flex-col gap-y-5">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                        className="text-3xl md:text-5xl font-extrabold text-[#3B387E]"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </motion.h1>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                    >
                        <Button className="w-full lg:w-1/3 cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#5961BE] flex items-center justify-center gap-2">
                            Get Started <LucideArrowRight color="#EBEFFF" />
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Background Image */}
            <img
                src="Asset/Particle/landingPageWelcome.svg"
                alt=""
                className="absolute right-0 bottom-0 z-0 translate-y-1/3 scale-75 lg:scale-100 xl:scale-125"
                style={{ transformOrigin : "right" }}
            />
        </div>
    );
}
