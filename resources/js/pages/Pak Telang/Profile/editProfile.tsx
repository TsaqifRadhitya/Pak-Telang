import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

interface profileForm {
    name: string;
    email: string;
    phonenumber: string;
    gender: 'Laki-Laki' | 'Perempuan';
    birthday: Date;
    profile_picture: string;
    alamat: string;
    Kecamatan: string;
    Provinsi: string;
}

export default function editProfileAdminPage() {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, errors, setError } = useForm({
        ...auth.user,
    });
    return (
        <AdminPageLayout page="Profile">
            <main className="h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Edit Profile</h1>
                </div>
                <div className="flex min-h-full w-full gap-y-5 p-5 lg:gap-20 lg:p-10">
                    <div className="flex h-fit flex-col items-center gap-y-2.5 lg:flex-1/5">
                        <img
                            src={auth.user.profile_picture}
                            alt=""
                            className="mx-auto aspect-square w-1/3 max-w-36 rounded-full shadow md:w-1/4 lg:mx-0 lg:w-full"
                        />
                        <Button className="border-2 border-[#5961BE] bg-transparent text-[#3B387E] lg:w-2/3">Pilih Foto</Button>
                        <h1 className="text-[0.6rem] font-extralight text-[#3B387E]">
                            Besar File: maks 10Mb
                            <br />
                            Ekstensi file: .PNG .JPG .JPEG{' '}
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-10 lg:flex-4/5">
                        <div>
                            <Label>Nama</Label>
                            <Input type="text" value={data.name} onChange={e => setData('name',e.target.value)} />
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
