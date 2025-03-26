import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';

type navLocation = 'Home' | 'Konten' | 'Produk' | 'Donasi';

export default function LandingPageLayout({ children, page }: { children: React.ReactNode; page: navLocation }) {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen w-full">
            <Head title={page} />
            <nav className="hidden lg:fixed top-0 z-50 lg:flex w-full flex-row items-center justify-between px-10 py-5">
                <h1 className="text-2xl font-black text-[#3b387e]">Pak Telang</h1>
                <div className="hidden gap-x-16 md:flex">
                    <ul className="flex gap-x-20 font-semibold text-[#3b387e]">
                        <li className="">
                            <a href={route('home')} className={page === 'Home' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href={route('konten')} className={page === 'Konten' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Konten
                            </a>
                        </li>
                        <li>
                            <a href={route('produk')} className={page === 'Produk' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Produk
                            </a>
                        </li>
                        <li>
                            <a href={route('donasi')} className={page === 'Donasi' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Donasi
                            </a>
                        </li>
                    </ul>
                    <div className="flex gap-x-2">
                        {!auth.user && (
                            <>
                                {' '}
                                <Button
                                    onClick={() => router.get(route('login'))}
                                    className="min-h-10 min-w-28 cursor-pointer bg-transparent font-black text-[#5961BE] ring-1 ring-[#5961BE] hover:bg-transparent"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => router.get(route('register'))}
                                    className="min-h-10 min-w-28 cursor-pointer bg-[#5961BE] font-black hover:bg-[#5961BE] text-white"
                                >
                                    Register
                                </Button>
                            </>
                        )}
                        {auth.user && (
                            <>
                                <Button
                                    onClick={() => router.get(route('dashboard'))}
                                    className="min-h-10 min-w-28 cursor-pointer bg-transparent font-black text-[#5961BE] ring-1 ring-[#5961BE] hover:bg-transparent"
                                >
                                    Go To Dashboard
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <nav className="lg:hidden fixed top-0 z-50 flex flex-row w-full items-center justify-between bg-white px-6 py-4 shadow-sm md:px-10">
                <h1 className="text-2xl font-black text-[#3b387e]">Pak Telang</h1>

                {/* Mobile Menu Button */}
                <button className="lg:hidden ml-auto cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu size={28} className="text-[#3b387e]" />
                </button>

                {/* Navigation Menu */}
                <div
                    className={`absolute top-16 left-0 origin-top bg-white p-6 shadow-md transition-all w-full ${isMenuOpen ? 'scale-y-100' : 'scale-y-0'}`}
                >
                    <ul className="flex flex-col gap-y-4 text-lg font-semibold text-[#3b387e]">
                        <li>
                            <a href={route('home')} className={page === 'Home' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href={route('konten')} className={page === 'Konten' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Konten
                            </a>
                        </li>
                        <li>
                            <a href={route('produk')} className={page === 'Produk' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Produk
                            </a>
                        </li>
                        <li>
                            <a href={route('donasi')} className={page === 'Donasi' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Donasi
                            </a>
                        </li>
                    </ul>
                    <div className="mt-4 flex flex-col gap-y-2">
                        {!auth.user && (
                            <>
                                <Button
                                    onClick={() => router.get(route('login'))}
                                    className="min-h-10 min-w-28 cursor-pointer bg-transparent font-black text-[#5961BE] ring-1 ring-[#5961BE] hover:bg-transparent"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => router.get(route('register'))}
                                    className="min-h-10 min-w-28 cursor-pointer bg-[#5961BE] font-black hover:bg-[#5961BE] text-white"
                                >
                                    Register
                                </Button>
                            </>
                        )}
                        {auth.user && (
                            <Button
                                onClick={() => router.get(route('dashboard'))}
                                className="min-h-10 min-w-28 cursor-pointer bg-transparent font-black text-[#5961BE] ring-1 ring-[#5961BE] hover:bg-transparent"
                            >
                                Go To Dashboard
                            </Button>
                        )}
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
}
