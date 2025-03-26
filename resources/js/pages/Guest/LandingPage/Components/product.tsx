import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion'; // Saya mengubah dari 'motion/react' karena sepertinya itu typo
import Heading from '../../../../components/heading';
import HeadingSmall from '../../../../components/heading-small';

export default function product() {
    return (
        <div className="flex min-h-screen flex-col gap-y-10 bg-[#EBEFFF] p-5 lg:px-32 lg:py-20 xl:h-screen">
            <Heading title="Produk Kami" disableMb className="text-4xl font-black text-[#3B387E]" />
            <HeadingSmall title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. " className="font-black text-[#3B387E]" />
            <div className="max-w-9xl relative mx-auto flex w-full flex-col gap-y-10 px-4 md:grid md:grid-cols-2 md:gap-5 lg:gap-10 xl:grid xl:h-full xl:grid-cols-3 xl:gap-20 xl:px-0">
                {Array.from({ length: 3 }).map((i, index) => (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, delay: index * 0.3 } }}
                        viewport={{ amount: 0.2 }}
                        key={index}
                        className="relative mx-auto flex h-full w-full flex-col rounded-2xl bg-[#EBEFFF] pb-5 shadow-xl"
                    >
                        <div className="h-44 w-full rounded-t-xl bg-[#9A9FFF] xl:h-2/5">
                            <div className="mx-auto h-[115%] w-5/6 rounded-b-full bg-gradient-to-b from-[#9A9FFF] to-[#5961BE]"></div>
                        </div>
                        <div className="mt-12 w-3/5 rounded-r-full bg-[#5961BE] px-6 py-2 shadow-md">
                            <h1 className="text-md w-fit pr-4 font-medium text-white md:text-xl 2xl:text-xl">Teh Telang</h1>
                        </div>
                        <p className="px-6 py-6 text-sm font-medium text-[#5961BE]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod.
                        </p>
                        <div className="mt-auto flex w-full items-center justify-between px-6">
                            <h1 className="text-md font-bold text-[#5961BE] md:text-xl 2xl:text-2xl">Rp2.500,00</h1>
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
