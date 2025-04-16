import HeadingSmall from '@/components/heading-small';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { prop } from './mitra';

export default function AllMitra() {
    const { mitra } = usePage<prop>().props;
    return (
        <section className="grid w-full flex-col gap-10 overflow-y-auto p-5 px-10 pt-2.5 md:grid md:h-[82vh] md:grid-cols-2 lg:grid-cols-3 lg:px-12 lg:pt-10">
            {mitra.map((mitra) => (
                <article className="flex aspect-square w-full flex-col items-center justify-between rounded-lg px-10 py-5 shadow">
                    <img src={mitra.user.profile_picture} className="aspect-square w-1/2 rounded-full object-cover object-center" alt="" />
                    {/* <Heading title={mitra.user.name} className='w-full text-start'/> */}
                    <div>
                        <h1 className="w-full text-start text-xl font-black">{mitra.user.name}</h1>
                        <div className="flex w-full items-center justify-between gap-x-1.5 text-[0.65rem]">
                            <p className="flex-1/2">{mitra.user.email}</p>
                            <p className="flex-1/2">{mitra.user.email}</p>
                        </div>
                    </div>

                    <HeadingSmall
                        className="text-xs"
                        title={`${mitra.address.address} ${mitra.address.districtName}, ${mitra.address.cityName}, ${mitra.address.province} ${mitra.address.postalCode}`}
                    />
                    <div
                        className={cn(
                            'w-full self-start rounded-2xl py-1.5 text-center text-xs font-[570] text-white',
                            mitra.isOpen ? 'bg-[#1BA536]' : 'bg-[#00B4C6]',
                        )}
                    >
                        <p>{mitra.isOpen ? 'Active' : 'Inactive'}</p>
                    </div>
                </article>
            ))}
        </section>
    );
}
