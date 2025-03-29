import AdminPageLayout from '@/layouts/adminPageLayout';

export default function mitraAdminPage() {
    return (
        <AdminPageLayout page="Mitra">
            <main className="h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Mitra</h1>
                </div>
            </main>
        </AdminPageLayout>
    );
}
