import Layout from '@/layouts/landingPageLayout';
import About from './Components/aboutUs';
import Product from './Components/product';
import Testimoni from './Components/testimoni';
import Welcome from './Components/welcome';
import { useEffect } from 'react';
import SweetAlert from '@/components/sweatAlert';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
export default function LandingPage() {
    const {flash} = usePage<SharedData>().props
    useEffect(()=> {
        document.getElementById('app')?.removeAttribute('data-page')
    },[])
    return (
        <Layout page='Home'>
            {flash.success && <SweetAlert type='Success' message={flash.success}/>}
            <Welcome />
            <About />
            <Testimoni />
            <Product />
        </Layout>
    );
}
