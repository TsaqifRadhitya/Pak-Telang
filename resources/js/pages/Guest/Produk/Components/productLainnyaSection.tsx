import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import Heading from '../../../../components/heading';
import HeadingSmall from '../../../../components/heading-small';
import { props } from '../V_HalDetailProduk';

export default function ProductLainnyaSection() {
    const { products } = usePage<props>().props;
    return (
        <section className="min-h-screen w-full bg-[#EBEFFF] p-5 lg:px-10 lg:pt-10 lg:pb-20">
            <main className="lg:-10 flex h-full w-full flex-col gap-y-10 rounded-lg border border-[#AFB3FF] bg-[#FFFFFF] p-7 shadow-lg">
                <header className="flex flex-col gap-y-1.5">
                    <Heading title="Produk Lainnya" disableMb className="text-4xl text-[#3B387E]" />
                    <HeadingSmall title="Mungkin anda suka" className="text-[#3B387E]" />
                </header>
                <article className="space-y-10 md:grid md:grid-cols-2 md:gap-28 md:space-y-0 xl:grid-cols-3">
                    {products.map((item) => (
                        <section
                            onClick={(e) => {
                                if (!(e.target as HTMLElement).closest('button')) {
                                    router.get(route('produk.detail', { id: item.id }));
                                }
                            }}
                            className="relative aspect-2/3 w-full cursor-pointer rounded-lg bg-[#EBEFFF] pb-2.5 shadow"
                        >
                            <div className="h-2/5 w-full rounded-t-lg bg-[#9A9FFF]"></div>
                            <div className="absolute top-0 left-1/2 h-1/2 w-4/5 -translate-x-1/2 rounded-b-full bg-linear-180 from-[#9A9FFF] to-[#7D85DE]">
                                <img
                                    src={item.productPhoto[0]}
                                    alt=""
                                    className="absolute bottom-0 left-1/2 aspect-6/9 w-1/2 -translate-x-1/2 object-cover object-center"
                                />
                            </div>
                            <div className="mt-20 w-3/5 rounded-r-full bg-[#5961BE] px-6 py-2 shadow-md">
                                <h1 className="text-md w-fit pr-4 font-medium text-white md:text-xl 2xl:text-xl">{item.productName}</h1>
                            </div>
                            <p className="line-clamp-5 px-6 py-6 text-sm font-medium text-[#5961BE]">{item.productDescription}</p>
                            <div className="mt-auto flex w-full items-center justify-between px-6">
                                <h1 className="text-md font-bold text-[#5961BE] md:text-xl">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.productPrice)}
                                </h1>
                                <Button
                                    onClick={() => router.get(route('customer.transaksi.create', { id: item.id }))}
                                    className="cursor-pointer rounded-full bg-transparent text-[#5961BE] ring-2 ring-[#5961BE] hover:bg-[#5961BE] hover:text-white"
                                >
                                    Beli Sekarang
                                </Button>
                            </div>
                        </section>
                    ))}
                </article>
            </main>
        </section>
    );
}
