import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { paginateType } from '@/types/paginate';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function SinglePaginate({ data, value, className }: { data: paginateType; value: string; className?: string }) {
    const [isChangePage, setChangePage] = useState<boolean>();
    const handleNextPage = () => {
        router.get(
            data.next_page_url,
            {},
            {
                only: [value],
                preserveState: true,
                preserveScroll: true,
                onStart: () => setChangePage(true),
                onFinish: () => setChangePage(false),
            },
        );
    };
    const handPrevPage = () => {
        router.get(
            data.prev_page_url,
            {},
            { only: [value], preserveState: true, preserveScroll: true, onStart: () => setChangePage(true), onFinish: () => setChangePage(false) },
        );
    };
    if (data.prev_page_url || data.next_page_url) {
        return (
            <section className={cn('flex justify-center gap-x-2.5', className)}>
                <Button
                    onClick={handPrevPage}
                    disabled={isChangePage || !data.prev_page_url}
                    className="group w-20 cursor-pointer border border-[#5961BE] bg-[#5961BE]"
                >
                    <svg className="-rotate-90" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            className="fill-white group-hover:fill-[#5961BE]"
                            d="M1.41 7.41016L6 2.83016L10.59 7.41016L12 6.00016L6 0.000156403L0 6.00016L1.41 7.41016Z"
                            fill="#323232"
                        />
                    </svg>
                </Button>
                <Button
                    onClick={handleNextPage}
                    disabled={isChangePage || !data.next_page_url}
                    className="group w-20 cursor-pointer border border-[#5961BE] bg-[#5961BE]"
                >
                    <svg className="rotate-90" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            className="fill-white group-hover:fill-[#5961BE]"
                            d="M1.41 7.41016L6 2.83016L10.59 7.41016L12 6.00016L6 0.000156403L0 6.00016L1.41 7.41016Z"
                            fill="#323232"
                        />
                    </svg>
                </Button>
            </section>
        );
    } else return null;
}
