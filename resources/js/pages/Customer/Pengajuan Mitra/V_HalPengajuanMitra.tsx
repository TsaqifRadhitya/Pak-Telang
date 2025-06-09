import CustomerPageLayout from '@/layouts/customerPagetLayout';
import Banner from './components/banner';
import Benefit from './components/benefit';
import GaleryMitra from './components/galery';

export default function Index({type} : {type : "Baru" | "Sudah Ada"}) {
    return (
        <CustomerPageLayout page="Pengajuan Mitra">
            <Banner type={type}/>
            <Benefit/>
            <GaleryMitra type={type}/>
        </CustomerPageLayout>
    );
}
