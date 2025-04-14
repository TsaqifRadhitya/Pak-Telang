import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { AddressApiType } from '@/pages/Mitra/Profile/editProfile';
import { gender, SharedData, User } from '@/types';
import { addressType } from '@/types/address';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import Heading from '../../../components/heading';

type Merge<T> = {
    [K in keyof T]: T[K];
};
interface props extends SharedData {
    address: addressType;
}

type form = Merge<
    { NIK: string; namaUsaha: string; fotoKTP: string; fotoDapur: string[]; alasanPengajuan: string; kulkas: boolean } & addressType & User
>;

const pengajuanMitraEditValidation = z.object({
    name: z.string({ message: 'Harap mengisi nama' }).min(1, 'Harap mengisi nama'),
    birthday: z.string({ message: 'Harap mengisi tanggal lahir' }).min(1, 'Harap mengisi tanggal lahir'),
    gender: z.string({ message: 'Harap mengisi jenis kelamin' }).min(1, 'Harap mengisi jenis kelamin'),
    phonenumber: z.string({ message: 'Harap mengisi Nomor Hp' }).regex(/^\d{1,13}$/, 'Nomor telepon hanya boleh berisi angka dan maksimal 13 digit'),
    NIK: z.string({ message: 'Harap mengisi NIK' }).min(16, 'Jumlah digit NIK harus 16'),
    province: z.string({ message: 'Harap mengisi provinsi' }).min(1, 'Harap mengisi provinsi'),
    cityName: z.string({ message: 'Harap mengisi kota' }),
    districtName: z.string({ message: 'Harap mengisi kecamatan' }),
    address: z.string({ message: "Harap mengisi alamat" }).min(1, 'Harap mengisi alamat'),
    postalCode: z.string({ message: 'Harap mengisi kode pos' }).regex(/^\d{5}$/, 'Kode pos memiliki 5 karakter'),
    fotoKTP: z.string({ message: 'Harap mengupload foto KTP' }),
    namaUsaha: z.string({ message: 'Harap mengisi nama usaha' }).min(1, 'Harap mengisi nama usaha'),
    kulkas: z.boolean({ message: 'Harap mengisi kepemilikan kulkas' }),
    alasanPengajuan: z.string({ message: 'Harap mengisi alasan pengajuan' }).min(1, 'Harap mengisi alasan pengajuan'),
    fotoDapur: z.array(z.string()).nonempty('Harap mengupload foto dapur'),
});

export default function Create() {
    const { address, auth } = usePage<props>().props;
    const { data, setData, errors, setError, clearErrors } = useForm<form>({
        ...address,
        ...auth.user,
        fotoDapur : [] as string[]
    } as form);
    const [addressApi, setAddressApi] = useState<AddressApiType>({
        provinces: [],
        cities: [],
        districts: [],
    });

    const [fotoKtp, setFotoKtp] = useState<File | null>(null);
    const [fotoDapur, setFotoDapur] = useState<FileList | null>(null);
    const inputFileKTP = useRef<HTMLInputElement>(null);
    const inputFileDapur = useRef<HTMLInputElement>(null);
    useEffect(() => {
        axios
            .get('https://open-api.my.id/api/wilayah/provinces')
            .then((res) => setAddressApi((prev) => ({ ...prev, provinces: res.data })))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (data.province) {
            const province = addressApi.provinces.find((p) => p.name === data.province);
            if (province) {
                axios
                    .get(`https://open-api.my.id/api/wilayah/regencies/${province.id}`)
                    .then((res) => setAddressApi((prev) => ({ ...prev, cities: res.data, districts: [] })))
                    .catch(console.error);
            }
        }
    }, [data.province, addressApi.provinces]);

    useEffect(() => {
        if (data.cityName) {
            const city = addressApi.cities.find((c) => c.name === data.cityName);
            if (city) {
                axios
                    .get(`https://open-api.my.id/api/wilayah/districts/${city.id}`)
                    .then((res) => setAddressApi((prev) => ({ ...prev, districts: res.data })))
                    .catch(console.error);
            }
        }
    }, [data.cityName, addressApi.cities]);

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0] && e.target.id === 'KTP') {
            setFotoKtp(e.target.files[0]);
            setData('fotoKTP', URL.createObjectURL(e.target.files[0]));
        }

        if (e.target.files?.length && e.target.id === 'DAPUR') {
            setFotoDapur(e.target.files);
            setData(
                'fotoDapur',
                Object.values(e.target.files).map((img) => URL.createObjectURL(img)),
            );
        }
    };

    const handleSubmit = () => {
        clearErrors()
        const validation = pengajuanMitraEditValidation.safeParse(data);
        console.log(validation.error?.format());
        const err = validation.error?.format();
        if (!validation.success) {
            setError('NIK', err?.NIK?._errors[0] as string);
            setError('address', err?.address?._errors[0] as string);
            setError('alasanPengajuan', err?.alasanPengajuan?._errors[0] as string);
            setError('birthday', err?.birthday?._errors[0] as string);
            setError('cityName', err?.cityName?._errors[0] as string);
            setError('districtName', err?.districtName?._errors[0] as string);
            setError('fotoDapur', err?.fotoDapur?._errors[0] as string);
            setError('fotoKTP', err?.fotoKTP?._errors[0] as string);
            setError('kulkas', err?.kulkas?._errors[0] as string);
            setError('namaUsaha', err?.namaUsaha?._errors[0] as string);
            setError('name', err?.name?._errors[0] as string);
            setError('phonenumber', err?.phonenumber?._errors[0] as string);
            setError('postalCode', err?.postalCode?._errors[0] as string);
            setError('province', err?.province?._errors[0] as string);
        }
        console.log(fotoDapur,fotoKtp)
        // router.post(route(''), { data });
    };
    return (
        <CustomerPageLayout page="Pengajuan Mitra">
            <div className="flex min-h-screen w-full flex-col gap-5 bg-[#EBEFFF] p-5 pt-22 text-[#3B387E] lg:p-10 lg:pt-22">
                <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                    <h1 className="font-bold">Pengajuan Mitra</h1>
                </div>
                <div className="flex flex-1 flex-col justify-end space-y-5 rounded-2xl border border-[#AFB3FF] bg-[#FFFFFF] px-10 py-10 shadow lg:px-16">
                    <Heading title="Identitas Diri" className="text-xl underline decoration-[#5961BE] decoration-4 underline-offset-8" />
                    <div className="grid gap-x-32 gap-y-5 lg:grid-cols-2">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Nama</h2>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">Tanggal Lahir</h2>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="date"
                                value={data.birthday ?? ''}
                                onChange={(e) => setData('birthday', e.target.value)}
                            />
                            <InputError message={errors.birthday} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Jenis Kelamin</h2>
                            <select
                                value={data.gender ?? ''}
                                onChange={(e) => setData('gender', e.target.value as gender)}
                                className="w-full rounded-lg p-2 ring ring-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option value=""></option>
                                <option value="Laki-Laki">Laki - Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            <InputError message={errors.gender} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Email</h2>
                            <Input
                                disabled
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.email}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">No. Hp</h2>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.phonenumber ?? ''}
                                onChange={(e) => setData('phonenumber', e.target.value)}
                            />
                            <InputError message={errors.phonenumber} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">NIK</h2>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="number"
                                value={data.NIK ?? ''}
                                onChange={(e) => setData('NIK', e.target.value)}
                            />
                            <InputError message={errors.birthday} />
                        </div>
                    </div>
                    <h1 className="font-bold">Alamat KTP</h1>
                    <div className="grid gap-x-32 gap-y-5 lg:grid-cols-2">
                        <div>
                            <h2 className="text-lg font-semibold">Provinsi</h2>
                            <select
                                value={data.province ?? ''}
                                onChange={(e) => setData('province', e.target.value)}
                                className="w-full rounded-lg p-2 ring ring-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option></option>
                                {addressApi.provinces.map((prov) => (
                                    <option key={prov.id} value={prov.name}>
                                        {prov.name}
                                    </option>
                                ))}
                            </select>
                            {errors.province && <InputError message={errors.province} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Kota/Kabupaten</h2>
                            <select
                                value={data.cityName ?? ''}
                                onChange={(e) => setData('cityName', e.target.value)}
                                className="w-full rounded-lg p-2 ring ring-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option></option>
                                {addressApi.cities.map((city) => (
                                    <option key={city.id} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            {errors.cityName && <InputError message={errors.cityName} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Kecamatan</h2>
                            <select
                                value={data.districtName ?? ''}
                                onChange={(e) => setData('districtName', e.target.value)}
                                className="w-full rounded-lg p-2 ring ring-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option></option>
                                {addressApi.districts.map((district) => (
                                    <option key={district.id} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {errors.districtName && <InputError message={errors.districtName} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Kode Pos</h2>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.postalCode ?? ''}
                                onChange={(e) => setData('postalCode', e.target.value)}
                            />
                            {errors.postalCode && <InputError message={errors.postalCode} />}
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-lg font-semibold">Alamat</h2>
                            <Textarea
                                onChange={(e) => setData('address', e.target.value)}
                                value={data.address}
                                placeholder="Deskripsi Produk"
                                className="min-h-20 border-0 bg-black text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                            />
                            {errors.address && <InputError message={errors.address} />}
                        </div>
                        <div className="space-y-1.5">
                            <h2 className="text-lg font-semibold">Foto KTP</h2>
                            <input
                                type="file"
                                className="hidden"
                                ref={inputFileKTP}
                                id="KTP"
                                accept="image/png, image/jpeg"
                                onChange={handleChangeImage}
                            />
                            {!data.fotoKTP && (
                                <div
                                    onClick={() => inputFileKTP.current?.click()}
                                    className="flex aspect-video w-11/12 cursor-pointer items-center justify-center rounded-lg bg-[#C5C5C5]"
                                >
                                    <p>Klik untuk Tambahkan Gambar</p>
                                </div>
                            )}
                            {data.fotoKTP && (
                                <img
                                    onClick={() => inputFileKTP.current?.click()}
                                    src={data.fotoKTP}
                                    className="aspect-video w-11/12 cursor-pointer object-cover"
                                />
                            )}
                            {errors.fotoKTP && <InputError message={errors.fotoKTP} />}
                        </div>
                    </div>
                    <Heading title="Pengajuan Usaha" className="text-xl underline decoration-[#5961BE] decoration-4 underline-offset-8" />
                    <div className="grid gap-x-32 gap-y-5 lg:grid-cols-2">
                        <div>
                            <h2 className="text-lg font-semibold">Nama Usaha</h2>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.namaUsaha ?? ''}
                                onChange={(e) => setData('namaUsaha', e.target.value)}
                            />
                            {errors.namaUsaha && <InputError message={errors.namaUsaha} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Apakah Anda memiliki Kulkas</h2>
                            <select
                                value={`${data.kulkas}` !== '' ? `${data.kulkas}` : ''}
                                onChange={(e) => setData('kulkas', e.target.value === 'true')}
                                className="w-full rounded-lg p-2 ring ring-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option></option>
                                <option value={'true'}>Iya</option>
                                <option value={'false'}>Tidak</option>
                            </select>
                            {errors.kulkas && <InputError message={errors.kulkas} />}
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-lg font-semibold">Alasan Pengajuan</h2>
                            <Textarea
                                onChange={(e) => setData('alasanPengajuan', e.target.value)}
                                value={data.alasanPengajuan}
                                placeholder="Masukkan alasan anda mengajukan diri menjadi mitra"
                                className="min-h-20 border-0 bg-black text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                            />
                            {errors.address && <InputError message={errors.address} />}
                        </div>
                        <div className="space-y-1 lg:col-span-2">
                            <input
                                type="file"
                                className="hidden"
                                multiple
                                ref={inputFileDapur}
                                id="DAPUR"
                                accept="image/png, image/jpeg"
                                onChange={handleChangeImage}
                            />
                            <h2 className="text-lg font-semibold">Alasan Pengajuan</h2>
                            <p className="mb-2">Anda dapat mengupload lebih dari 1 gambar</p>
                            {!data.fotoDapur.length && (
                                <div
                                    onClick={() => inputFileDapur.current?.click()}
                                    className="flex aspect-video w-1/6 cursor-pointer items-center justify-center rounded-lg bg-[#C5C5C5]"
                                >
                                    <Plus />
                                </div>
                            )}
                            {data.fotoDapur && (
                                <div className="flex w-full flex-wrap gap-5">
                                    {data.fotoDapur.map((img) => (
                                        <img src={img} className="aspect-video w-1/6 object-cover object-center" />
                                    ))}
                                </div>
                            )}
                            <Button
                                onClick={() => inputFileDapur.current?.click()}
                                className="mt-3 cursor-pointer border-2 border-[#B9BDFF] bg-transparent text-[#3B387E] hover:bg-[#B9BDFF] hover:text-white"
                            >
                                Unggah Foto Dapur Usaha Anda
                            </Button>
                            {errors.fotoDapur && <InputError message={errors.fotoDapur} />}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleSubmit} className="cursor-pointer bg-[#5961BE] px-6 text-white hover:bg-[#4e55a1]">
                            Ajukan Sekarang
                        </Button>
                    </div>
                </div>
            </div>
        </CustomerPageLayout>
    );
}
