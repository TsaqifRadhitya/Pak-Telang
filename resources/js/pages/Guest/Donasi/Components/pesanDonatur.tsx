import HeadingSmall from '@/components/heading-small';
import { donasiType } from '@/types/donasi';
import { usePage } from '@inertiajs/react';
import Heading from '../../../../components/heading';

type donasiMessageWithRemainingTimeType<T> = {
    selisih: string;
} & T;

const countTime = (param: Date) => {
    const today = new Date();
    const createdDate = new Date(param.toString());
    createdDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const msPerDay = 1000 * 60 * 60 * 24;
    const selisihHari = Math.floor((today.getTime() - createdDate.getTime()) / msPerDay);
    return `${selisihHari} hari yang lalu`;
};

export default function PesanDonatur() {
    const { donasi } = usePage<{ donasi: donasiType[] }>().props;
    const donasiMessageWithRemainingTime: donasiMessageWithRemainingTimeType<donasiType>[] = [...donasi].map((don) => ({
        ...don,
        selisih: countTime(don.created_at as Date),
    }));

    // Duplikasi data agar animasi terlihat seperti loop
    const duplicated = [...donasiMessageWithRemainingTime, ...donasiMessageWithRemainingTime];

    return (
        <section className="space-y-2 overflow-hidden bg-[#EBEFFF] py-4 pb-20 text-[#3B387E]">
            <Heading title="Pesan Donatur" className="text-center text-2xl font-bold lg:text-4xl" />
            <HeadingSmall title="Pesan donasi Anda akan dimuat di sini" className="text-center lg:text-xl" />
            <div className="relative mt-10 w-full overflow-hidden">
                <div className="animation-scroll flex py-1 whitespace-nowrap">
                    {duplicated.map((don, index) => (
                        <article key={index} className="mx-5 w-96 flex-shrink-0 rounded-xl bg-white p-5 shadow-md">
                            <div className="flex justify-between">
                                <p className="text-md font-semibold">{don.name ? don.name.split(' ').slice(0, 2).join(' ') : 'Orang Baik'}</p>
                                <p className="text-xs text-gray-500">{don.selisih}</p>
                            </div>
                            <p className="mt-2 line-clamp-3 text-sm text-gray-700">{don.pesan}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
