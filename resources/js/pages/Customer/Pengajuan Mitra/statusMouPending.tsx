import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

export default function MouPending() {
    return (
        <CustomerPageLayout page="Kerja Sama">
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
                                Setelah Penandatanga scan dan unggah file MoU melalu {' '}
                                <span className="cursor-pointer underline decoration-[1.5px] underline-offset-2">link berikut</span> atau tombol
                                dibawah dokumen.
                            </p>
                        </article>
                        <iframe
                            src="https://docs.google.com/gview?embedded=true&url=https://docs.google.com/document/d/12ToP0oLIFvBCniG5Jyhtt_SrW7M4E0WM"
                            className="h-screen w-full"
                        ></iframe>
                        <div className="flex w-full gap-3">
                            <Button className="flex-1 bg-[#5961BE] text-white md:flex-none hover:bg-transparent ring ring-[#5961BE] hover:text-[#5961BE] cursor-pointer hover:font-semibold">Unduh File Sekarang</Button>
                            <Button className="cursor-pointer flex-1 bg-transparent font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white md:flex-none">
                                Unggah MoU
                            </Button>
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
