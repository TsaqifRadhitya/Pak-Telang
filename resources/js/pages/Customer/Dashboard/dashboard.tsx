import CustomerPageLayout from '@/layouts/customerPagetLayout';

export default function dashboardCustomerPage() {
    return (
        <CustomerPageLayout page="Dashboard">
            <section className="flex min-h-screen w-full bg-[#EBEFFF] p-5 pt-20 text-[#3B387E] lg:p-10 lg:pt-24">
                <main className="z-0 flex-1 rounded-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                    </div>
                </main>
            </section>
        </CustomerPageLayout>
    );
}
