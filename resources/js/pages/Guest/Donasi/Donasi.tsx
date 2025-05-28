import LandingPageLayout from '@/layouts/landingPageLayout';
import { useRef } from 'react';
import Banner from './Components/banner';
import MainContent from './Components/donasiSection';
import Penyaluran from './Components/penyaluran';
import PesanDonatur from './Components/pesanDonatur';

export default function DonasiPage() {
    const formRef = useRef<HTMLDivElement>(null);
    const handleScrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <LandingPageLayout page="Donasi">
            <Banner handleScrollToForm={handleScrollToForm} />
            <Penyaluran />
            <PesanDonatur />
            <MainContent ref={formRef} />
        </LandingPageLayout>
    );
}
