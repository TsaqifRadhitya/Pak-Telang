import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { productType } from '../../../types/product';

export default function OrderBahanIndex({ products }: { products: productType[] }) {
    return (
        <MitraPageLayout page="Order Bahan">
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Order Bahan</h1>
                </div>
                <div
                    className={cn(
                        'flex w-full flex-col gap-5 overflow-y-auto p-5 md:grid md:h-[82vh] md:grid-cols-2 lg:p-7',
                        products.length < 3 && 'lg:grid-rows-2',
                    )}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex h-fit min-h-[300px] w-full flex-col justify-between gap-2.5 rounded-lg p-5 shadow-lg ring ring-[#B9BDFF]"
                        >
                            <div className="flex w-full">
                                <div className="flex gap-x-2.5">
                                    {product.productPhoto.map((photo, i) =>
                                        i > 2 ? null : (
                                            <img
                                                src={photo}
                                                key={i}
                                                className="aspect-square max-w-1/7 flex-1/5 rounded-lg object-cover object-center ring ring-[#B9BDFF]"
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <Heading title={product.productName} className="text-md xl:text-xl" disableMb />
                                    <Heading
                                        className="text-md xl:text-xl"
                                        disableMb
                                        title={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.productPrice)}
                                    />
                                </div>
                                <HeadingSmall title={`Netto : ${product.productNetto} ${product.productUnit}`} />
                            </div>
                            <p className="lg:text-md line-clamp-4 text-xs">{product.productDescription}</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => router.get(route('mitra.order bahan.create', { id: product.id }))}
                                    className="w-full cursor-pointer rounded-md bg-[#5961BE] py-0.5 text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:max-w-2/5"
                                >
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </MitraPageLayout>
    );
}
