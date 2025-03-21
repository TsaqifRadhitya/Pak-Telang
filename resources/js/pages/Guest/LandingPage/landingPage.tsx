import Layout from '@/layouts/landingPageLayout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import About from './Components/aboutUs';
import Contact from './Components/contact';
import Product from './Components/product';
import Testimoni from './Components/testimoni';
import Welcome from './Components/welcome';

export default function landingPage() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Layout page='Home'>
            <Head title="Welcome" />
            <Welcome />
            <About />
            <Testimoni />
            <Product />
            {/* <Contact /> */}
        </Layout>
    );
}
