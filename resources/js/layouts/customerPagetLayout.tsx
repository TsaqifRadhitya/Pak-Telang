import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Contact from '@/pages/Guest/LandingPage/Components/contact';
import { SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

type navLocation = 'Profile' | 'Riwayat' | 'Pengajuan Mitra' | 'Kerja Sama';

export default function customerPageLayout({ children, page }: { children: React.ReactNode; page: navLocation }) {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const [scroll, setScroll] = useState<Boolean>(false);
    useMotionValueEvent(scrollYProgress, 'change', (latestValue) => {
        if (latestValue) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    });
    return (
        <div className="relative min-h-screen w-full">
            <Head title={page} />
            <nav
                className={cn(
                    'top-0 z-50 hidden w-full flex-row items-center justify-between px-10 py-5 lg:fixed lg:flex',
                    scroll ? 'bg-[#EBEFFF] shadow-md' : null,
                )}
            >
                <h1 onClick={() => router.get('/')} className="text-2xl font-semibold text-[#3b387e] cursor-pointer">Pak Telang</h1>
                <div className="hidden gap-x-16 md:flex">
                    <ul className="flex translate-y-1/5 gap-x-20 font-medium text-[#3b387e]">
                        <li className="">
                            <a
                                // href={route('home')}
                                className={
                                    page === 'Profile'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Profil
                            </a>
                        </li>
                        <li>
                            <a
                                // href={route('konten')}
                                className={
                                    page === 'Riwayat'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Riwayat
                            </a>
                        </li>
                        <li>
                            <a
                                // href={route('produk')}
                                className={
                                    page === 'Pengajuan Mitra'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Pengajuan Mitra
                            </a>
                        </li>
                        <li>
                            <a
                                // href={route('donasi')}
                                className={
                                    page === 'Kerja Sama'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Kerja Sama
                            </a>
                        </li>
                    </ul>
                    <div className="flex gap-x-2">
                        <Button
                            onClick={() => router.post(route('logout'))}
                            className="min-h-10 min-w-28 cursor-pointer bg-[#EC2525] font-medium text-white hover:bg-[#db1d1d]"
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </nav>
            <nav className="fixed top-0 z-50 flex w-full flex-row items-center justify-between bg-white px-6 py-4 shadow-sm md:px-10 lg:hidden">
                <h1 className="text-2xl font-bold text-[#3b387e]">Pak Telang</h1>

                {/* Mobile Menu Button */}
                <button className="ml-auto cursor-pointer lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu size={28} className="text-[#3b387e]" />
                </button>

                {/* Navigation Menu */}
                <div
                    className={`absolute top-16 left-0 w-full origin-top bg-white p-6 shadow-md transition-all ${isMenuOpen ? 'scale-y-100' : 'scale-y-0'}`}
                >
                    <ul className="flex flex-col gap-y-4 text-lg font-medium text-[#3b387e]">
                        <li>
                            <a
                                // href={route('home')}
                                className={
                                    page === 'Profile'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Profile
                            </a>
                        </li>
                        <li>
                            <a
                                // href={route('konten')}
                                className={
                                    page === 'Riwayat'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Riwayat
                            </a>
                        </li>
                        <li>
                            <a
                                // href={route('produk')}
                                className={
                                    page === 'Pengajuan Mitra'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Pengajuan Mitra
                            </a>
                        </li>
                        <li>
                            <a
                                // href={route('donasi')}
                                className={
                                    page === 'Kerja Sama'
                                        ? 'underline decoration-4 underline-offset-8'
                                        : 'hover:underline hover:decoration-4 hover:underline-offset-8'
                                }
                            >
                                Kerja Sama
                            </a>
                        </li>
                    </ul>
                    <div className="mt-4 flex flex-col gap-y-2">
                        <Button
                            onClick={() => router.post(route('logout'))}
                            className="min-h-10 min-w-28 cursor-pointer bg-[#EC2525] font-medium text-white hover:bg-[#db1d1d]"
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </nav>
            {children}
            <Contact />
        </div>
    );
}
