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
            <div className="flex items-center justify-between gap-10 mdgap-20">
                <h1 className="text-justify font-semibold lg:text-lg">{header}</h1>
                <svg
                    className={cn('font-semibold aspect-square w-10 sm:w-[20px]', isOpen && 'rotate-180')}
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1.41 7.41016L6 2.83016L10.59 7.41016L12 6.00016L6 0.000156403L0 6.00016L1.41 7.41016Z" fill="#3B387E" />
                </svg>
            </div>
            {isOpen && <main>{children}</main>}
        </section>
    );
}
