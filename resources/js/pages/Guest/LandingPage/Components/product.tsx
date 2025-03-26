import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import Heading from '../../../../components/heading';
import HeadingSmall from '../../../../components/heading-small';
export default function product() {
    return (
        <div className="min-h-screen space-y-10 bg-[#EBEFFF] p-5 lg:px-32 lg:py-20 xl:h-screen">
            <Heading title="Produk Kami" disableMb className="text-4xl font-black text-[#3B387E]" />
            <HeadingSmall title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. " className="font-black text-[#3B387E]" />
            <div className="relative mx-auto flex w-full max-w-9xl flex-col gap-y-10 px-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-10 xl:gap-20">
                {Array.from({ length: 3 }).map((i, index) => (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, delay: index * 0.3 } }}
                        viewport={{ amount : 0.2 }}
                        key={index}
                        className="relative mx-auto flex w-full origin-bottom flex-col rounded-2xl bg-[#EBEFFF] pb-5 shadow-xl 2xl:pb-10"
                    >
                        <div className="h-44 w-full rounded-t-xl bg-[#9A9FFF] 2xl:h-64"></div>
                        <div className="absolute top-0 left-1/2 mx-auto h-52 w-5/6 -translate-x-1/2 rounded-b-full bg-gradient-to-b from-[#9A9FFF] to-[#5961BE] 2xl:h-1/2 2xl:w-4/5"></div>
                        <div className="mt-12 w-3/5 rounded-r-full bg-[#5961BE] px-6 py-2 shadow-md 2xl:mt-20 2xl:w-2/5">
                            <h1 className="w-fit pr-4 text-md md:text-xl 2xl:text-xl font-medium text-white">Teh Telang</h1>
                        </div>
                        <p className="px-6 py-6 font-medium text-[#5961BE] 2xl:px-10 2xl:py-10 text-sm 2xl:text-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod.
                        </p>
                        <div className="mt-auto flex w-full items-center justify-between px-6 2xl:px-10">
                            <h1 className="text-md md:text-xl 2xl:text-2xl font-bold text-[#5961BE]">Rp2.500,00</h1>
                            <Button className="cursor-pointer rounded-full bg-transparent text-[#5961BE] ring-2 ring-[#5961BE] hover:bg-[#5961BE] hover:text-white">
                                Beli Sekarang
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
