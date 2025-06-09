import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import mitra from '@/types/mitra';
import { router, usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Heading from '../../../../components/heading';

export default function FormApprove() {
    const { mitra } = usePage<{ mitra: mitra }>().props;
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
                            src="https://lottie.host/65485d13-1bc6-458b-91eb-278d830ea57b/IEu1w1Y20n.lottie"
                            className="max-w-md"
                            autoplay
                            loop
                        />
                        <article className="flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-bold">
                                {mitra.pesanPersetujuan ? mitra.pesanPersetujuan : 'Selamat! Pengajuan kemitraan kamu telah disetujui'}
                            </h3>
                            <p className="lg:w-3/5">
                                Selanjutnya, kamu akan masuk ke tahap penandatanganan MOU (Memorandum of Understanding) sebagai mitra resmi kami.
                            </p>
                        </article>
                        <Button
                            onClick={() => router.get(route('customer.mou.index'))}
                            className="cursor-pointer bg-[#5961BE] text-white hover:bg-[#4e55a1]"
                        >
                            Tanda Tangan Sekarang
                        </Button>
                    </div>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
