import AdminPageLayout from '@/layouts/adminPageLayout';
import { Plus } from 'lucide-react';
export default function productAdminPage() {
    return (
        <AdminPageLayout page="Produk">
            <main className="z-0 relative h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="cursor-pointer absolute shadow right-0 p-4 bottom-0 -translate-1/4 rounded-full bg-[#B9BDFF] hover:bg-[#a2a7f9]">
                    <Plus size={40} />
                </div>
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Produk</h1>
                </div>
            </main>
        </AdminPageLayout>
    );
}
