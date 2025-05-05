import MitraPageLayout from '@/layouts/mitraPageLayout';
import { transactionType } from '@/types/transaction';
import { useState } from 'react';
import ContainerProvider, { sectionType } from './components/Index/containerProvider';
import DipesanComponent from './components/Index/Dipesan';
import PesananDiterimaComponent from './components/Index/pesananDiterima';
import PesananMasukComponent from './components/Index/pesananMasuk';
import RiwayatComponent from './components/Index/Riwayat';

export type props = {
    Dipesan: transactionType[];
    pesananDiterima: transactionType[];
    pesananMasuk: transactionType[];
    Riwayat: transactionType[];
};

export default function TransactionIndex({ section }: { section?: sectionType }) {
    const [sectionPage, setSectionPage] = useState<sectionType>(section ?? 'Pesanan Masuk');
    return (
        <MitraPageLayout page="Transaksi">
            <ContainerProvider section={sectionPage} onChange={setSectionPage}>
                {sectionPage === 'Pesanan Masuk' && <PesananMasukComponent />}
                {sectionPage === 'Pesanan Diterima' && <PesananDiterimaComponent />}
                {sectionPage === 'Dipesan' && <DipesanComponent />}
                {sectionPage === 'Riwayat' && <RiwayatComponent />}
            </ContainerProvider>
        </MitraPageLayout>
    );
}
