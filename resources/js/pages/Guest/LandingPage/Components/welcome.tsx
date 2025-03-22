import { Button } from '@/components/ui/button';
import { LucideArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function welcome() {
    return (
        <div className="relative h-screen overflow-hidden bg-[#EBEFFF]">
            <div className="absolute top-1/2 left-1/2 z-40 w-full -translate-1/2 gap-x-20 md:flex xl:px-96">
                <motion.img
                    src="Asset\Image\bungaTelangWelcome.png"
                    alt=""
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1, transition: { duration: 0.3 }, animation: 'ease-in-out' }}
                />
                <div className="flex flex-col gap-y-5">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 100, transition: { duration: 0.5 } }}
                        className="text-5xl font-[1000] text-[#3B387E]"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod{' '}
                    </motion.h1>
                    <motion.div initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 100, transition: { duration: 0.5 } }}>
                        <Button className="w-1/4 cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#5961BE]">
                            Get Started <LucideArrowRight color="#EBEFFF" />
                        </Button>
                    </motion.div>
                </div>
            </div>
            <img src="Asset\Particle\landingPageWelcome.svg" alt="" className="absolute right-[6rem] bottom-0 z-0 translate-y-20 scale-125" />
        </div>
    );
}
