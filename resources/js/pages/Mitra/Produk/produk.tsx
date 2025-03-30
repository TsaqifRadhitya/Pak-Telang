import MitraPageLayout from '@/layouts/mitraPageLayout';

export default function productMitraPage() {
    return (
        <MitraPageLayout page="Produk">
            <main className="relative z-0 h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="absolute right-0 bottom-0 -translate-1/4 cursor-pointer rounded-full bg-[#B9BDFF] p-4 shadow hover:bg-[#a2a7f9]"></div>
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Produk</h1>
                </div>
            </main>
        </MitraPageLayout>
    );
}
