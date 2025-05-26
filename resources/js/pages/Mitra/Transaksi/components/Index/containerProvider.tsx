import { cn } from '@/lib/utils';
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
            <div className="flex flex-col gap-y-2.5 xl:flex-row items-center justify-between border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                <h1 className="text-xl font-semibold text-left w-full xl:w-fit">Transaksi</h1>
                <ul className="flex flex-wrap xl:flex-nowrap gap-x-4 font-semibold w-full xl:w-fit">
                    <li
                        onClick={() => handleChangeInnerSection('Pesanan Masuk')}
                        className={
                            cn("text-sm lg:text-[1rem]",section === 'Pesanan Masuk'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6')
                        }
                    >
                        Pesanan Masuk
                    </li>
                    <li className="font-bold">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Pesanan Diterima')}
                        className={
                            cn("text-sm lg:text-[1rem]",section === 'Pesanan Diterima'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6')
                        }
                    >
                        Pesanan Diterima
                    </li>
                    <li className="font-bold">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Dipesan')}
                        className={
                            cn("text-sm lg:text-[1rem]",section === 'Dipesan'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6')
                        }
                    >
                        Dipesan
                    </li>
                    <li className="font-bold ">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Riwayat')}
                        className={
                            cn("text-sm lg:text-[1rem]",section === 'Riwayat'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6')
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
