import { router, usePage } from '@inertiajs/react';
import { prop } from './mitra';
import HeadingSmall from '../../../components/heading-small';
import { cn } from '@/lib/utils';

export default function SubmissionMitra() {
    const { pengajuanMitra } = usePage<prop>().props;
    return (
        <section className="grid w-full flex-col gap-7.5 overflow-y-auto p-5 px-10 pt-2.5 md:grid md:h-[82vh] md:grid-cols-2 xl:grid-cols-3 lg:pt-10 lg:px-12">
            {pengajuanMitra.map((mitra)=> <article onClick={()=>router.get(route('admin.mitra.pengajuan.index',{id : mitra.id}))} className='cursor-pointer ring ring-[#B9BDFF] w-full aspect-square shadow-md rounded-lg flex flex-col items-center px-10 py-5 justify-between'>
                <img src={mitra.user.profile_picture} className="w-1/2 aspect-square object-center object-cover rounded-full" alt="" />
                <h1 className='w-full text-start font-black text-xl'>{mitra.user.name}</h1>
                <div className='flex w-full justify-between text-[0.65rem] gap-x-1.5 items-center'>
                    <p className='flex-1/2'>{mitra.user.email}</p>
                    <p className='flex-1/2 text-end'>{mitra.user.phonenumber}</p>
                </div>
                <HeadingSmall className='text-xs' title={`${mitra.address.address} ${mitra.address.districtName}, ${mitra.address.cityName}, ${mitra.address.province} ${mitra.address.postalCode}`}/>
                <div className={cn('w-full text-center font-[570] py-1.5 self-start text-xs rounded-2xl text-white',mitra.statusPengajuan.search('Menunggu') > -1 ? "bg-[#FFAC31]" : mitra.statusPengajuan.search('disetujui') > -1 ? "bg-[#1BA536]" : "bg-[#EC2525]")}>
                <p>{mitra.statusPengajuan}</p>
                </div>
            </article>)}
        </section>
    );
}
