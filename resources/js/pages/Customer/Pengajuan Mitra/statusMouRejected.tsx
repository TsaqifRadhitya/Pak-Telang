import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import CustomerPageLayout from '@/layouts/customerPagetLayout';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function MouRejected() {
    return (
        <CustomerPageLayout page="Pengajuan Mitra">
            <section className="flex h-fit w-full bg-[#EBEFFF] p-5 pt-20 lg:p-10 lg:pt-20">
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#3B387E]">
                    <div className="w-full rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-5 px-10 shadow lg:px-16">
                        <h1 className="font-bold">Pengajuan Mitra</h1>
                    </div>
                    <div className="flex w-full flex-1 flex-col items-center gap-y-5 rounded-3xl border border-[#AFB3FF] bg-[#FFFFFF] p-10 shadow lg:px-16">
                        <Heading title="Terima kasih telah mengirimkan dokumen penandatanganan MoU." className="text-2xl font-bold" />
                        <DotLottieReact
                            src="https://lottie.host/3bdb1646-ab46-4425-8064-0e6d286ae63e/h2freDTaU6.lottie"
                            className="max-w-md"
                            autoplay
                        />
                        <article className="flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-semibold">
                                Namun mohon maaf, dokumen MOU yang kami terima belum dapat kami proses karena terdapat beberapa kendala
                            </h3>
                            <p className="lg:w-3/5">Jangan khawatir! Anda bisa mengajukan kembali di lain waktu setelah melakukan penyesuaian.</p>
                        </article>
                        <Button className="cursor-pointer bg-[#5961BE] text-white hover:bg-[#4e55a1] min-w-sm">Ajukan Ulang</Button>
                        <div className="h-[1px] w-full bg-[#5961BE]"></div>
                        <article className='w-full space-y-1'>
                            <h1 className="font-semibold">Apa yang bisa Anda lakukan?</h1>
                            <p className="">Silakan periksa kembali dokumen MOU yang telah Anda tanda tangani dan pastikan:</p>
                            <p>1. Semua bagian diisi sesuai petunjuk</p>
                            <p>2. Tanda tangan sesuai dengan KTP</p>
                            <p>3. Tidak ada perubahan isi dokumen</p>
                            <p>4. Menggunakan Meterai 10.000 yang sah</p>
                        </article>
                    </div>
                </div>
            </section>
        </CustomerPageLayout>
    );
}
