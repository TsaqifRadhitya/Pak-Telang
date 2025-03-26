import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LucideArrowRight } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#EBEFFF] px-6 md:px-12">
            <div className="relative z-40 mx-auto flex max-w-5xl flex-col items-center gap-x-10 gap-y-10 text-center md:flex-row md:text-left">
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
                        className="text-2xl font-extrabold text-[#3B387E] md:text-5xl"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </motion.h1>
                    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}>
                        <Button className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#5961BE] text-[#EBEFFF] hover:bg-[#5961BE] lg:w-1/3">
                            Get Started <LucideArrowRight color="#EBEFFF" />
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Background Image */}
            <motion.img
                src="Asset/Particle/landingPageWelcome.svg"
                alt=""
                className="absolute right-0 bottom-0 z-0 translate-y-1/3 scale-75 lg:scale-100 xl:scale-125"
                style={{ transformOrigin: 'right' }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1, transition: { duration: 0.5 } }}
            />
        </div>
    );
}
