import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { SharedData } from '@/types';
import { address } from '@/types/address';
import { router, usePage } from '@inertiajs/react';
interface props extends SharedData {
    address: address;
}
export default function profilePageCustomer() {
    const { auth, address } = usePage<props>().props;
    return (
        <CustomerPageLayout page="Profile">
            <main className="min-h-screen bg-[#EBEFFF] flex flex-col p-5 lg:p-10 pt-20 lg:pt-24">
                <article className="flex-1 w-full rounded-lg border border-[#AFB3FF] bg-[#FFFFFF] shadow-xl">
                    <header className="flex items-center border-b border-[#AFB3FF] px-6 py-6 lg:px-16">
                        <h1 className="flex-3/5 text-xl font-semibold text-[#3B387E]">Profile</h1>
                        <div className="flex flex-1/9 gap-x-3">
                            <Button
                                onClick={() => router.get(route('customer.profile.edit'))}
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
                    </header>
                    <div className="flex flex-col gap-y-10 p-6 lg:flex-row lg:p-16">
                        <div className="flex-1/5">
                            <img
                                src={auth.user.profile_picture || '/Asset/Icon/Profile.svg'}
                                alt=""
                                className="aspect-square mx-auto w-1/3 lg:mx-0 lg:w-4/5 rounded-full object-cover object-center shadow"
                            />
                        </div>
                        <div className="flex flex-4/5 flex-col gap-y-10 text-[#3B387E]">
                            <div className='flex flex-col gap-y-5'>
                                <h1 className="text-xl font-semibold">Biodata Diri</h1>
                                <div className="flex w-full gap-x-5 lg:gap-x-0">
                                    <div className="flex lg:w-1/6 justify-between lg:pr-5">
                                        <h1>Nama</h1>
                                        <h1>:</h1>
                                    </div>
                                    <h1>{auth.user.name}</h1>
                                </div>
                                <div className="flex w-full gap-x-5 lg:gap-x-0">
                                    <div className="flex lg:w-1/6 justify-between lg:pr-5">
                                        <h1>Tanggal Lahir</h1>
                                        <h1>:</h1>
                                    </div>
                                    <h1>{auth.user.birthday}</h1>
                                </div>
                                <div className="flex w-full gap-x-5 lg:gap-x-0">
                                    <div className="flex lg:w-1/6 justify-between lg:pr-5">
                                        <h1>Jenis Kelamin</h1>
                                        <h1>:</h1>
                                    </div>
                                    <h1>{auth.user.gender}</h1>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-5'>
                                <h1 className="text-xl font-semibold">Kontak</h1>
                                <div className="flex w-full gap-x-5 lg:gap-x-0">
                                    <div className="flex lg:w-1/6 justify-between lg:pr-5">
                                        <h1>Email</h1>
                                        <h1>:</h1>
                                    </div>
                                    <h1>{auth.user.email}</h1>
                                </div>
                                <div className="flex w-full gap-x-5 lg:gap-x-0">
                                    <div className="flex lg:w-1/6 justify-between lg:pr-5">
                                        <h1>No. Hp</h1>
                                        <h1>:</h1>
                                    </div>
                                    <h1>{auth.user.phonenumber}</h1>
                                </div>
                                <div className="flex w-full gap-x-5 lg:gap-x-0">
                                    <div className="flex lg:w-1/6 justify-between lg:pr-5">
                                        <h1>Alamat</h1>
                                        <h1>:</h1>
                                    </div>
                                    {address && <h1>{address.address} {address.districtName}, {address.cityName}, {address.province} {address.postalCode}</h1>}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </CustomerPageLayout>
    );
}
