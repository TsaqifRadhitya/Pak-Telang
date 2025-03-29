import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import Heading from '../components/heading';
interface props {
    children: ReactNode;
    page: 'Dashboard' | 'Mitra' | 'Produk' | 'Profile';
}

export default function adminPageLayout({ children, page }: props) {
    const { auth } = usePage<SharedData>().props;
    const [hamburgerMenu, setHamburgerMenu] = useState<Boolean>(false);
    return (
        <>
            <div className={cn('absolute z-50 h-screen w-screen bg-black/50 lg:hidden', hamburgerMenu ? 'block' : 'hidden')}>
                <Head title={page} />
                <motion.nav
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, transition: { duration: 0.1 } }}
                    className="flex h-full w-2/3 origin-left flex-col gap-y-5 bg-white px-5 pt-5 text-[#3B387E] sm:w-1/2"
                >
                    <div className="flex items-center gap-x-2.5 transition duration-500">
                        <Menu color="#3B387E" className="cursor-pointer" onClick={() => setHamburgerMenu(false)} />
                        <Heading title="Pak Telang" className="text-2xl" />
                    </div>
                    <ul className="space-y-4">
                        <li
                            onClick={() => (page !== 'Dashboard' ? router.get(route('admin.dashboard')) : null)}
                            className="flex items-center gap-x-1.5 text-xl"
                        >
                            <img src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Dashboard.svg" alt="" />
                            <h2>Dashboard</h2>
                        </li>
                        <li
                            onClick={() => (page !== 'Mitra' ? router.get(route('admin.mitra')) : null)}
                            className="flex items-center gap-x-1.5 text-xl"
                        >
                            <img src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Mitra.svg" alt="" />
                            <h2>Mitra</h2>
                        </li>
                        <li
                            onClick={() => (page !== 'Produk' ? router.get(route('admin.produk')) : null)}
                            className="flex items-center gap-x-1.5 text-xl"
                        >
                            <img src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Produk.svg" alt="" />
                            <h2>Produk</h2>
                        </li>
                        <li
                            onClick={() => (page !== 'Profile' ? router.get(route('admin.profile')) : null)}
                            className="flex items-center gap-x-1.5 text-xl"
                        >
                            <img src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Profile.svg" alt="" />
                            <h2>Profile</h2>
                        </li>
                    </ul>
                </motion.nav>
            </div>
            <div className="flex h-screen w-screen flex-col gap-y-7 overflow-y-hidden bg-[#EBEFFF] px-5 pt-5 text-[#3B387E] lg:px-10">
                <div className="flex items-center gap-x-2.5">
                    <Menu color="#3B387E" className="cursor-pointer lg:hidden" onClick={() => setHamburgerMenu(true)} />
                    <Heading title="Pak Telang" />
                </div>
                <main className="flex h-full gap-x-7">
                    <aside className="z-0 hidden flex-col gap-y-7 rounded-t-xl border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] pt-5 pl-5 drop-shadow-lg lg:flex lg:w-72">
                        <div className="flex w-full items-center gap-x-3">
                            <img src={auth.user.profile_picture} alt="foto" className="drop-shadowxl aspect-square w-1/5 rounded-full" />
                            <div className="w-fit">
                                <h2 className="text-lg font-semibold">{auth.user.name}</h2>
                                <p className="text-sm">{auth.user.email}</p>
                            </div>
                        </div>
                        <ul className="flex flex-col gap-y-5">
                            <li
                                onClick={() => (page !== 'Dashboard' ? router.get(route('admin.dashboard')) : null)}
                                className={cn(
                                    'text-md flex items-center gap-x-1.5 rounded-l-2xl border-[1px] border-r-0 border-[#AFB3FF] py-1.5 pl-4',
                                    page === 'Dashboard' ? 'bg-[#B9BDFF]' : 'cursor-pointer hover:bg-[#B9BDFF]/25',
                                )}
                            >
                                <img
                                    src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Dashboard.svg"
                                    alt=""
                                />
                                <h2>Dashboard</h2>
                            </li>
                            <li
                                onClick={() => (page !== 'Mitra' ? router.get(route('admin.mitra')) : null)}
                                className={cn(
                                    'text-md flex items-center gap-x-1.5 rounded-l-2xl border-[1px] border-r-0 border-[#AFB3FF] py-1.5 pl-4',
                                    page === 'Mitra' ? 'bg-[#B9BDFF]' : 'cursor-pointer hover:bg-[#B9BDFF]/25',
                                )}
                            >
                                <img src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Mitra.svg" alt="" />
                                <h2>Mitra</h2>
                            </li>
                            <li
                                onClick={() => (page !== 'Produk' ? router.get(route('admin.produk')) : null)}
                                className={cn(
                                    'text-md flex items-center gap-x-1.5 rounded-l-2xl border-[1px] border-r-0 border-[#AFB3FF] py-1.5 pl-4',
                                    page === 'Produk' ? 'bg-[#B9BDFF]' : 'cursor-pointer hover:bg-[#B9BDFF]/25',
                                )}
                            >
                                <img src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Produk.svg" alt="" />
                                <h2>Produk</h2>
                            </li>
                            <li
                                onClick={() => (page !== 'Profile' ? router.get(route('admin.profile')) : null)}
                                className={cn(
                                    'text-md flex items-center gap-x-1.5 rounded-l-2xl border-[1px] border-r-0 border-[#AFB3FF] py-1.5 pl-4',
                                    page === 'Profile' ? 'bg-[#B9BDFF]' : 'cursor-pointer hover:bg-[#B9BDFF]/25',
                                )}
                            >
                                <img
                                    src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/Profile.svg"
                                    alt=""
                                />
                                <h2>Profile</h2>
                            </li>
                        </ul>
                    </aside>
                    <article className="flex-1 lg:flex-4/5">{children}</article>
                </main>
            </div>
        </>
    );
}
