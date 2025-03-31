import { usePage } from "@inertiajs/react";
import { props } from "../produkDetail";

export default function productDetailSection(){
    const {productDetail} = usePage<props>().props
    return(<section className="w-full h-screen bg-[#EBEFFF] p-5 lg:px-10 lg:py-20 lg:pb-10">
        <main className="bg-[#FFFFFF] w-full h-full shadow-md rounded-lg border border-[#AFB3FF]">

        </main>
    </section>)
}
