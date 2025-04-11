import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface props {
    message: string;
    type: 'Error' | 'Warning' | 'Success' | 'Info';
}

export default function SweetAlert({ message, type }: props) {
    const errorStyle = 'border-[#850000] text-[#850000] bg-[#FEF0F0]';
    const infoStyle = 'border-[#024489] text-[#024489] bg-[#F0F9FF]';
    const successStyle = 'border-[#048730] text-[#048730] bg-[#EAFFF1]';
    const warningStyle = 'border-[#8A7300] text-[#8A7300] bg-[#FFFDF1]';
    const style = type === 'Error' ? errorStyle : type === 'Info' ? infoStyle : type === 'Success' ? successStyle : warningStyle;
    const header = type === 'Error' ? 'Error Message' : type === 'Info' ? 'Attention' : type === 'Success' ? 'Succesfull' : 'Warning!!!';

    const icon =
        type === 'Error' ? '/errorIcon.svg' : type === 'Info' ? '/infoIcon.svg' : type === 'Success' ? '/successIcon.svg' : '/warningIcon.svg';
    const [show, setShow] = useState<boolean>(false);

    const { quote } = usePage<SharedData>().props;
    useEffect(() => {
        console.log(quote.message);
        setShow(true);
        const timeout = setTimeout(() => {
            setShow(false);
        }, 2500);
        return () => {
            clearTimeout(timeout);
        };
    }, [quote.message]);
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
                    exit={{ y: -100, transition: { duration: 0.4, ease: 'easeInOut' } }}
                    className={cn(
                        'fixed top-1 z-50 flex w-full gap-x-5 rounded-lg border p-5 py-2.5 shadow-xl md:right-5 md:max-w-96 md:min-w-72 lg:top-5',
                        style,
                    )}
                >
                    <img
                        src={'https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon' + icon}
                        className="scale-125"
                    />
                    <div>
                        <p className="font-semibold">{header}</p>
                        <p>{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
