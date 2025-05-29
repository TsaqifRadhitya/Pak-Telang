import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { kontenType } from '@/types/koten';
import { router } from '@inertiajs/react';
import Heading from '../../../../components/heading';

export default function NewKontenItemComponent({ data, first = false }: { data: kontenType; first?: boolean }) {
    return (
        <div className="flex gap-7.5">
            <div className="flex flex-col items-center">
                {first && <div className="aspect-square rounded-full bg-[#5961BE] p-2.5"></div>}
                <div className="w-1 flex-1 bg-[#5961BE]"></div>
                <div className="aspect-square rounded-full bg-[#5961BE] p-2.5"></div>
            </div>
            <section
                className={cn('flex w-full flex-col items-center justify-between gap-y-5 md:gap-x-40 lg:flex-row', first ? 'my-7.5' : 'mt-4 mb-7.5')}
            >
                <div className="flex flex-col items-center gap-5 md:flex-row">
                    <img
                        src={data.imageCover}
                        alt=""
                        className="aspect-square h-fit w-full max-w-xs rounded-2xl object-cover object-center lg:w-32"
                    />
                    <div className="flex flex-col justify-center">
                        <Heading title={data.slug} />
                        <p className="line-clamp-3 text-justify text-sm">{data.content}</p>
                    </div>
                </div>
                <Button
                    onClick={() => router.get(route('konten.show', { id: data.id }))}
                    className="w-full cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:w-fit"
                >
                    Lihat
                </Button>
            </section>
        </div>
    );
}
