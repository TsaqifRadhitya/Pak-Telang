import AdminPageLayout from '@/layouts/adminPageLayout';
import EWallet from '../../../components/ewallet';

export default function dashboardAdminPage({saldo} : {saldo : number}) {
    console.log(saldo)
    return (
        <AdminPageLayout page="Dashboard">
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div className='flex-1 p-5 lg:p-10 lg:pb-0 pb-0'>
                    <EWallet type='Admin' saldo={saldo} className='lg:w-2/5 w-full'/>
                </div>
            </main>
        </AdminPageLayout>
    );
}
