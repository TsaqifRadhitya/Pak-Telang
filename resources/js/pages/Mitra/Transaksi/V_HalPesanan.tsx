import MitraPageLayout from '@/layouts/mitraPageLayout';
import { SharedData } from '@/types';
import { addressType } from '@/types/address';
import { paginateType } from '@/types/paginate';
import { productDetailType } from '@/types/productDetail';
import { transactionType } from '@/types/transaction';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import ContainerProvider, { sectionType } from './components/Index/containerProvider';
import DipesanComponent from './components/Index/Dipesan';
import PesananDiterimaComponent from './components/Index/pesananDiterima';
import PesananMasukComponent from './components/Index/pesananMasuk';
import RiwayatComponent from './components/Index/Riwayat';

type paginate<T> = {
    data: T[];
} & paginateType;
export interface props extends SharedData {
    pesananMasuk?: paginate<transactionType>;
    Riwayat?: paginate<transactionType>;
    pesananDiterima?: paginate<transactionType>;
    Dipesan?: paginate<transactionType>;
    providerAddress: addressType;
    section?: sectionType;
    stock: productDetailType[];
}

export default function TransactionIndex() {
    const { section } = usePage<props>().props;
    const [sectionPage, setSectionPage] = useState<sectionType>(section ?? 'Pesanan Masuk');
    return (
        <MitraPageLayout page="Transaksi">
            <ContainerProvider section={sectionPage} onChange={setSectionPage}>
                <div className="overflow-x-auto">
                    {sectionPage === 'Pesanan Masuk' && <PesananMasukComponent role="mitra" />}
                    {sectionPage === 'Pesanan Diterima' && <PesananDiterimaComponent role="mitra" />}
                    {sectionPage === 'Dipesan' && <DipesanComponent />}
                    {sectionPage === 'Riwayat' && <RiwayatComponent role="mitra" />}
                </div>
            </ContainerProvider>
        </MitraPageLayout>
    );
}
