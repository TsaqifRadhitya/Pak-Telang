import LandingPageLayout from '@/layouts/landingPageLayout';
import Banner from './Components/banner';
import MainContent from './Components/donasiSection';
import Penyaluran from './Components/penyaluran';

export default function donasiPage() {
    return (
        <LandingPageLayout page="Donasi">
            <Banner />
            <Penyaluran />
            <MainContent />
        </LandingPageLayout>
    );
}
