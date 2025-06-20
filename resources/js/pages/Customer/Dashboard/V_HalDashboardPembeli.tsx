import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { kontenType } from '@/types/koten';
import { productType } from '@/types/product';
import { currencyConverter } from '@/utils/currencyConverter';
import { router } from '@inertiajs/react';
import Heading from '../../../components/heading';
import NewKontenItemComponent from './components/newKontenItem';

export default function dashboardCustomerPage({ latestContent, popularProduct }: { latestContent: kontenType[]; popularProduct: productType }) {
    return (
        <CustomerPageLayout page="Dashboard">
            <section className="flex min-h-screen w-full flex-col gap-5 bg-[#EBEFFF] p-5 pt-22 text-[#3B387E] lg:p-10 lg:pt-22">
                <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <div className="flex w-full flex-col-reverse items-center gap-y-10 rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow md:gap-x-10 lg:flex-row lg:px-16 xl:gap-x-48">
                    <article className="space-y-5 text-justify">
                        <Heading title="Rasakan Kebaikan Pak Telang" className="font-black md:text-2xl lg:text-3xl xl:text-4xl" />
                        <p className="md:text-xl">
                            Dari kebun hingga ke cangkir, setiap produk Pak Telang dibuat dengan telang pilihan yang dirawat secara alami. Rasakan
                            manfaatnya untuk tubuh, pikiran, dan keseharianmu.
                        </p>
                    </article>
                    <img src="Asset/Image/imageDashboardCustomer.webp" className="mt-10 max-w-52 md:mt-0 md:max-w-max" alt="" />
                </div>
                <div className="w-full space-y-5 rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-7 px-10 shadow lg:px-16">
                    <h1 className="text-2xl font-bold">Produk Unggulan</h1>
                    {popularProduct ? (
                        <div className="flex items-center justify-between gap-20">
                            <div className="flex items-center gap-5">
                                <img
                                    src={popularProduct.productPhoto[0]}
                                    loading="lazy"
                                    alt=""
                                    className="aspect-square h-fit max-w-32 rounded-2xl object-cover object-center"
                                />
                                <div className="flex w-fit flex-col justify-between py-2.5">
                                    <Heading title={popularProduct.productName} />
                                    <p className="line-clamp-3 text-sm">{popularProduct.productDescription}</p>
                                    <HeadingSmall className="font-semibold" title={currencyConverter(popularProduct.productPrice)} />
                                </div>
                            </div>
                            <Button
                                onClick={() => router.get(route('customer.transaksi.create'), { id: popularProduct.id })}
                                className="hidden cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:block"
                            >
                                Beli Sekarang
                            </Button>
                        </div>
                    ) : (
                        <HeadingSmall title="Data produk unggulan tidak tersedia" className="text-center" />
                    )}
                    <Button
                        onClick={() => router.get(route('customer.transaksi.create'), { id: popularProduct.id })}
                        className="w-full cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:hidden"
                    >
                        Beli Sekarang
                    </Button>
                </div>
                <div className="w-full space-y-10 rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16 lg:py-10">
                    <h1 className="text-2xl font-bold">Konten Terbaru</h1>
                    {latestContent ? (
                        <div>
                            {latestContent.map((konten, index) => (
                                <NewKontenItemComponent key={konten.id} first={index === 0} data={konten} />
                            ))}
                        </div>
                    ) : (
                        <HeadingSmall title="Data konten terbaru tidak tersedia" className="text-center" />
                    )}
                </div>
            </section>
        </CustomerPageLayout>
    );
}
