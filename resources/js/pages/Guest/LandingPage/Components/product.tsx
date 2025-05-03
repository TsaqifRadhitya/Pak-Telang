import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { productType } from '@/types/product';
import { router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion'; // Saya mengubah dari 'motion/react' karena sepertinya itu typo
import Heading from '../../../../components/heading';
import HeadingSmall from '../../../../components/heading-small';

interface props extends SharedData {
    product: productType[];
}

export default function Product() {
    const { product } = usePage<props>().props;
    return (
        <div className="flex min-h-screen flex-col gap-y-10 bg-[#EBEFFF] p-5 md:px-10 lg:px-32 lg:py-20">
            <Heading title="Produk Kami" disableMb className="text-4xl font-bold text-[#3B387E]" />
            <HeadingSmall
                title="Berbagai minuman herbal alami yang menyegarkan, dibuat dari bahan pilihan dan tanpa bahan pengawet. Temukan rasa yang pas untukmu di sini!"
                className="md:text-md text-sm font-semibold text-[#3B387E] lg:text-lg xl:text-xl"
            />
            <div className="max-w-9xl relative mx-auto flex w-full flex-col gap-y-10 px-4 md:grid md:grid-cols-2 md:gap-5 lg:gap-10 xl:grid xl:h-full xl:grid-cols-3 xl:gap-20 xl:px-0">
                {product.map((i, index) => (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
                        viewport={{ amount: 0.2 }}
                        key={index}
                        onClick={(e) => {
                            if (!(e.target as HTMLElement).closest('button')) {
                                router.get(route('produk.detail', { id: i.id }));
                            }
                        }}
                        className="relative mx-auto flex aspect-2/3 w-full cursor-pointer flex-col rounded-2xl bg-[#EBEFFF] pb-5 shadow-xl"
                    >
                        <div className="h-2/5 w-full rounded-t-xl bg-[#9A9FFF]"></div>
                        <div className="absolute top-0 left-1/2 mx-auto h-1/2 w-5/6 -translate-x-1/2 rounded-b-full bg-gradient-to-b from-[#9A9FFF] from-10% to-[#5961BE] to-95%">
                            <img
                                src={i.productPhoto[0]}
                                alt=""
                                className="absolute bottom-0 left-1/2 aspect-6/9 w-1/2 -translate-x-1/2 object-cover object-center"
                            />
                        </div>
                        <div className="mt-20 w-3/5 rounded-r-full bg-[#5961BE] px-6 py-2 shadow-md">
                            <h1
                                className={cn(
                                    'text-md w-fit pr-4 leading-5 font-medium text-white md:text-xl xl:text-xl',
                                    i.productName.length > 15 && 'xl:text-sm',
                                )}
                            >
                                {i.productName}
                            </h1>
                        </div>
                        <p className="line-clamp-5 px-6 py-6 text-sm font-medium text-[#5961BE]">{i.productDescription}</p>
                        <div className="mt-auto flex w-full items-center justify-between px-6">
                            <h1 className="text-md font-bold text-[#5961BE] md:text-xl">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(i.productPrice)}
                            </h1>
                            <Button
                                onClick={() => router.get(route('transaksi.create', { id: i.id }))}
                                className="cursor-pointer rounded-full bg-transparent text-[#5961BE] ring-2 ring-[#5961BE] hover:bg-[#5961BE] hover:text-white"
                            >
                                Beli Sekarang
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
