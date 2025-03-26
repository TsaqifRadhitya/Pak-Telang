import { Button } from '@/components/ui/button';
import { currentMediaQuerry } from '@/hooks/useMediaQuery';
import { router } from '@inertiajs/react';
import { LucideArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import backgroundImage from '../../../../../../public/Asset/Background Image/Testimoni.png';

export default function testimoni() {
    const { lg } = currentMediaQuerry();
    return (
        <div
            className="relative min-h-screen justify-center overflow-hidden bg-cover bg-center bg-no-repeat object-center p-10 pt-32 md:h-screen md:justify-start lg:flex-row flex-col flex gap-y-20 lg:items-center lg:p-20 lg:px-32"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <motion.div
                initial={{ y: !lg ? -50 : 0, opacity: 0, scale: lg ? 0.8 : 1 }}
                whileInView={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                className="relative flex w-full origin-left flex-col gap-y-5 rounded-4xl bg-[#AFB3FF] p-10 text-xl font-semibold text-[#3B387E] lg:h-4/5 lg:w-1/2 lg:gap-y-10 lg:p-20"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2/3 lg:left-0 lg:-translate-x-0">
                    <div className="relative flex h-[15vh] max-h-40 w-[15dvh] max-w-40 -translate-y-1 flex-col items-center justify-center rounded-full bg-[#5961BE] font-bold text-white lg:h-[20vh] lg:w-[20dvh]">
                        <h1 className="absolute top-1/2 -translate-y-1/3 text-[5rem]">“</h1>
                    </div>
                </div>
                <h1 className="text-center text-3xl font-black lg:text-left lg:text-5xl">Testimoni</h1>
                <p className="w-full text-sm md:w-2/3 lg:text-xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod.
                </p>
                <p className="w-full text-sm md:w-2/3 lg:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                <Button
                    onClick={() => router.get(route('produk'))}
                    className="cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#5961BE] lg:w-1/3"
                >
                    Pesan Sekarang <LucideArrowRight color="#EBEFFF" />
                </Button>
                <div className="absolute left-0 hidden h-full w-full translate-y-1/2 gap-x-9 py-20 lg:top-0 lg:flex lg:translate-x-7/10 lg:translate-y-0">
                    {Array.from({ length: 2 }).map((i, index) => (
                        <motion.div
                            initial={{ x: -300 + index * -300, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1, transition: { duration: 0.3 + index * 0.6, delay: 0.3 * index } }}
                            key={index}
                            className="flex flex-1/2 flex-col gap-y-5 rounded-lg bg-[#5961BE] p-10"
                        >
                            <div className="relative flex-1/2">
                                <div className="absolute top-0 h-full w-1/4 -translate-x-2/3 -translate-y-1/3 rounded-lg bg-transparent px-8 pt-16 pb-24 text-center">
                                    <div className="relative flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#AFB3FF] font-bold text-white">
                                        <h1 className="absolute top-4/7 -translate-y-1/3 text-5xl">“</h1>
                                    </div>
                                </div>
                                <img src="Asset\Image\Testimoni.png" alt="" className="h-full w-full object-fill" />
                            </div>
                            <div className="flex flex-1/2 flex-col gap-y-5 text-white">
                                <p className="font-extralight">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod.
                                </p>
                                <h1>Apipa</h1>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className="flex h-full w-full flex-col gap-y-9 lg:hidden">
                {Array.from({ length: 2 }).map((i, index) => (
                    <motion.div
                        initial={{ x: index % 2 === 0 ? -50 : 50 + index * (index % 2 === 0 ? -50 : 50), opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1, transition: { duration: 0.3 + index * 0.6, delay: 0.3 * index } }}
                        key={index}
                        className="flex flex-1/2 flex-col gap-y-5 rounded-lg bg-[#5961BE] p-10"
                    >
                        <div className="relative flex-1/2">
                            <div className="absolute top-0 h-full w-1/4 -translate-x-2/3 -translate-y-1/3 rounded-lg bg-transparent px-8 pt-16 pb-24 text-center">
                                <div className="relative flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#AFB3FF] font-bold text-white">
                                    <h1 className="absolute top-4/7 -translate-y-1/3 text-5xl">“</h1>
                                </div>
                            </div>
                            <img src="Asset\Image\Testimoni.png" alt="" className="h-full w-full object-fill" />
                        </div>
                        <div className="flex flex-1/2 flex-col gap-y-5 text-white">
                            <p className="font-extralight">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod.
                            </p>
                            <h1>Apipa</h1>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
