import { router } from '@inertiajs/react';
import { ReactNode } from 'react';

export type sectionType = 'Pesanan Masuk' | 'Pesanan Diterima' | 'Dipesan' | 'Riwayat';

export default function ContainerProvider({
    section,
    onChange,
    children,
}: {
    section: sectionType;
    children: ReactNode;
    onChange?: React.Dispatch<React.SetStateAction<sectionType>>;
}) {
    const handleChangeInnerSection = (param: sectionType) => {
        if (onChange) {
            onChange(param);
            return;
        }
        router.get(
            route('mitra.transaksi', {
                q: param,
            }),
        );
    };
    return (
        <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
            <div className="flex items-center justify-between border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                <h1 className="text-xl font-semibold">Transaksi</h1>
                <ul className="flex gap-4 font-semibold">
                    <li
                        onClick={() => handleChangeInnerSection('Pesanan Masuk')}
                        className={
                            section === 'Pesanan Masuk'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6'
                        }
                    >
                        Pesanan Masuk
                    </li>
                    <li className="font-bold">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Pesanan Diterima')}
                        className={
                            section === 'Pesanan Diterima'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6'
                        }
                    >
                        Pesanan Diterima
                    </li>
                    <li className="font-bold">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Dipesan')}
                        className={
                            section === 'Dipesan'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6'
                        }
                    >
                        Dipesan
                    </li>
                    <li className="font-bold">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Riwayat')}
                        className={
                            section === 'Riwayat'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6'
                        }
                    >
                        Riwayat
                    </li>
                </ul>
            </div>
            <main className="flex-1 p-5 lg:px-10">{children}</main>
        </main>
    );
}
