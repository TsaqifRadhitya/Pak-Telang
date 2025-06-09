import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { supabaseImage } from '@/services/imageStorage';
import { gender, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import z from 'zod';
import { addressType } from '../../../types/address';
interface Province {
    id: string;
    name: string;
}

interface City {
    id: string;
    name: string;
    province_id: string;
}

interface District {
    id: string;
    name: string;
    regency_id: string;
}

export interface AddressApiType {
    provinces: Province[];
    cities: City[];
    districts: District[];
}

const profileEditValidation = z.object({
    name: z.string({ message: 'Harap mengisi nama' }).min(1, 'Harap mengisi nama'),
    birthday: z.string({ message: 'Harap mengisi tanggal lahir' }).min(1, 'Harap mengisi tanggal lahir'),
    gender: z.string({ message: 'Harap mengisi jenis kelamin' }).min(1, 'Harap mengisi jenis kelamin'),
    phonenumber: z.string({ message: 'Harap mengisi Nomor Hp' }).regex(/^\d{1,13}$/, 'Nomor telepon hanya boleh berisi angka dan maksimal 13 digit'),
    province: z.string({ message: 'Harap mengisi provinsi' }).min(1, 'Harap mengisi provinsi'),
    cityName: z.string({ message: 'Harap mengisi kota' }),
    districtName: z.string({ message: 'Harap mengisi kecamatan' }),
    address: z.string({ message: "'Harap mengisi alamat'" }).min(1, 'Harap mengisi alamat'),
    postalCode: z.string({ message: 'Harap mengisi kode pos' }).regex(/^\d{5}$/, 'Kode pos memiliki 5 karakter'),
});

interface props extends SharedData {
    address: addressType;
    fts: boolean;
}

export default function EditProfileMitraPage() {
    const { auth, address, fts } = usePage<props>().props;
    const { data, setData, errors, setError, post } = useForm({
        ...auth.user,
        ...address,
    });

    const [addressApi, setAddressApi] = useState<AddressApiType>({
        provinces: [],
        cities: [],
        districts: [],
    });

    const [image, setImage] = useState<File | null>(null);
    const inputFile = useRef<HTMLInputElement>(null);

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
        if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
            setData('profile_picture', URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        const validation = profileEditValidation.safeParse(data);
        const error = validation.error?.format();
        if (!validation.success) {
            setError('address', error?.address?._errors[0] as string);
            setError('birthday', error?.birthday?._errors[0] as string);
            setError('cityName', error?.cityName?._errors[0] as string);
            setError('gender', error?.gender?._errors[0] as string);
            setError('districtName', error?.districtName?._errors[0] as string);
            setError('name', error?.name?._errors[0] as string);
            setError('phonenumber', error?.phonenumber?._errors[0] as string);
            setError('postalCode', error?.postalCode?._errors[0] as string);
            setError('province', error?.province?._errors[0] as string);
            return;
        }
        if (image) {
            const imageProvider = new supabaseImage(auth.user.email, 'Image');
            const profileUrl = await imageProvider.upsertProfile(image);
            router.post(route('mitra.profile.update'), { ...data, profile_picture: profileUrl as string, fts: fts });
        } else {
            post(route('mitra.profile.update', { fts: fts }));
        }
    };
    return (
        <MitraPageLayout page="Profile">
            <main className="h-full w-full rounded-t-lg border border-[#AFB3FF] bg-white shadow-lg">
                <div className="border-b border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Edit Profil</h1>
                </div>
                <div className="flex flex-col gap-10 p-5 lg:flex-row lg:gap-20 lg:p-10">
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={data.profile_picture || '/Asset/Icon/Profile.svg'}
                            alt="Profile"
                            className="aspect-square w-36 rounded-full object-cover object-center shadow"
                        />
                        <Button
                            onClick={() => inputFile.current?.click()}
                            className="cursor-pointer border-2 border-[#5961BE] bg-white text-[#3B387E] hover:bg-[#5961BE] hover:text-white"
                        >
                            Pilih Foto
                        </Button>
                        <input type="file" className="hidden" ref={inputFile} accept="image/png, image/jpeg" onChange={handleChangeImage} />
                        <p className="text-xs text-gray-600">Maks 10Mb | PNG, JPG, JPEG</p>
                    </div>
                    <div className="grid w-full grid-cols-1 grid-rows-6 gap-6 lg:grid-cols-2">
                        <div>
                            <Label>Nama</Label>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div>
                            <Label>Tanggal Lahir</Label>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="date"
                                value={data.birthday ?? ''}
                                onChange={(e) => setData('birthday', e.target.value)}
                            />
                            <InputError message={errors.birthday} />
                        </div>
                        <div>
                            <Label>Jenis Kelamin</Label>
                            <select
                                value={data.gender ?? ''}
                                onChange={(e) => setData('gender', e.target.value as gender)}
                                className="w-full rounded-lg p-2 ring ring-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option value=""></option>
                                <option value="Laki-Laki">Laki - Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            {errors.gender && <InputError message={errors.gender} />}
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]" disabled type="email" value={data.email} />
                        </div>
                        <div>
                            <Label>No. HP</Label>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.phonenumber ?? ''}
                                onChange={(e) => setData('phonenumber', e.target.value)}
                            />
                            {errors.phonenumber && <InputError message={errors.phonenumber} />}
                        </div>
                        <div>
                            <Label>Provinsi</Label>
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
                            <Label>Kota/Kabupaten</Label>
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
                            <Label>Kecamatan</Label>
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
                            <Label>Alamat</Label>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.address ?? ''}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            {errors.address && <InputError message={errors.address} />}
                        </div>
                        <div>
                            <Label>Kode Pos</Label>
                            <Input
                                className="border-0 ring ring-[#B9BDFF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                                value={data.postalCode ?? ''}
                                onChange={(e) => setData('postalCode', e.target.value)}
                            />
                            {errors.postalCode && <InputError message={errors.postalCode} />}
                        </div>
                        <div className="flex justify-end gap-4 lg:col-span-2">
                            <Button
                                onClick={() => router.get(route('mitra.profile'))}
                                className="w-32 cursor-pointer border border-[#5961BE] bg-white text-[#5961BE] hover:bg-[#5961BE] hover:text-white"
                            >
                                Batal
                            </Button>
                            <Button onClick={handleSubmit} className="w-32 cursor-pointer bg-[#5961BE] text-white hover:bg-[#454b93]">
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </MitraPageLayout>
    );
}
