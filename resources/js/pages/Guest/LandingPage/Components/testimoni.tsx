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
            className="relative flex min-h-screen flex-col justify-center gap-y-20 overflow-hidden bg-cover bg-center bg-no-repeat object-center p-10 pt-32 md:justify-start lg:items-center lg:p-20 lg:px-32 lg:pt-35 xl:h-screen xl:flex-row"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <motion.div
                initial={{ y: !lg ? -50 : 0, opacity: 0, scale: lg ? 0.8 : 1 }}
                whileInView={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                className="relative flex w-full origin-left flex-col gap-y-5 rounded-4xl bg-[#AFB3FF] p-10 text-xl font-semibold text-[#3B387E] lg:gap-y-10 lg:p-20 xl:h-full xl:w-3/5"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2/3 lg:left-0 lg:-translate-x-0">
                    <div className="relative flex h-[15vh] max-h-20 w-[15dvh] max-w-20 -translate-y-1 flex-col items-center justify-center rounded-full bg-[#5961BE] font-bold text-white lg:h-[20vh] lg:max-h-25 lg:w-[20dvh] lg:max-w-25 lg:translate-x-1/2 xl:max-h-30 xl:max-w-30">
                        <h1 className="absolute top-1/2 -translate-y-1/3 text-[3rem] lg:text-[4rem] xl:text-[5rem]">“</h1>
                    </div>
                </div>
                <h1 className="text-center text-3xl font-bold lg:text-left lg:text-4xl xl:text-5xl">Testimoni</h1>
                <p className="lg:text-md w-full text-sm xl:w-2/3 xl:text-xl">Gimana sih pendapat mereka tentang produk Pak Telang?</p>
                <Button
                    onClick={() => router.get(route('produk'))}
                    className="cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#4e55a1] lg:mx-auto lg:w-1/2 xl:mx-0 xl:w-1/3"
                >
                    Pesan Sekarang <LucideArrowRight color="#EBEFFF" />
            </Button>
                <div className="absolute left-0 hidden h-full w-full translate-y-1/2 gap-x-9 py-20 lg:top-0 lg:translate-x-7/10 lg:translate-y-0 xl:top-1/2 xl:flex xl:h-[110%] xl:-translate-y-1/2">
                    {Array.from({ length: 2 }).map((i, index) => (
                        <motion.div
                            initial={{ x: -300 + index * -300, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1, transition: { duration: 0.3 + index * 0.6, delay: 0.3 * index } }}
                            key={index}
                            className="flex flex-1/2 flex-col gap-y-5 rounded-lg bg-[#5961BE] p-10 lg:gap-y-2.5 lg:p-5 xl:gap-y-5 xl:p-10"
                        >
                            <div className="relative flex-1/2">
                                <div className="absolute top-0 h-full w-1/4 -translate-x-2/3 -translate-y-1/3 rounded-lg bg-transparent px-8 pt-16 pb-24 text-center">
                                    <div className="relative flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#AFB3FF] font-bold text-white">
                                        <h1 className="absolute top-4/7 -translate-y-1/3 text-5xl">“</h1>
                                    </div>
                                </div>
                                <img src="Asset\Image\Testimoni.png" alt="" className="h-full w-full object-fill" />
                            </div>
                            <div className="flex flex-1/2 flex-col justify-between gap-y-5 text-white lg:gap-y-2.5 xl:gap-y-5">
                                <p className="text-sm font-extralight">
                                    {index % 2 == 0
                                        ? 'Rasanya seger bangett! Awalnya coba karena penasaran, tapi sekarang malah jadi favorit dan minum tiap hari. Nggak cuma enak, tapi juga bikin badan jadi enteng'
                                        : 'Biasanya kalau beli minuman herbal rasanya aneh, tapi yang ini beda! Rasanya seger, manisnya pas, dan yang paling penting manfaatnya berasa banget di tubuh. Fix, bakal beli lagi!'}
                                </p>
                                <h1 className="lg:text-md">{index % 2 == 0 ? 'Dinda' : 'Mika'}</h1>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className="grid h-full w-full grid-cols-1 gap-9 md:grid-cols-2 xl:hidden">
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
                                {index % 2 == 0
                                    ? 'Rasanya seger bangett! Awalnya coba karena penasaran, tapi sekarang malah jadi favorit dan minum tiap hari. Nggak cuma enak, tapi juga bikin badan jadi enteng'
                                    : 'Biasanya kalau beli minuman herbal rasanya aneh, tapi yang ini beda! Rasanya seger, manisnya pas, dan yang paling penting manfaatnya berasa banget di tubuh. Fix, bakal beli lagi!'}
                            </p>
                            <h1>{index % 2 == 0 ? 'Dinda' : 'Mika'}</h1>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
