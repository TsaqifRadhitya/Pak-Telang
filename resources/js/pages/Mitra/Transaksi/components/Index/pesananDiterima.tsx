import HeadingSmall from '@/components/heading-small';
import Loading from '@/components/loading';
import SinglePaginate from '@/components/singlePaginate';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { addressType } from '@/types/address';
import { addressFormater } from '@/utils/addressFormater';
import { currencyConverter } from '@/utils/currencyConverter';
import { Deferred, router, usePage } from '@inertiajs/react';
import { props } from '../..';

export default function PesananDiterimaComponent({ role }: { role: 'admin' | 'mitra' }) {
    const { pesananDiterima } = usePage<props>().props;
    return (
        <>
            <table className={cn('w-full', !!pesananDiterima && 'min-w-[600px]')}>
                <thead className="flex w-full justify-between px-5 pb-5">
                    <tr className="grid w-full grid-cols-5 text-center font-semibold">
                        <td className="text-sm lg:text-base">Transaksi ID</td>
                        <td className="text-sm lg:text-base">Items</td>
                        <td className="text-sm lg:text-base">Alamat Tujuan</td>
                        <td className="text-sm lg:text-base">Sub-total</td>
                        <td className="text-sm lg:text-base">Action</td>
                    </tr>
                </thead>
                <Deferred data={'pesananDiterima'} fallback={<Loading />}>
                    {pesananDiterima && pesananDiterima.data?.length > 0 ? (
                        <tbody className="block max-h-[70vh] overflow-y-auto">
                            {pesananDiterima.data?.map((item) => (
                                <tr
                                    key={item.displayId}
                                    className="grid w-full grid-cols-5 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center"
                                >
                                    <td className="text-xs break-words lg:text-sm">{item.displayId}</td>
                                    <td className="text-xs lg:text-sm">
                                        {item.detail_transaksis.map((detail) => {
                                            return (
                                                <h1>
                                                    {detail.product?.productName} : <span>{detail.amount}</span>
                                                </h1>
                                            );
                                        })}
                                    </td>
                                    <td className="text-xs lg:text-sm">{addressFormater(item.address as addressType)}</td>
                                    <td className="text-xs lg:text-sm">{currencyConverter(item.Total + (item.ongkir ?? 0))}</td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                router.get(route(role === 'mitra' ? 'mitra.transaksi.show' : 'mitra.transaksi.show', { id: item.id }))
                                            }
                                            className="w-1/2 cursor-pointer bg-white px-0 py-0 text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                                        >
                                            Lihat
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <HeadingSmall title="Data transaksi diterima tidak tersedia" className="text-center text-xs lg:text-lg" />
                    )}
                </Deferred>
            </table>
            {pesananDiterima && (
                <SinglePaginate className="absolute bottom-5 left-1/2 translate-x-1/2" data={pesananDiterima} value="pesananDiterima" />
            )}
        </>
    );
}
