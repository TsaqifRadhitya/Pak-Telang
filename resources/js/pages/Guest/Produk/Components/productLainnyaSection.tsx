import { usePage } from "@inertiajs/react";
import { props } from "../produkDetail";

export default function productLainnyaSection(){
    const {products} = usePage<props>().props
    return(<section className="w-full h-screen bg-[#EBEFFF] p-5 lg:px-10 lg:pt-10 lg:pb-20">
        <main className="w-full h-full bg-[#FFFFFF] border border-[#AFB3FF] shadow-lg rounded-lg">

        </main>
    </section>)
}
