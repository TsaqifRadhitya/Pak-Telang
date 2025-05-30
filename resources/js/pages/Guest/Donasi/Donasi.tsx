import LandingPageLayout from '@/layouts/landingPageLayout';
import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import Banner from './Components/banner';
import MainContent from './Components/donasiSection';
import Penyaluran from './Components/penyaluran';
import PesanDonatur from './Components/pesanDonatur';

export default function DonasiPage({ snapToken }: { snapToken?: string }) {
    const formRef = useRef<HTMLDivElement>(null);
    const handleScrollToForm = (type: 'instant' | 'smooth') => {
        formRef.current?.scrollIntoView({ behavior: type === "instant" ? "instant" : "smooth" });
    };

    useEffect(() => {
        if (snapToken) {
            handlePayment();
        }
    }, [snapToken]);

    const handlePayment = () => {
        const script = document.createElement('script');
        const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.src = snapSrcUrl;
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_ID);
        script.async = true;

        script.onload = () => {
            if (window.snap) {
                window.snap.pay(snapToken as string, {
                    onClose: () => {
                        script.remove();
                    },
                    onSuccess: () => {
                        router.reload();
                    },
                });

                setTimeout(() => {
                    document.body.style.overflowY = 'auto';
                    handleScrollToForm('instant');
                }, 500);
            } else {
                console.error('Midtrans snap not loaded properly');
            }
        };

        document.body.appendChild(script);
    };

    return (
        <LandingPageLayout page="Donasi">
            <Banner handleScrollToForm={() => handleScrollToForm('smooth')} />
            <Penyaluran />
            <PesanDonatur />
            <MainContent ref={formRef} />
        </LandingPageLayout>
    );
}
