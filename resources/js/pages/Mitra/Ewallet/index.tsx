import MitraPageLayout from '@/layouts/mitraPageLayout';
import { SharedData } from '@/types';
import { eWalletType } from '@/types/eWallett';
import Mutasi from './components/mutasi';
import PencairanDana from './components/pencairanDana';
import Saldo from './components/saldo';

export interface props extends SharedData {
    mutations: eWalletType[];
}

export default function EwaletIndex() {
    return (
        <MitraPageLayout>
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">E-Wallet</h1>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5 lg:flex-row lg:p-10 lg:pb-0">
                    <div className="flex flex-1/2 flex-col gap-4">
                        <Saldo />
                        <PencairanDana />
                    </div>
                    <Mutasi />
                </div>
            </main>
        </MitraPageLayout>
    );
}
