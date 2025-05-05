import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import EWallet from '../../../components/ewallet';

export default function DashboardMitraPage({ statusToko }: { statusToko: boolean }) {
    const {
        auth: {
            user: { saldo },
        },
    } = usePage<SharedData>().props;

    const [isOpen, setOpen] = useState<boolean>(false);
    const [isSubmited, setSubmited] = useState<boolean>(false);

    const handleStatusToko = () => {
        router.post(
            route('mitra.status.update', {
                status: !statusToko,
            }),
            {},
            {
                onStart: () => setSubmited(true),
                onFinish: () => {
                    setSubmited(false);
                },
            },
        );
        setOpen(false);
    };
    return (
        <>
            {isOpen && (
                <section id="alertDelete" className="fixed z-50 h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex w-full flex-1/2 items-center gap-x-4">
                                <img
                                    src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                    alt=""
                                />
                                <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                            </div>
                            <p className="flex-1/2 text-right text-xs text-[#8A7300]">Note : Status toko dapat diubah kapanpun</p>
                        </div>
                        <img className='max-w-32 aspect-square' src={window.location.origin + '/Asset/Image/image.png'} alt="" />
                        <Heading
                            title={`Apakah anda yakin untuk ${statusToko ? 'menutup' : 'membuka'} toko?`}
                            className="text-md line mx-auto text-center leading-5 font-medium text-[#8A7300]"
                        />

                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                onClick={() => setOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer bg-[#8A7300] text-white ring ring-[#8A7300] hover:bg-transparent hover:font-semibold hover:text-[#8A7300]"
                                onClick={handleStatusToko}
                            >
                                Yakin
                            </Button>
                        </div>
                    </article>
                </section>
            )}
            <MitraPageLayout page="Dashboard">
                <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                    </div>
                    <div className="flex-1 p-5 lg:px-10">
                        <div className="flex w-full gap-10">
                            <EWallet type="Mitra" saldo={saldo} className="flex-1/2" />
                            <section className="flex-1/2 space-y-1 rounded-lg p-5 text-[#3B387E] ring ring-[#3B387E]">
                                <Heading className="text-md font-semibold" title="Status Toko" />
                                <div className="flex items-center justify-between">
                                    <h1 className={cn('text-2xl font-semibold', statusToko ? 'text-[#048730]' : 'text-red-500')}>
                                        {statusToko ? 'Active' : 'Inactive'}
                                    </h1>
                                    <Button
                                        disabled={isSubmited}
                                        onClick={() => setOpen(true)}
                                        className="cursor-pointer bg-[#3B387E] px-10 text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E]"
                                    >
                                        Ubah
                                    </Button>
                                </div>
                                <HeadingSmall className="text-sm" title="Dapat Menerima Pesanan Dari Pembeli" />
                            </section>
                        </div>
                    </div>
                </main>
            </MitraPageLayout>
        </>
    );
}
