import { useEffect, useState } from 'react';

export default function Loading() {
    const [amountPoint, setAmountPoint] = useState<number>(1);
    useEffect(() => {
        setInterval(() => {
            setAmountPoint((prev) => (prev === 3 ? 0 : prev + 1));
        }, 500);
    }, []);
    return (
        <div className="flex gap-1.5 justify-center">
            <h1>Loading</h1>
            <p>
                {Array.from({ length: amountPoint })
                    .map(() => '.')
                    .join('')}
            </p>
        </div>
    );
}
