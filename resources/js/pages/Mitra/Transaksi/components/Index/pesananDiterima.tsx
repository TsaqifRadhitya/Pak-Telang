import { Button } from '@/components/ui/button';
import { addressType } from '@/types/address';
import { addressFormater } from '@/utils/addressFormater';
import { currencyConverter } from '@/utils/currencyConverter';
import { Deferred, router, usePage } from '@inertiajs/react';
import { props } from '../..';

export default function PesananDiterimaComponent({ role }: { role: 'admin' | 'mitra' }) {
    const { pesananDiterima } = usePage<props>().props;

    return (
        <table className="w-full">
            <thead className="flex w-full justify-between px-5 pb-5">
                <tr className="grid w-full grid-cols-5 text-center font-semibold">
                    <td>Transaksi ID</td>
                    <td>Items</td>
                    <td>Alamat Tujuan</td>
                    <td>Sub-total</td>
                    <td>Action</td>
                </tr>
            </thead>
            <Deferred data={'pesananDiterima'} fallback={<h1>Loading</h1>}>
                <tbody className="block max-h-[70vh] overflow-y-auto">
                    {pesananDiterima?.map((item) => (
                        <tr key={item.id} className="grid w-full grid-cols-5 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center">
                            <td className="text-sm break-words">{item.id}</td>
                            <td className="text-sm">
                                {item.detail_transaksis.map((detail) => {
                                    return (
                                        <h1>
                                            {detail.product?.productName} : <span>{detail.amount}</span>
                                        </h1>
                                    );
                                })}
                            </td>
                            <td className="text-sm">{addressFormater(item.address as addressType)}</td>
                            <td className="text-sm">{currencyConverter(item.Total)}</td>
                            <td>
                                <Button
                                    onClick={() => router.get(route(role === "mitra" ? 'mitra.transaksi.show' : 'admin.transaksi.show', { id: item.id }))}
                                    className="w-1/2 cursor-pointer bg-white px-0 py-0 text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                                >
                                    Lihat
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Deferred>
        </table>
    );
}
