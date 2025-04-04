import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { ReactNode, useState } from 'react';
import Heading from '../components/heading';

interface Props {
    children: ReactNode;
    page: 'Dashboard' | 'Mitra' | 'Produk' | 'Profile';
}

export default function mitraPageLayout({ children, page }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    return (
        <div className="flex min-h-screen flex-col gap-y-5 bg-[#EBEFFF] text-[#3B387E] lg:gap-y-0 lg:px-10">
            <Head title={page} />

            {/* Mobile Sidebar Overlay */}
            {hamburgerMenu && (
                <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setHamburgerMenu(false)}>
                    <motion.nav
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1, transition: { duration: 0.1 } }}
                        className="absolute top-0 left-0 flex h-full w-2/3 origin-left flex-col gap-y-5 bg-white px-5 pt-5 sm:w-1/2"
                    >
                        <div className="flex items-center gap-x-2.5">
                            <Menu color="#3B387E" className="cursor-pointer" onClick={() => setHamburgerMenu(false)} />
                            <Heading title="Pak Telang" className="text-2xl" />
                        </div>
                        <ul className="space-y-4">
                            {['Dashboard', 'Mitra', 'Produk', 'Profile'].map((item) => (
                                <li
                                    key={item}
                                    className="flex cursor-pointer items-center gap-x-1.5 text-xl"
                                    onClick={() => page !== item && router.get(route(`mitra.${item.toLowerCase()}`))}
                                >
                                    <img
                                        src={`https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/${item}.svg`}
                                        alt=""
                                    />
                                    <h2>{item === 'Profile' ? 'Profil' : item}</h2>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-40 flex items-center gap-x-2.5 bg-white px-5 py-5 shadow lg:relative lg:bg-transparent lg:shadow-none">
                <Menu color="#3B387E" className="cursor-pointer lg:hidden" onClick={() => setHamburgerMenu(true)} />
                <div onClick={()=> router.get('/')}>
                    <Heading title="Pak Telang" className='cursor-pointer' />
                </div>
            </header>

            <div className="flex flex-1 gap-x-7 px-5 lg:px-0">
                {/* Sidebar */}
                <aside className="hidden flex-col gap-y-7 rounded-t-xl border border-b-0 border-[#AFB3FF] bg-white pt-5 pl-5 shadow-lg lg:flex lg:w-72">
                    <div className="flex items-center gap-x-3">
                        <img src={auth.user.profile_picture} alt="Profile" className="aspect-square w-1/5 rounded-full shadow" />
                        <div>
                            <h2 className="text-lg font-semibold">{auth.user.name}</h2>
                            <p className="text-sm">{auth.user.email}</p>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-y-5">
                        {['Dashboard', 'Produk', 'Profile'].map((item) => (
                            <li
                                key={item}
                                className={cn(
                                    'flex cursor-pointer items-center gap-x-1.5 rounded-l-2xl border border-r-0 border-[#AFB3FF] py-1.5 pl-4',
                                    page === item ? 'bg-[#B9BDFF]' : 'hover:bg-[#B9BDFF]/25',
                                )}
                                onClick={() => page !== item && router.get(route(`mitra.${item.toLowerCase()}`))}
                            >
                                <img
                                    src={`https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/${item}.svg`}
                                    alt=""
                                />
                                <h2>{item === 'Profile' ? 'Profil' : item}</h2>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="w-full lg:w-4/5">{children}</main>
            </div>
        </div>
    );
}
