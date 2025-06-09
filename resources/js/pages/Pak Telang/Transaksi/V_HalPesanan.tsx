import AdminPageLayout from '@/layouts/adminPageLayout';
import { sectionType } from '@/pages/Mitra/Transaksi/components/Index/containerProvider';
import PesananDiterimaComponent from '@/pages/Mitra/Transaksi/components/Index/pesananDiterima';
import PesananMasukComponent from '@/pages/Mitra/Transaksi/components/Index/pesananMasuk';
import RiwayatComponent from '@/pages/Mitra/Transaksi/components/Index/Riwayat';
import { useState } from 'react';
import ContainerProvider from './components/containerProvider';

export default function TransactionIndex({ section }: { section?: sectionType }) {
    const [sectionPage, setSectionPage] = useState<sectionType>(section ?? 'Pesanan Masuk');
    return (
        <AdminPageLayout page="Transaksi">
            <ContainerProvider section={sectionPage} onChange={setSectionPage}>
                <div className="overflow-x-auto">
                    {sectionPage === 'Pesanan Diterima' && <PesananDiterimaComponent role="admin" />}
                    {sectionPage === 'Pesanan Masuk' && <PesananMasukComponent role="admin" />}
                    {sectionPage === 'Riwayat' && <RiwayatComponent role="admin" />}
                </div>
            </ContainerProvider>
        </AdminPageLayout>
    );
}
