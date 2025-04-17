import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { SharedData } from '@/types';
import mitra from '@/types/mitra';
import { mouEditor } from '@/utils/mouEditor';
import { router, usePage } from '@inertiajs/react';
import { renderAsync } from 'docx-preview';
import { useEffect, useRef, useState } from 'react';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

const mouUrl = 'https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Mou/Template/MOU%20Pak%20Telang%20(2).docx';

export default function MouPending() {
    const { auth } = usePage<SharedData>().props;
    const { mitra } = usePage<{ mitra: mitra }>().props;
    const [errMou, setErrMou] = useState(false);
    const [mou, setMou] = useState<File | undefined>();
    const inputFile = useRef<HTMLInputElement>(null);

    useEffect(() => {
        mouEditor.replacer(mouUrl, { User: mitra.user, address: mitra.address }).then((ress) => {
            renderAsync(ress, document.getElementById('docpreview') as HTMLElement);
        });
    }, []);

    const handleOpen = () => {
        inputFile.current?.click();
    };

    const handleSubmit = async() => {
        if (!mou) {
            setErrMou(true);
            return;
        }

        const moueditor = new mouEditor(auth.user.email, 'Mou');
        const ress = await moueditor.uploadMoU(mou)

        router.post(route('customer.pengajuanmitra.store'), {
            mou : ress
        });
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setErrMou(false);
            setMou(e.target.files[0]);
            renderAsync(e.target.files[0].arrayBuffer(), document.getElementById('docpreview') as HTMLElement);
        }
    };
    return (
        <CustomerPageLayout page="Pengajuan Mitra">
            <section className="flex w-full bg-[#EBEFFF] p-5 pt-20 lg:p-10 lg:pt-20">
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#3B387E]">
                    <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                        <h1 className="font-bold">Pengajuan Mitra</h1>
                    </div>
                    <div className="flex w-full flex-1 flex-col items-center gap-y-5 rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-10 shadow lg:px-16">
                        <Heading title="Dokumen Memorandum of Understanding (MOU)" className="text-center text-lg md:text-xl" />
                        <p className="text-center text-xs md:text-lg">
                            Halo Mitra Hebat!
                            <br />
                            Selamat, pengajuan kemitraanmu telah disetujui dan kamu siap masuk ke tahap selanjutnya.
                        </p>
                        <article className="mt-5 w-full space-y-2.5">
                            <HeadingSmall title="Panduan Penandatangan MoU" className="font-bold" />
                            <p className="text-xs md:text-sm">
                                Silakan baca dengan saksama dokumen Memorandum of Understanding (MoU) yang kami lampirkan. MoU ini berisi hak,
                                kewajiban, serta ketentuan kerja sama antara Anda dan kami.
                            </p>
                            <p className="text-xs md:text-sm">
                                Setelah membaca dan memahami isi dokumen, mohon segera melakukan penandatanganan pada halaman terakhir sebagai tanda
                                persetujuan. Lakukan dengan cara mengunduh dan mencetak dokumen MoU. Kemudian lakukan penandatanganan di atas Meterai
                                yang sah.
                            </p>
                            <p className="text-xs md:text-sm">
                                Setelah Penandatanga scan dan unggah file MoU melalu{' '}
                                <span onClick={handleOpen} className="cursor-pointer underline decoration-[1.5px] underline-offset-2">
                                    link berikut
                                </span>{' '}
                                atau tombol dibawah dokumen.
                            </p>
                        </article>
                        <div className="flex w-full justify-start">
                            <Button
                                onClick={() => mouEditor.download()}
                                className="flex-1 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] md:flex-none"
                            >
                                Unduh File Sekarang
                            </Button>
                        </div>
                        <div className="max-h-screen w-full overflow-y-auto">
                            <div id="docpreview" className="h-screen w-full"></div>
                        </div>

                        <Input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            placeholder="Pilih File MoU"
                            ref={inputFile}
                            onChange={handleChangeInput}
                        />
                        <div className="w-full space-y-1">
                            <div className="flex w-full items-center gap-x-5">
                                <div
                                    onClick={handleOpen}
                                    className="flex flex-5/6 cursor-pointer items-center gap-5 rounded-lg border-2 border-[#B9BDFF] p-2.5"
                                >
                                    <button className="cursor-pointer rounded-sm bg-[#B9BDFF] p-1 px-3 text-sm font-semibold text-[#3B387E] hover:bg-[#B9BDFF]">
                                        Choose File
                                    </button>
                                    <p className="w-fit">{mou?.name ?? 'Pilih File MoU'}</p>
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    className="min-h-12 w-1/7 cursor-pointer bg-transparent font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white md:flex-none"
                                >
                                    Unggah MoU
                                </Button>
                            </div>
                            <p className="w-full text-xs text-red-500 italic">{errMou && 'Harap Mengupload File MoU'}</p>
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
