import { usePage } from "@inertiajs/react";
import { props } from "../produkDetail";

export default function productLainnyaSection(){
    const {products} = usePage<props>().props
    return(<section className="w-full min-h-screen bg-cyan-500">
    </section>)
}
