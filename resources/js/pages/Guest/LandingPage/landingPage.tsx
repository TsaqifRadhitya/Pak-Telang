import Layout from '@/layouts/landingPageLayout';
import { useEffect } from 'react';
import About from './Components/aboutUs';
import Product from './Components/product';
import Testimoni from './Components/testimoni';
import Welcome from './Components/welcome';
export default function LandingPage({ reset }: { reset: boolean }) {
    useEffect(() => {
        document.getElementById('app')?.removeAttribute('data-page');
        if (reset) {
            window.localStorage.removeItem('transactionItem');
        }
    }, [reset]);
    return (
        <Layout page="Home">
            <Welcome />
            <About />
            <Testimoni />
            <Product />
        </Layout>
    );
}
