import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface AlertProps {
    title: string;
    close: () => void;
    confirm: () => void;
}

export function AlertDialog({ title, close, confirm }: AlertProps) {
    const handleClick = (type: 'Cancel' | 'Confirm') => {
        if (type === 'Confirm') confirm();
        close();
    };
    return (
        <motion.div className="h-fit w-fit">
            <Card>
                <CardHeader>
                    <motion.img src="" alt="" />
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                    <Button onClick={() => handleClick('Cancel')}>Batalkan</Button>
                    <Button onClick={() => handleClick('Confirm')}>Konfirmasi</Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
