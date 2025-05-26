import { cn } from '@/lib/utils';
import { useState } from 'react';
import Heading from '../../../../components/heading';
import Berhasil from './berhasil';
import Pending from './pending';
export default function PencairanDana() {
    const [section, setSection] = useState<'Pending' | 'Berhasil'>('Pending');
    return (
        <div className="flex-1 rounded-lg lg:rounded-b-none border lg:border-b-0 border-[#3B387E] p-5 pb-0">
            <Heading title="Pencairan Dana" />
            <div className="mt-5 flex w-auto gap-5 border-b-2 border-[#D9D9D9]">
                <p
                    onClick={() => setSection('Pending')}
                    className={cn(
                        'cursor-pointer decoration-2 underline-offset-6 hover:underline hover:decoration-[#5961BE]/50',
                        section === 'Pending' && 'cursor-default underline decoration-[#5961BE] hover:decoration-[#5961BE]',
                    )}
                >
                    Pending
                </p>
                <p
                    onClick={() => setSection('Berhasil')}
                    className={cn(
                        'cursor-pointer decoration-2 underline-offset-6 hover:underline hover:decoration-[#5961BE]/50',
                        section === 'Berhasil' && 'cursor-default underline decoration-[#5961BE] hover:decoration-[#5961BE]',
                    )}
                >
                    Berhasil
                </p>
            </div>
            {section === 'Pending' ? <Pending /> : <Berhasil />}
        </div>
    );
}
