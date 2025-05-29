import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCurrentMediaQuerry } from '@/hooks/useMediaQuery';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { donasiType } from '@/types/donasi';
import { penyaluranDonasiType } from '@/types/penyaluranDonasi';
import { currencyConverter } from '@/utils/currencyConverter';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { dateFormaterUtils } from '../../../utils/dateFormater';

const validation = (saldo: number, data: penyaluranDonasiType) => {
    const validationForm = z.object({
        nominal: z
            .number({ message: 'Harap mengisi nominal penyaluran' })
            .max(saldo, 'Nominal penyaluran harus lebih kecil atau sama dengan jumlah saldo'),
        jumlahProduk: z.number({ message: 'Harap mengisi jumlah produk' }).min(1, 'Harap mengisi jumlah produk'),
        namaPenyaluran: z.string({ message: 'Harap mengisi nama kegiatan' }).min(1, 'Harap mengisi nama kegiatan'),
    });
    return validationForm.safeParse(data);
};

export default function Index({
    donasiMasuk,
    Disalurkan,
    danaTersalur,
    totalDonasi,
}: {
    donasiMasuk: donasiType[];
    Disalurkan: penyaluranDonasiType[];
    danaTersalur: number;
    totalDonasi: number;
}) {
    const { data, setData, setError, errors, post, processing, reset, clearErrors } = useForm<penyaluranDonasiType>();
    const [modal, setModal] = useState<boolean>(false);
    const handleSubmit = () => {
        const validationRess = validation(totalDonasi, data);
        if (!validationRess.success) {
            const err = validationRess.error.format();
            setError('jumlahProduk', err.jumlahProduk?._errors[0] as string);
            setError('namaPenyaluran', err.namaPenyaluran?._errors[0] as string);
            setError('nominal', err.nominal?._errors[0] as string);
            return;
        }
        setModal(false);
        post(route('admin.donasi.store'));
    };

    useEffect(() => {
        clearErrors();
        reset();
    }, [modal, clearErrors, errors, reset]);

    const { lg } = useCurrentMediaQuerry();

    return (
        <AdminPageLayout page="Donasi">
            {modal && (
                <section className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/30">
                    <div className="space-y-5 rounded-xl bg-white p-10 shadow lg:w-3xl">
                        <div className="mx-auto w-fit">
                            <Heading title="Form Salurkan Donasi" className="mb-1.5 px-2.5 font-black lg:text-2xl" />
                            <div className="h-[5px] rounded-full bg-[#B9BDFF]"></div>
                        </div>
                        <article className="grid w-full gap-x-16 gap-y-5 lg:grid-cols-2">
                            <div>
                                <HeadingSmall title="Nominal Penyaluran" className="text-sm font-semibold text-[#3B387E] lg:text-base" />
                                <Input
                                    onChange={(e) => setData('nominal', parseInt(e.target.value))}
                                    value={data.nominal}
                                    type="number"
                                    placeholder="Nominal Penyaluran"
                                    className="border-0 text-xs text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF] lg:text-base"
                                />
                                {errors.nominal && <p className="text-sm text-red-600">{errors.nominal}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Jumlah Produk" className="text-sm font-semibold text-[#3B387E] lg:text-base" />
                                <Input
                                    onChange={(e) => setData('jumlahProduk', parseInt(e.target.value))}
                                    value={data.jumlahProduk}
                                    type="number"
                                    placeholder="Jumlah Produk"
                                    className="border-0 text-xs text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF] lg:text-base"
                                />
                                {errors.jumlahProduk && <p className="text-sm text-red-600">{errors.jumlahProduk}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Nama Kegiatan" className="text-sm font-semibold text-[#3B387E] lg:text-base" />
                                <Input
                                    onChange={(e) => setData('namaPenyaluran', e.target.value)}
                                    value={data.namaPenyaluran}
                                    type="text"
                                    placeholder="Nama Kegiatan"
                                    className="border-0 text-xs text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF] lg:text-base"
                                />
                                {errors.namaPenyaluran && <p className="text-sm text-red-600">{errors.namaPenyaluran}</p>}
                            </div>
                        </article>
                        <article className="flex flex-col-reverse justify-end gap-x-5 lg:flex-row">
                            <Button
                                onClick={() => setModal(false)}
                                disabled={processing}
                                className="mb-2.5 min-h-0 min-w-20 cursor-pointer rounded-xl bg-transparent text-xs font-semibold text-[#3B387E] ring ring-[#3B387E] hover:bg-[#3B387E] hover:font-normal hover:text-white lg:min-w-32"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="mb-2.5 min-h-0 min-w-20 cursor-pointer rounded-xl bg-[#3B387E] text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:min-w-32"
                            >
                                Simpan
                            </Button>
                        </article>
                    </div>
                </section>
            )}
            <main className="relative z-0 flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Donasi</h1>
                </div>
                <div className="flex flex-1 grid-rows-8 flex-col gap-x-5 gap-y-7.5 p-5 lg:grid lg:grid-cols-2 lg:grid-rows-4 lg:p-10 lg:pb-0">
                    <div className="flex items-center justify-between rounded-lg p-5 py-3 ring ring-[#3B387E]">
                        <div className="flex w-full flex-col justify-between gap-2.5 lg:w-fit">
                            <Heading title="Total Donasi" className="text-sm lg:text-lg" />
                            <Heading title={currencyConverter(totalDonasi)} className="text-2xl lg:text-3xl" />
                            <Heading title="Donasi yang belum disalurkan" className="lg:text-md mb-2 text-sm" />
                            <Button
                                onClick={() => setModal(true)}
                                disabled={processing}
                                className="mb-2.5 min-h-0 min-w-20 cursor-pointer bg-[#3B387E] text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:hidden lg:min-w-32"
                            >
                                Salurkan
                            </Button>
                        </div>
                        <Button
                            onClick={() => setModal(true)}
                            disabled={processing}
                            className="mb-2.5 hidden min-h-0 min-w-20 cursor-pointer bg-[#3B387E] text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:block lg:min-w-32"
                        >
                            Salurkan
                        </Button>
                    </div>
                    <div className="hidden flex-col justify-between rounded-lg p-5 py-3 ring ring-[#3B387E] lg:flex">
                        <Heading title="Donasi Telah Disalurkan" className="text-sm lg:text-lg" />
                        <Heading title={currencyConverter(danaTersalur)} className="text-2xl lg:text-3xl" />
                        <Heading title="Donasi yang telah disalurkan" className="lg:text-md mb-2 text-sm" />
                    </div>
                    <div className="row-span-3 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading title="Donasi Masuk" className="text-lg" />
                        <div className="h-0.5 bg-[#D9D9D9]"></div>
                        <div className="max-h-[55vh] overflow-y-auto lg:max-h-[45vh]">
                            {donasiMasuk.map((i) => (
                                <div key={i.id}>
                                    <div className="flex flex-col items-center justify-between gap-1 px-3 py-4 lg:flex-row lg:gap-0">
                                        <div className="flex w-full flex-col gap-1 lg:w-fit lg:gap-2.5">
                                            <h1 className="text-sm font-semibold lg:text-base">{i.name ?? 'Anonim'}</h1>
                                            <p className="text-[0.5rem] lg:text-sm">{i.email} Produk</p>
                                        </div>
                                        <div className="flex w-full flex-row-reverse items-center justify-between gap-1 lg:w-fit lg:flex-col lg:items-end lg:gap-y-2.5">
                                            <p className="text-right text-[0.6rem]">
                                                {dateFormaterUtils(i.created_at as Date, lg ? 'Full' : 'Simple')}
                                            </p>
                                            <Heading title={currencyConverter(i.nominal as number)} className="lg:text-md text-xs" />
                                        </div>
                                    </div>
                                    <div className="h-0.5 bg-[#D9D9D9]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-2.5 rounded-lg p-5 py-3 ring ring-[#3B387E] lg:hidden">
                        <Heading title="Donasi Telah Disalurkan" className="text-sm lg:text-lg" />
                        <Heading title={currencyConverter(danaTersalur)} className="text-xl lg:text-3xl" />
                        <Heading title="Donasi yang telah disalurkan" className="lg:text-md mb-2 text-sm" />
                    </div>
                    <div className="row-span-3 space-y-1.5 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading title="Disalurkan" className="text-lg" />
                        <div className="h-0.5 bg-[#D9D9D9]"></div>
                        <div className="max-h-[50vh] overflow-y-auto px-1 lg:max-h-[45vh]">
                            {Disalurkan.map((i) => (
                                <div key={i.id}>
                                    <div className="flex flex-col justify-between px-3 py-4 lg:flex-row lg:items-center">
                                        <div className="flex flex-col gap-y-2.5">
                                            <h1 className="text-sm font-semibold lg:text-base">{i.namaPenyaluran}</h1>
                                            <p className="text-xs lg:text-sm">{i.jumlahProduk} Produk</p>
                                        </div>
                                        <div className="flex items-center gap-x-5">
                                            <div className="flex w-full flex-row-reverse items-center justify-between gap-y-2.5 lg:flex-col lg:items-end lg:justify-start">
                                                <p className="text-right text-[0.6rem]">{dateFormaterUtils(i.created_at, lg ? 'Full' : 'Simple')}</p>
                                                <Heading title={currencyConverter(i.nominal)} className="text-sm lg:text-base" />
                                            </div>
                                            <Button
                                                onClick={() => router.get(route('admin.konten.create', { slug: i.namaPenyaluran }))}
                                                className="hidden h-auto min-h-0 cursor-pointer bg-[#3B387E] px-3 py-1.5 text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:block"
                                            >
                                                Buat Konten
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => router.get(route('admin.konten.create', { slug: i.namaPenyaluran }))}
                                        className="mb-2.5 min-h-0 w-full cursor-pointer bg-[#3B387E] px-3 py-1.5 text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:hidden"
                                    >
                                        Buat Konten
                                    </Button>
                                    <div className="h-0.5 bg-[#D9D9D9]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
