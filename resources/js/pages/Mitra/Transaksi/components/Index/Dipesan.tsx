import HeadingSmall from '@/components/heading-small';
import Loading from '@/components/loading';
import SinglePaginate from '@/components/singlePaginate';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { Deferred, router, usePage } from '@inertiajs/react';
import { props } from '../../V_HalPesanan';

export default function DipesanComponent() {
    const { Dipesan } = usePage<props>().props;
    return (
        <>
            {' '}
            <table className={cn('w-full', !!Dipesan && 'min-w-[600px]')}>
                <thead className="flex w-full justify-between px-5 pb-5">
                    <tr className="grid w-full grid-cols-6 text-center font-semibold">
                        <td className="text-sm lg:text-base">Transaksi ID</td>
                        <td className="text-sm lg:text-base">Items</td>
                        <td className="text-sm lg:text-base">Dibuat Pada</td>
                        <td className="text-sm lg:text-base">Status</td>
                        <td className="text-sm lg:text-base">Sub-total</td>
                        <td className="text-sm lg:text-base">Action</td>
                    </tr>
                </thead>
                <Deferred data={'Dipesan'} fallback={<Loading />}>
                    {Dipesan && Dipesan.data?.length > 0 ? (
                        <tbody className="block max-h-[70vh] overflow-y-auto">
                            {Dipesan.data?.map((item) => (
                                <tr
                                    key={item.displayId}
                                    className="grid w-full grid-cols-6 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center text-sm"
                                >
                                    <td className="text-xs break-words lg:text-sm">{item.displayId}</td>
                                    <td>
                                        {item.detail_transaksis.map((detail) => {
                                            return (
                                                <h1 className="text-xs lg:text-sm">
                                                    {detail.product?.productName} : <span>{detail.amount}</span>
                                                </h1>
                                            );
                                        })}
                                    </td>
                                    <td className="text-xs lg:text-sm">{dateFormaterUtils(item.created_at)}</td>
                                    <td className="text-xs lg:text-sm">{item.status}</td>
                                    <td className="text-xs lg:text-sm">{currencyConverter(item.Total + (item.ongkir ?? 0))}</td>
                                    <td>
                                        <Button
                                            onClick={() => router.get(route('mitra.order bahan.show', { id: item.id }))}
                                            className="w-1/2 cursor-pointer bg-white px-0 py-0 text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                                        >
                                            Lihat
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <HeadingSmall title="Data transaksi sedang dipesan tidak tersedia" className="text-center text-xs lg:text-lg" />
                    )}
                </Deferred>
            </table>
            {Dipesan && <SinglePaginate className="absolute bottom-5 left-1/2 translate-x-1/2" data={Dipesan} value="Dipesan" />}
        </>
    );
}
