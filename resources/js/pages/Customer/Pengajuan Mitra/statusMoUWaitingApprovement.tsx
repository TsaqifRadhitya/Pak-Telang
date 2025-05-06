import CustomerPageLayout from '@/layouts/customerPagetLayout';
import mitra from '@/types/mitra';
import { usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { renderAsync } from 'docx-preview';
import { useEffect } from 'react';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

export default function MoUWaitingApprovement() {
    const { mitra } = usePage<{ mitra: mitra }>().props;
    console.log(mitra);
    useEffect(() => {
        fetch(mitra.mou).then((ress) => {
            renderAsync(ress.arrayBuffer(), document.getElementById('docpreview') as HTMLElement);
        });
    }, []);

    return (
        <CustomerPageLayout page="Pengajuan Mitra">
            <section className="flex h-fit w-full bg-[#EBEFFF] p-5 pt-20 lg:p-10 lg:pt-20">
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#3B387E]">
                    <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                        <h1 className="font-bold">Pengajuan Mitra</h1>
                    </div>
                    <div className="flex w-full flex-1 flex-col items-center gap-y-5 rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-10 shadow lg:px-16">
                        <article className="flex items-center gap-5 w-full">
                            <div className="aspect-square w-1/10">
                                <DotLottieReact loop src="https://lottie.host/d3553a30-65fc-40db-8bb4-ee6833b42553/xx35T6hHKB.lottie" autoplay />
                            </div>
                            <div>
                                <Heading title="Dokumen Memorandum of Understanding (MOU)" className="text-4xl" />
                                <HeadingSmall
                                    title="Halo Mitra Hebat!  Mohon tunggu selagi MoU Anda sedang tim kami review.
Kami akan segera menghubungi Anda begitu review selesai kami lakukan."
                                    className="w-2/3"
                                />
                            </div>
                        </article>
                        <div className="max-h-screen w-full overflow-y-auto">
                            <iframe src={mitra.mou} className='w-full h-screen'></iframe>
                        </div>
                        <p className="text-center">
                            Terima kasih telah menjadi bagian dari kami! <br /> Mari kita tumbuh dan sukses bersama!
                        </p>
                    </div>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
