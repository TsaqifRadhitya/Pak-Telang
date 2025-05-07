import React, { useEffect, useState } from 'react';

interface CountdownProps {
    updatedAt: string; // format ISO string, contoh: '2025-05-07T10:00:00Z'
    durationMinutes?: number;
    className?: string; // durasi countdown dalam menit (default: 60)
}

const Countdown: React.FC<CountdownProps> = ({ updatedAt, durationMinutes = 60, className }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const targetTime = new Date(new Date(updatedAt).getTime() + durationMinutes * 60 * 1000);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetTime.getTime() - now;

            setTimeLeft(diff > 0 ? diff : 0);

            if (diff <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [updatedAt, durationMinutes]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return (
        <div>
            <p className={className}>Sisa waktu: {formatTime(timeLeft)}</p>
        </div>
    );
};

export default Countdown;
