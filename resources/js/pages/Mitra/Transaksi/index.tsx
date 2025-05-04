import MitraPageLayout from '@/layouts/mitraPageLayout';
import { useState } from 'react';
import ContainerProvider, { sectionType } from './components/containerProvider';
import DipesanComponent from './components/Dipesan';
import PesananDiterimaComponent from './components/pesananDiterima';
import PesananMasukComponent from './components/pesananMasuk';
import RiwayatComponent from './components/Riwayat';

export default function TransactionIndex() {
    const [section, setSection] = useState<sectionType>('Pesanan Masuk');
    return (
        <MitraPageLayout page="Transaksi">
            <ContainerProvider section={section} onChange={setSection}>
                {section === 'Dipesan' && <DipesanComponent/>}
                {section === 'Pesanan Diterima' && <PesananDiterimaComponent/>}
                {section === 'Pesanan Masuk' && <PesananMasukComponent/>}
                {section === 'Riwayat' && <RiwayatComponent/>}
            </ContainerProvider>
        </MitraPageLayout>
    );
}
