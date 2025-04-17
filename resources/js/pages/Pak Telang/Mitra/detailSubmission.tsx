import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import mitra from '@/types/mitra';
import { mouEditor } from '@/utils/mouEditor';
import { router, usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { renderAsync } from 'docx-preview';
import { useEffect, useRef, useState } from 'react';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

const mouUrl = 'https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Mou/Template/MOU%20Pak%20Telang%20(2).docx';

export default function DetailSubmission() {
    const { mitra } = usePage<{ mitra: mitra }>().props;

    useEffect(() => {
        document.querySelector('body')?.classList.add('overflow-y-hidden');
        mouEditor.replacer(mitra.mou ??  mouUrl, { User: mitra.user, address: mitra.address }).then((ress) => {
            renderAsync(ress, document.getElementById('docpreview') as HTMLElement);
        });
    }, []);

    const [modal, setModal] = useState<boolean>(false);
    const inputText = useRef<HTMLTextAreaElement>(null);
    const typeStatus = useRef<string>(null);
    const [headerModal, setHeaderModal] = useState<string>();
    const handleChangeStatus = (param: 'accept' | 'decline') => {
        typeStatus.current = param;
        if (param === 'accept') {
            if (mitra.statusPengajuan.search('MOU') > -1) {
                setHeaderModal('Setujui Pengajuan MoU Mitra?');
            } else {
                setHeaderModal('Setujui Pengajuan Mitra?');
            }
        } else {
            if (mitra.statusPengajuan.search('MOU') > -1) {
                setHeaderModal('Tolak Pengajuan MoU Mitra?');
            } else {
                setHeaderModal('Tolak Pengajuan Mitra?');
            }
        }
        setModal(true);
    };

    const handleSubmit = () => {
        router.patch(route('admin.mitra.pengajuan.update', { id: mitra.id, status: typeStatus.current, pesanPersetujuan: inputText.current?.value }));
        setModal(false);
    };
    return (
        <>
            {modal && (
                <div className="absolute z-50 flex min-h-screen w-screen items-center justify-center bg-black/40">
                    <div className="flex w-3/5 flex-col items-center gap-5 rounded-lg bg-[#FFFDF1] p-5 text-[#8A7300]">
                        <div className="flex w-full items-center gap-3">
                            <img
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                alt=""
                            />
                            <HeadingSmall title="Warning!!!" className="font-black" />
                        </div>
                        <DotLottieReact className="w-1/3" src="https://lottie.host/0d4d6ac7-6c39-410c-beae-8b835e7e6790/PrUVLgMZXE.lottie" autoplay />
                        <Heading title={headerModal as string} />
                        <p className="text-sm">Status Pengajuan tidak dapat diubah lagi ketika anda mengirim form ini.</p>
                        <div className="w-full space-y-2 px-5">
                            <HeadingSmall title="Pesan Persetujuan" className="font-black" />
                            <Textarea ref={inputText} placeholder="Pesan Persetujuan" className="placeholder:text-[#8A7300]" />
                        </div>
                        <div className="flex w-full justify-end gap-x-5 px-5">
                            <Button
                                onClick={() => setModal(false)}
                                className="cursor-pointer bg-transparent font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:font-normal hover:text-white lg:w-1/4"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="cursor-pointer bg-[#8A7300] font-normal text-white ring ring-[#8A7300] hover:bg-transparent hover:font-semibold hover:text-[#8A7300] lg:w-1/4"
                            >
                                Yakin
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <AdminPageLayout page="Mitra">
                <article className="flex-1 space-y-5 overflow-y-auto pb-16 lg:max-h-[91.4vh]">
                    <article className="w-full flex-1 rounded-lg border border-[#AFB3FF] bg-[#FFFFFF] shadow-xl">
                        <div className="flex items-center justify-between border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                            <h1 className="text-xl font-semibold">Mitra</h1>
                        </div>
                        <div className="flex gap-x-10 px-5 pt-7 pb-5 lg:px-10">
                            <div className="flex-1/6">
                                <img src={mitra.user.profile_picture} alt="" className="aspect-square w-full rounded-full shadow" />
                            </div>
                            <div className="flex-5/6">
                                <Heading title="Identitas Diri" />
                                <div className="flex gap-x-7.5">
                                    <div className="flex w-1/5 justify-between">
                                        <h3>Nama</h3>
                                        <h3>:</h3>
                                    </div>
                                    <h3>{mitra.user.name}</h3>
                                </div>
                                <div className="flex gap-x-7.5">
                                    <div className="flex w-1/5 justify-between">
                                        <h3>NIK</h3>
                                        <h3>:</h3>
                                    </div>
                                    <h3>{mitra.NIK}</h3>
                                </div>
                                <div className="flex gap-x-7.5">
                                    <div className="flex w-1/5 justify-between">
                                        <h3>Email</h3>
                                        <h3>:</h3>
                                    </div>
                                    <h3>{mitra.user.email}</h3>
                                </div>
                                <div className="flex gap-x-7.5">
                                    <div className="flex w-1/5 justify-between">
                                        <h3>Tanggal Lahir</h3>
                                        <h3>:</h3>
                                    </div>
                                    <h3>{mitra.user.birthday.split('-').reverse().join('-')}</h3>
                                </div>
                                <div className="flex gap-x-7.5">
                                    <div className="flex w-1/5 justify-between">
                                        <h3>Jenis Kelamin</h3>
                                        <h3>:</h3>
                                    </div>
                                    <h3>{mitra.user.gender}</h3>
                                </div>
                                <div className="flex gap-x-7.5">
                                    <div className="flex w-1/5 justify-between">
                                        <h3>Alamat</h3>
                                        <h3>:</h3>
                                    </div>
                                    <h3>{`${mitra.address.address} ${mitra.address.districtName}, ${mitra.address.cityName}, ${mitra.address.province} ${mitra.address.postalCode}`}</h3>
                                </div>
                                <div className="flex gap-x-7.5">
                                    <div className="flex w-1/5 justify-between">
                                        <h3>Foto KTP</h3>
                                        <h3>:</h3>
                                    </div>
                                    <img src={mitra.fotoKTP} className="aspect-video w-2/3 lg:w-2/5" alt="" />
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="w-full flex-1 space-y-5 rounded-lg border border-[#AFB3FF] bg-[#FFFFFF] px-5 py-2.5 shadow-xl lg:p-10 lg:pt-7">
                        <div className="flex w-full justify-between">
                            <Heading title="Pengajuan Usaha" />
                            <h1
                                className={cn(
                                    'text-xl font-bold',
                                    mitra.statusPengajuan === 'Menunggu Persetujuan Formulir'
                                        ? 'text-[#FFA114]'
                                        : mitra.statusPengajuan === 'Formulir ditolak'
                                          ? 'text-[#EC2525]'
                                          : 'text-[#048730]',
                                )}
                            >
                                {mitra.statusPengajuan === 'Menunggu Persetujuan Formulir'
                                    ? 'Pending'
                                    : mitra.statusPengajuan === 'Formulir ditolak'
                                      ? 'Ditolak'
                                      : 'Disetujui'}
                            </h1>
                        </div>
                        <div className="flex gap-x-7.5">
                            <div className="flex w-1/5 justify-between">
                                <h3>Nama Usaha</h3>
                                <h3>:</h3>
                            </div>
                            <h3>{mitra.namaUsaha}</h3>
                        </div>
                        <div className="flex gap-x-7.5">
                            <div className="flex w-1/5 justify-between">
                                <h3>Kulkas?</h3>
                                <h3>:</h3>
                            </div>
                            <h3>{mitra.kulkas ? 'Iya' : 'Tidak'}</h3>
                        </div>
                        <div className="flex gap-x-7.5">
                            <div className="flex w-1/5 justify-between">
                                <h3>Alasan Pengajuan</h3>
                                <h3>:</h3>
                            </div>
                            <h3>{mitra.alasanPengajuan}</h3>
                        </div>
                        <div className="flex gap-x-7.5">
                            <div className="flex w-1/5 justify-between">
                                <h3>Foto Dapur</h3>
                                <h3>:</h3>
                            </div>
                            <div className="grid w-4/6 gap-5 lg:grid-cols-3">
                                {mitra.fotoDapur.map((dapur) => (
                                    <img src={dapur} className="aspect-video w-full object-cover object-center" />
                                ))}
                            </div>
                        </div>
                        {mitra.statusPengajuan === 'Menunggu Persetujuan Formulir' && (
                            <div className="flex w-full justify-end gap-5">
                                <Button
                                    onClick={() => handleChangeStatus('decline')}
                                    className="cursor-pointer bg-transparent font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white lg:w-1/4"
                                >
                                    Batal
                                </Button>
                                <Button
                                    onClick={() => handleChangeStatus('accept')}
                                    className="cursor-pointer bg-[#5961BE] font-normal text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:w-1/4"
                                >
                                    Yakin
                                </Button>
                            </div>
                        )}
                    </article>
                    {(mitra.statusPengajuan === 'Formulir disetujui' || mitra.statusPengajuan.search('MOU') > -1) && (
                        <article className="flex w-full flex-1 flex-col space-y-10 overflow-y-auto rounded-lg border border-[#AFB3FF] bg-[#FFFFFF] px-5 py-5 shadow-xl lg:p-10 lg:py-2.5 lg:pt-7 lg:pb-8">
                            <div className="flex w-full justify-between">
                                <Heading title="Dokumen Memorandum of Understanding" />
                                <h1
                                    className={cn(
                                        'text-xl font-bold',
                                        mitra.statusPengajuan === 'MOU disetujui'
                                            ? 'text-[#048730]'
                                            : mitra.statusPengajuan === 'MOU ditolak'
                                              ? 'text-[#EC2525]'
                                              : 'text-[#FFA114]',
                                    )}
                                >
                                    {mitra.statusPengajuan === 'MOU disetujui'
                                        ? 'Disetujui'
                                        : mitra.statusPengajuan === 'Formulir disetujui'
                                          ? 'Menunggu MoU'
                                          : mitra.statusPengajuan === 'MOU ditolak'
                                            ? 'Ditolak'
                                            : 'Menunggu Persetujuan MoU'}
                                </h1>
                            </div>
                            <div className="max-h-screen overflow-y-auto">
                                <div id="docpreview" className="h-screen w-full"></div>
                            </div>
                            {mitra.statusPengajuan === 'Menunggu Persetujuan MOU' && (
                                <div className="flex w-full justify-end gap-5">
                                    <Button
                                        onClick={() => handleChangeStatus('decline')}
                                        className="cursor-pointer bg-transparent font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white lg:w-1/4"
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        onClick={() => handleChangeStatus('accept')}
                                        className="cursor-pointer bg-[#5961BE] font-normal text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:w-1/4"
                                    >
                                        Yakin
                                    </Button>
                                </div>
                            )}
                        </article>
                    )}
                </article>
            </AdminPageLayout>
        </>
    );
}
