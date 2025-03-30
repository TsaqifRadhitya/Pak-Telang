import LandingPageLayout from '@/layouts/landingPageLayout';
import Contact from '../LandingPage/Components/contact';
import Product from '../LandingPage/Components/product';

export default function produkPage() {
    return (
        <LandingPageLayout page="Produk">
            <Product/>
            <Contact />
        </LandingPageLayout>
    );
}
