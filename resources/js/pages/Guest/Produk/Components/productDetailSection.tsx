import { usePage } from "@inertiajs/react";
import { props } from "../produkDetail";

export default function productDetailSection(){
    const {productDetail} = usePage<props>().props
    return(<section className="w-full lg:h-screen">
    </section>)
}
