import Layout from '@/layouts/landingPageLayout';
import About from './Components/aboutUs';
import Contact from './Components/contact';
import Product from './Components/product';
import Testimoni from './Components/testimoni';
import Welcome from './Components/welcome';

export default function landingPage() {

    return (
        <Layout page='Home'>
            <Welcome />
            <About />
            <Testimoni />
            <Product />
            {/* <Contact /> */}
        </Layout>
    );
}
