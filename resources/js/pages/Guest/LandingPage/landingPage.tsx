import Layout from '@/layouts/landingPageLayout';
import About from './Components/aboutUs';
import Product from './Components/product';
import Testimoni from './Components/testimoni';
import Welcome from './Components/welcome';
import { useEffect } from 'react';
export default function landingPage() {
    useEffect(()=> {
        document.getElementById('app')?.removeAttribute('data-page')
    },[])
    return (
        <Layout page='Home'>
            <Welcome />
            <About />
            <Testimoni />
            <Product />
        </Layout>
    );
}
