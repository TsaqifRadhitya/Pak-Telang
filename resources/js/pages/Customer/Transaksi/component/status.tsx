import Dikirim from './statusDalamPengiriman';
import Diproses from './statusDiproses';
import Gagal from './statusGagal';
import MenungguKonfirmasi from './statusMenungguKonfirmasi';
import MenungguPembayaran from './statusMenungguPembayara';

export type statusComponent = 'Menunggu Konfirmasi' | 'Menunggu Pembayaran' | 'Gagal Menemukan Provider' | 'Sedang DiProses' | 'Dalam Pengiriman';

export default function Status({ params }: { params: statusComponent }) {
    console.log(params)
    if (params === 'Dalam Pengiriman') {
        return <Dikirim />;
    } else if (params === 'Gagal Menemukan Provider') {
        return <Gagal />;
    } else if (params === 'Menunggu Konfirmasi') {
        return <MenungguKonfirmasi />;
    } else if (params === 'Menunggu Pembayaran') {
        return <MenungguPembayaran />;
    } else if (params === 'Sedang DiProses') {
        return <Diproses />;
    }
}
