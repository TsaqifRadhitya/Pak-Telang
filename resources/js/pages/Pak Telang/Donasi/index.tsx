import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        nominal: z.number({ message: 'Harap mengisi nominal penyaluran' }).max(saldo, 'Nominal melebihi saldo donasi'),
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
    }, [modal]);

    return (
        <AdminPageLayout page="Donasi">
            {modal && (
                <section className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/30">
                    <div className="space-y-5 rounded-xl bg-white p-10 shadow">
                        <div className="mx-auto w-fit">
                            <Heading title="Form Salurkan Donasi" className="mb-1.5 px-2.5 text-2xl font-black" />
                            <div className="h-[5px] rounded-full bg-[#B9BDFF]"></div>
                        </div>
                        <article className="grid gap-x-16 gap-y-5 lg:grid-cols-2">
                            <div>
                                <HeadingSmall title="Nominal Penyaluran" className="font-semibold text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('nominal', parseInt(e.target.value))}
                                    value={data.nominal}
                                    type="number"
                                    placeholder="Nominal Penyaluran"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF] lg:w-96"
                                />
                                {errors.nominal && <p className="text-sm text-red-600">{errors.nominal}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Jumlah Produk" className="font-semibold text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('jumlahProduk', parseInt(e.target.value))}
                                    value={data.jumlahProduk}
                                    type="number"
                                    placeholder="Jumlah Produk"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF] lg:w-96"
                                />
                                {errors.jumlahProduk && <p className="text-sm text-red-600">{errors.nominal}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Nama Kegiatan" className="font-semibold text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('namaPenyaluran', e.target.value)}
                                    value={data.namaPenyaluran}
                                    type="text"
                                    placeholder="Nama Kegiatan"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF] lg:w-96"
                                />
                                {errors.namaPenyaluran && <p className="text-sm text-red-600">{errors.nominal}</p>}
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
                <div className="grid flex-1 grid-rows-8 gap-x-5 gap-y-7.5 p-10 lg:grid-cols-2 lg:grid-rows-4 lg:pb-0">
                    <div className="flex items-center justify-between rounded-lg p-5 py-3 ring ring-[#3B387E]">
                        <div className="flex flex-col justify-between">
                            <Heading title="Total Donasi" className="text-sm lg:text-lg" />
                            <Heading title={currencyConverter(totalDonasi)} className="text-2xl lg:text-3xl" />
                            <Heading title="Donasi yang belum disalurkan" className="lg:text-md mb-2 text-sm" />
                        </div>
                        <Button
                            onClick={() => setModal(true)}
                            disabled={processing}
                            className="mb-2.5 min-h-0 min-w-20 cursor-pointer bg-[#3B387E] text-xs text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E] lg:min-w-32"
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
                                    <div className="flex items-center justify-between px-3 py-4">
                                        <div className="flex flex-col gap-y-2.5">
                                            <h1 className="font-semibold">{i.name ?? 'Anonim'}</h1>
                                            <p className="text-xs lg:text-sm">{i.email} Produk</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-y-2.5">
                                            <p className="text-right text-[0.6rem]">{dateFormaterUtils(i.created_at as Date)}</p>
                                            <Heading title={currencyConverter(i.nominal as number)} className="lg:text-md text-xs" />
                                        </div>
                                    </div>
                                    <div className="h-0.5 bg-[#D9D9D9]"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between rounded-lg p-5 py-3 ring ring-[#3B387E] lg:hidden">
                        <Heading title="Donasi Telah Disalurkan" className="text-sm lg:text-lg" />
                        <Heading title={currencyConverter(danaTersalur)} className="text-2xl lg:text-3xl" />
                        <Heading title="Donasi yang telah disalurkan" className="lg:text-md mb-2 text-sm" />
                    </div>
                    <div className="row-span-3 space-y-1.5 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading title="Disalurkan" className="text-lg" />
                        <div className="h-0.5 bg-[#D9D9D9]"></div>
                        <div className="max-h-[50vh] overflow-y-auto px-1 lg:max-h-[45vh]">
                            {Disalurkan.map((i) => (
                                <div key={i.id}>
                                    <div className="flex items-center justify-between px-3 py-4">
                                        <div className="flex flex-col gap-y-2.5">
                                            <h1 className="font-semibold">{i.namaPenyaluran}</h1>
                                            <p className="text-sm">{i.jumlahProduk} Produk</p>
                                        </div>
                                        <div className="flex items-center gap-x-5">
                                            <div className="flex flex-col items-end gap-y-2.5">
                                                <p className="text-right text-[0.6rem]">{dateFormaterUtils(i.created_at)}</p>
                                                <Heading title={currencyConverter(i.nominal)} className="text-md" />
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
