import { Button } from '@/components/ui/button';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { SharedData } from '@/types';
import { address } from '@/types/address';
import { router, usePage } from '@inertiajs/react';

interface props extends SharedData {
    address?: address;
}

export default function profilePage() {
    const { auth, address } = usePage<props>().props;
    return (
        <MitraPageLayout page="Profile">
            <main className="h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center justify-between border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="flex-3/5 text-xl font-semibold">Profil</h1>
                    <div className="flex flex-2/5 gap-x-3">
                        <Button
                            onClick={() => router.get(route('mitra.profile.edit'))}
                            className="flex-1/2 cursor-pointer bg-[#FFA114] text-white hover:bg-[#d68f24]"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => router.post(route('logout'))}
                            className="flex-1/2 cursor-pointer bg-[#FF3636] text-white hover:bg-[#d72e2e]"
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-y-5 p-5 lg:gap-20 lg:p-10">
                    <div className="flex flex-col gap-y-5 lg:flex-row lg:items-center lg:gap-x-16">
                        <img
                            src={auth.user.profile_picture || '/Asset/Icon/Profile.svg'}
                            alt=""
                            className="mx-auto aspect-square w-1/3 max-w-36 rounded-full shadow md:w-1/4 lg:mx-0"
                        />
                        <article className="space-y-2.5 text-[#3B387E]">
                            <h3 className="text-xl font-semibold">Biodata Diri</h3>
                            <p>Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {auth.user.name}</p>
                            <p>Tanggal Lahir : {auth.user.birthday?.toString()}</p>
                            <p>Jenis Kelamin : {auth.user.gender}</p>
                        </article>
                    </div>
                    <article className="space-y-2.5 text-[#3B387E]">
                        <h3 className="text-xl font-semibold">Kontak</h3>
                        <p>Email &nbsp;&nbsp; : {auth.user.email}</p>
                        <p>No. Hp : {auth.user.phonenumber}</p>
                        <p>
                            Alamat :{' '}
                            {address &&
                                `${address?.address} ${address?.districtName}, ${address?.cityName}, ${address?.province} ${address?.postalCode}`}
                        </p>
                    </article>
                </div>
            </main>
        </MitraPageLayout>
    );
}
