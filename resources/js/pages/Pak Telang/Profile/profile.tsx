import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { address } from '../../../types/address';
interface props extends SharedData {
    address? : address
}

export default function profileAdminPage() {
    const { auth,address } = usePage<props>().props;
    return (
        <AdminPageLayout page="Profile">
            <main className="w-full h-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center justify-between border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="flex-3/5 text-xl font-semibold">Profile</h1>

                </div>
                <div className="flex w-full flex-col gap-y-5 lg:gap-20 p-5 lg:p-10 ">
                    <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-16 lg:items-center">
                        <img src={auth.user.profile_picture} alt="" className="mx-auto lg:mx-0 aspect-square w-1/3 md:w-1/4 max-w-36 rounded-full shadow" />
                        <article className="text-[#3B387E] space-y-2.5">
                            <h3 className="text-xl font-semibold">Biodata Diri</h3>
                            <p>Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {auth.user.name}</p>
                            <p>
                                Tanggal Lahir : {auth.user.birthday?.toString()}
                            </p>
                            <p>Jenis Kelamin : {auth.user.gender}</p>
                        </article>
                    </div>
                    <article className="text-[#3B387E] space-y-2.5">
                        <h3 className="text-xl font-semibold">Kontak</h3>
                        <p>Email &nbsp;&nbsp; : {auth.user.email}</p>
                        <p>
                            No. Hp : {auth.user.phonenumber}
                        </p>
                        <p>Alamat : {address && `${address?.address} ${address?.districtName}, ${address?.cityName}, ${address?.province} ${address?.postalCode}`}</p>
                    </article>
                </div>
            </main>
        </AdminPageLayout>
    );
}
