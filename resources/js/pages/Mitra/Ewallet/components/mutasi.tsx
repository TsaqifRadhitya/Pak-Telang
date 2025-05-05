import { cn } from '@/lib/utils';
import { useState } from 'react';
import Pemasukan from './pemasukan';
import Pengeluaran from './pengeluaran';

export default function Mutasi() {
    const [section, setSection] = useState<'Pengeluaran' | 'Pemasukan'>('Pengeluaran');
    return (
        <div className="flex-1/2 rounded-t-lg border border-b-0 border-[#3B387E] p-5 pb-0">
            <div className="mt-2.5 flex w-auto gap-10 border-b-2 border-[#D9D9D9] pb-1.5">
                <p
                    onClick={() => setSection('Pengeluaran')}
                    className={cn(
                        'cursor-pointer text-xl font-semibold decoration-4 underline-offset-11 hover:underline hover:decoration-[#5961BE]/50',
                        section === 'Pengeluaran' && 'cursor-default underline decoration-[#5961BE] hover:decoration-[#5961BE]',
                    )}
                >
                    Pengeluaran
                </p>
                <p
                    onClick={() => setSection('Pemasukan')}
                    className={cn(
                        'cursor-pointer text-xl font-semibold decoration-4 underline-offset-11 hover:underline hover:decoration-[#5961BE]/50',
                        section === 'Pemasukan' && 'cursor-default underline decoration-[#5961BE] hover:decoration-[#5961BE]',
                    )}
                >
                    Pemasukan
                </p>
            </div>
            {section === 'Pengeluaran' ? <Pengeluaran /> : <Pemasukan />}
        </div>
    );
}
