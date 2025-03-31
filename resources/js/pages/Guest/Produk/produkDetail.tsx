import LandingPageLayout from '@/layouts/landingPageLayout';
import { productType } from '@/types/product';
import ProductDetailSection from './Components/productDetailSection';
import ProductLainnyaSection from './Components/productLainnyaSection';

export type props = {
    products: productType[];
    productDetail: productType;
};

export default function productDetailPaget() {
    return (
        <LandingPageLayout page="Produk">
            <ProductDetailSection />
            <ProductLainnyaSection />
        </LandingPageLayout>
    );
}
