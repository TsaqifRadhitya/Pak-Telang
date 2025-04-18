import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { router, usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Heading from '../../../components/heading';
import mitra from '@/types/mitra';

export default function FormRejected() {
    const { mitra } = usePage<{ mitra: mitra }>().props;
    console.log(mitra.pesanPersetujuan)
    return (
        <CustomerPageLayout page="Pengajuan Mitra">
            <section className="flex h-fit w-full bg-[#EBEFFF] p-5 pt-20 lg:p-10 lg:pt-20">
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#3B387E]">
                    <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                        <h1 className="font-bold">Pengajuan Mitra</h1>
                    </div>
                    <div className="flex w-full flex-1 flex-col items-center gap-y-5 rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-10 shadow lg:px-16">
                        <Heading title="Terima kasih telah mengajukan diri sebagai mitra!" className="text-2xl" />
                        <DotLottieReact
                            src="https://lottie.host/3bdb1646-ab46-4425-8064-0e6d286ae63e/h2freDTaU6.lottie"
                            className="max-w-md"
                            autoplay
                        />
                        <article className="flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-bold">
                                {mitra.pesanPersetujuan ? mitra.pesanPersetujuan : 'Mohon maaf, pengajuan kemitraanmu belum bisa kami setujui saat ini'}
                            </h3>
                            <p className="max-w-xl">
                                Jangan khawatir! Kamu bisa mengajukan kembali di lain waktu setelah melakukan penyesuaian. Kami tunggu kesempatan
                                kerja sama berikutnya
                            </p>
                        </article>
                        <Button
                            onClick={() => router.get(route('customer.pengajuanmitra.create'))}
                            className="cursor-pointer bg-[#5961BE] text-white hover:bg-[#4e55a1] md:min-w-sm"
                        >
                            Ajukan Ulang
                        </Button>
                    </div>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
