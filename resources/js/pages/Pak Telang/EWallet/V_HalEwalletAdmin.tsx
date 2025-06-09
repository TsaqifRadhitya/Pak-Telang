import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { eWalletType } from '@/types/eWallett';
import { currencyConverter } from '@/utils/currencyConverter';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '../../../components/heading';
import Berhasil from './components/berhasil';
import Pending from './components/pending';

export interface props extends SharedData {
    mutations: eWalletType[];
    saldo: number;
}

type sectionType = 'Pending' | 'Berhasil';

export default function EwaletIndex() {
    const { saldo } = usePage<props>().props;
    const [section, setSection] = useState<sectionType>('Pending');
    return (
        <AdminPageLayout>
            <main className="flex w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg lg:h-full">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">E-Wallet</h1>
                </div>
                <div className="w-ful flex flex-1 flex-col gap-4 p-5 lg:p-10 lg:pt-7 lg:pb-0">
                    <div className="h-fit w-full space-y-2.5 rounded-lg p-2.5 px-5 ring ring-[#3B387E]">
                        <Heading className="text-md" title="E-Wallet Mitra" />
                        <Heading className="text-2xl font-semibold" title={currencyConverter(saldo)} />
                        <Heading className="text-xs font-semibold" title="Saldo Mitra" />
                    </div>
                    <div className="flex-1 rounded-lg p-5 ring ring-[#3B387E] lg:rounded-b-none">
                        <Heading className="text-xl" title="Pencairan Dana" />
                        <div className="mt-5 w-full">
                            <div className="flex gap-5 border-b-2 border-[#D9D9D9] py-1.5 font-extralight">
                                <p
                                    onClick={() => setSection('Pending')}
                                    className={cn(
                                        'cursor-pointer decoration-3 underline-offset-12 hover:underline hover:decoration-[#5961BE]/80',
                                        section === 'Pending' && 'cursor-default underline decoration-[#5961BE] hover:decoration-[#5961BE]',
                                    )}
                                >
                                    Pending
                                </p>
                                <p
                                    onClick={() => setSection('Berhasil')}
                                    className={cn(
                                        'cursor-pointer decoration-3 underline-offset-12 hover:underline hover:decoration-[#5961BE]/80',
                                        section === 'Berhasil' && 'cursor-default underline decoration-[#5961BE] hover:decoration-[#5961BE]',
                                    )}
                                >
                                    Berhasil
                                </p>
                            </div>
                            <div className="h-80 overflow-y-auto">{section === 'Berhasil' ? <Berhasil /> : <Pending />}</div>
                        </div>
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
