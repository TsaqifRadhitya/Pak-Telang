import MitraPageLayout from '@/layouts/mitraPageLayout';
import { transactionType } from '@/types/transaction';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import ContainerProvider, { sectionType } from './components/containerProvider';
import DipesanComponent from './components/Dipesan';
import PesananDiterimaComponent from './components/pesananDiterima';
import PesananMasukComponent from './components/pesananMasuk';
import RiwayatComponent from './components/Riwayat';

export type props = {
    Dipesan: transactionType[];
    pesananDiterima: transactionType[];
    pesananMasuk: transactionType[];
    Riwayat: transactionType[];
};

export default function TransactionIndex() {
    console.log(usePage().props);
    const [section, setSection] = useState<sectionType>('Pesanan Masuk');
    return (
        <MitraPageLayout page="Transaksi">
            <ContainerProvider section={section} onChange={setSection}>
                {section === 'Pesanan Masuk' && <PesananMasukComponent />}
                {section === 'Pesanan Diterima' && <PesananDiterimaComponent />}
                {section === 'Dipesan' && <DipesanComponent />}
                {section === 'Riwayat' && <RiwayatComponent />}
            </ContainerProvider>
        </MitraPageLayout>
    );
}
