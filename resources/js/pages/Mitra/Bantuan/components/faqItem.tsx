import { motion, AnimatePresence } from 'framer-motion';
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
        <section
            onClick={() => setOpen(!isOpen)}
            className={cn(
                'w-full cursor-pointer rounded-xl px-7 py-5 ring ring-[#3B387E] transition-all duration-300 ease-in',
            )}
        >
            <div className="flex items-center justify-between gap-10">
                <h1 className="text-justify font-semibold lg:text-lg">{header}</h1>
                <svg
                    className={cn('aspect-square w-10 font-semibold sm:w-[20px] transition-transform duration-300', !isOpen && '-rotate-180')}
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1.41 7.41016L6 2.83016L10.59 7.41016L12 6.00016L6 0.000156403L0 6.00016L1.41 7.41016Z" fill="#3B387E" />
                </svg>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.main
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="overflow-hidden">{children}</div>
                    </motion.main>
                )}
            </AnimatePresence>
        </section>
    );
}
