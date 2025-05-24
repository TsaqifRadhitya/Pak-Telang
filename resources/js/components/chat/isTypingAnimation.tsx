import { User } from '@/types';
import { useEffect, useState } from 'react';

export default function IsTypingComponent({ person }: { person: User }) {
    const [amountPoint, setAmountPoint] = useState<number>(1);
    useEffect(() => {
        setInterval(() => {
            setAmountPoint((prev) => (prev === 3 ? 0 : prev + 1));
        }, 500);
    }, []);
    return (
        <div className="flex gap-1.5">
            <h1>{person.name} sedang mengetik</h1>
            <p>
                {Array.from({ length: amountPoint })
                    .map(() => '.')
                    .join('')}
            </p>
        </div>
    );
}
