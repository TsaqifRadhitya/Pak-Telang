import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { currentMediaQuerry } from '@/hooks/useMediaQuery';
import { usePage } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { props } from '../produkDetail';

export default function productDetailSection() {
    const { productDetail } = usePage<props>().props;
    const { lg } = currentMediaQuerry();
    return (
        <section className="h-screen w-full bg-[#EBEFFF] p-5 pt-24 lg:px-10 lg:py-20 lg:pt-20 lg:pb-10">
            <main className="flex h-full w-full flex-col gap-5 rounded-lg border border-[#AFB3FF] bg-[#FFFFFF] p-7 shadow-md lg:flex-row lg:gap-20 lg:p-10">
                <article className="relative flex aspect-8/9 flex-1/3 overflow-y-auto rounded-lg bg-[#AFB3FF] shadow lg:py-5">
                    <Swiper navigation = {lg} loop modules={[Navigation]} className="h-auto w-full max-w-sm overflow-hidden">
                        {productDetail.productPhoto.map((photo, index) => (
                            <SwiperSlide key={index} className="relative">
                                <img src={photo} alt={`Product ${index + 1}`} className="h-full w-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </article>
                <article className="relative flex flex-2/3 flex-col gap-y-5 py-2.5 lg:gap-y-10">
                    <section className="flex flex-col gap-y-2.5 lg:gap-y-5">
                        <Heading title={productDetail.productName} disableMb className="text-2xl text-[#3B387E] lg:text-4xl" />
                        <h1 className="text-2xl font-bold text-[#FFAC31] lg:text-4xl">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(productDetail.productPrice)}
                        </h1>
                    </section>
                    <section className="flex flex-col gap-y-2.5">
                        <HeadingSmall title="Deskripsi:" className="text-xl text-[#3B387E]" />
                        <p className="text-[#5961BE] lg:text-xl">{productDetail.productDescription}</p>
                        <p className="text-[#3B387E] lg:text-xl">
                            Netto: {productDetail.productNetto} {productDetail.productUnit}
                        </p>
                    </section>
                    <Button className="absolute right-0 bottom-0 min-h-14 w-full cursor-pointer rounded-3xl bg-[#5961BE] text-2xl text-white hover:bg-[#424a9e] lg:w-1/4">
                        <p>Beli Sekarang</p>
                    </Button>
                </article>
            </main>
        </section>
    );
}
