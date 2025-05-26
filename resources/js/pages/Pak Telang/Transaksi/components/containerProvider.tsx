import { cn } from '@/lib/utils';
import { sectionType } from '@/pages/Mitra/Transaksi/components/Index/containerProvider';
import { router } from '@inertiajs/react';
import { ReactNode } from 'react';

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
            route('admin.transaksi', {
                q: param,
            }),
        );
    };
    return (
        <main className="relative flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
            <div className="flex flex-col items-center justify-between gap-y-2.5 border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5 xl:flex-row">
                <h1 className="w-full text-left text-xl font-semibold xl:w-fit">Transaksi</h1>
                <ul className="flex w-full flex-wrap gap-x-4 font-semibold xl:w-fit xl:flex-nowrap">
                    <li
                        onClick={() => handleChangeInnerSection('Pesanan Masuk')}
                        className={cn(
                            'text-sm lg:text-[1rem]',
                            section === 'Pesanan Masuk'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6',
                        )}
                    >
                        Pesanan Masuk
                    </li>
                    <li className="font-bold">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Pesanan Diterima')}
                        className={cn(
                            'text-sm lg:text-[1rem]',
                            section === 'Pesanan Diterima'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6',
                        )}
                    >
                        Pesanan Diterima
                    </li>
                    <li className="font-bold">|</li>
                    <li
                        onClick={() => handleChangeInnerSection('Riwayat')}
                        className={cn(
                            'text-sm lg:text-[1rem]',
                            section === 'Riwayat'
                                ? 'underline decoration-[#5961BE] decoration-5 underline-offset-6'
                                : 'cursor-pointer hover:underline hover:decoration-[#5961be]/80 hover:decoration-5 hover:underline-offset-6',
                        )}
                    >
                        Riwayat
                    </li>
                </ul>
            </div>
            <main className="flex-1 p-5 lg:px-10">{children}</main>
        </main>
    );
}
