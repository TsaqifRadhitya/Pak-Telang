import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

type navLocation = 'Home' | 'Konten' | 'Produk' | 'Donasi';

export default function landingPageLayout({ children, page }: { children: React.ReactNode; page: navLocation }) {
    return (
        <div className="relative min-h-screen w-full">
            <nav className="fixed top-0 flex w-full flex-row items-center justify-between px-10 py-5 z-50">
                <h1 className="text-2xl font-black text-[#3b387e]">Pak Telang</h1>
                <div className="hidden gap-x-16 md:flex">
                    <ul className="flex gap-x-20 font-semibold text-[#3b387e]">
                        <li className="">
                            <a href={route('home')} className={ page === 'Home' ? 'underline decoration-4 underline-offset-8' : ''}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href={route('konten')} className={ page === 'Konten' ? 'underline decoration-4 underline-offset-8' : ''}>Konten</a>
                        </li>
                        <li>
                            <a href={route('produk')} className={ page === 'Produk' ? 'underline decoration-4 underline-offset-8' : ''}>Produk</a>
                        </li>
                        <li>
                            <a href={route('donasi')} className={ page === 'Donasi' ? 'underline decoration-4 underline-offset-8' : ''}>Donasi</a>
                        </li>
                    </ul>
                    <div className="flex gap-x-2">
                        <Button
                            onClick={() => router.get(route('login'))}
                            className="min-h-10 min-w-28 cursor-pointer bg-transparent font-black text-[#5961BE] ring-1 ring-[#5961BE] hover:bg-transparent"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => router.get(route('register'))}
                            className="min-h-10 min-w-28 cursor-pointer bg-[#5961BE] font-black hover:bg-[#5961BE]"
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
}
