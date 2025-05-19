import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function FAQComponent({
    header,
    children,
    defaultState = false,
}: {
    header: string;
    children: React.ReactNode;
    defaultState?: boolean;
}) {
    const [isOpen, setOpen] = useState<boolean>(defaultState);
    return (
        <section onClick={() => setOpen(!isOpen)} className="w-full cursor-pointer space-y-5 rounded-xl px-7 py-5 ring ring-[#3B387E]">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">{header}</h1>
                <h1 className={cn('-rotate-90 font-semibold', isOpen && 'rotate-90')}>{'<'}</h1>
            </div>
            {isOpen && <main>{children}</main>}
        </section>
    );
}
