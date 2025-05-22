import { cn } from '@/lib/utils';
import { currencyConverter } from '@/utils/currencyConverter';
import { router } from '@inertiajs/react';
import Heading from './heading';
import HeadingSmall from './heading-small';
import { Button } from './ui/button';

export default function EWallet({ saldo, type, className }: { className?: string; saldo: number; type: 'Mitra' | 'Admin' }) {
    return (
        <section className={cn('h-fit w-fit space-y-1 rounded-lg p-5 text-[#3B387E] ring ring-[#3B387E]', className)}>
            <Heading className="text-md font-semibold" title="E-Wallet Mitra" />
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{currencyConverter(saldo)}</h1>
                <Button
                    onClick={() => router.get(route(type === 'Admin' ? 'admin.ewallet' : 'mitra.ewallet'))}
                    className="cursor-pointer bg-[#3B387E] text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E]"
                >
                    Lihat E-Wallet
                </Button>
            </div>
            <HeadingSmall className="text-sm font-semibold" title={type === 'Admin' ? 'Saldo Mitra' : 'Saldo Anda'} />
        </section>
    );
}
