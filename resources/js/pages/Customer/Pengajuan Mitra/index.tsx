import CustomerPageLayout from '@/layouts/customerPagetLayout';
import Banner from './banner';
import Benefit from './benefit';
import GaleryMitra from './galery';

export default function Index({type} : {type : "Baru" | "Sudah Ada"}) {
    return (
        <CustomerPageLayout page="Pengajuan Mitra">
            <Banner type={type}/>
            <Benefit/>
            <GaleryMitra type={type}/>
        </CustomerPageLayout>
    );
}
