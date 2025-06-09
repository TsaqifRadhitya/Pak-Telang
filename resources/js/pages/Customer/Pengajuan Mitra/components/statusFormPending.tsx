import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Heading from '../../../../components/heading';

export default function FormPending() {
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
                            src="https://lottie.host/d3553a30-65fc-40db-8bb4-ee6833b42553/xx35T6hHKB.lottie"
                            className="max-w-md"
                            loop
                            autoplay
                        />
                        <article className="flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-bold">Pengajuanmu sedang kami proses.</h3>
                            <p>Mohon bersabar ya, kami akan menghubungimu setelah proses verifikasi selesai.</p>
                        </article>
                        <h1 className="w-full text-left">Estimasi waktu: 1–3 hari kerja</h1>
                    </div>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
