import { Button } from '@/components/ui/button';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { stockChecker } from '@/utils/stockChecker';
import { Deferred, router, usePage } from '@inertiajs/react';
import { props } from '../..';

export default function PesananMasukComponent({ role }: { role: 'admin' | 'mitra' }) {
    const { pesananMasuk, stock } = usePage<props>().props;
    return (
        <table className="w-full">
            <thead className="flex w-full justify-between px-5 pb-5">
                <tr className="grid w-full grid-cols-6 text-center font-semibold">
                    <td>Transaksi ID</td>
                    <td>Items</td>
                    <td>Dibuat Pada</td>
                    <td>Alamat Tujuan</td>
                    <td>Sub-total</td>
                    <td>Action</td>
                </tr>
            </thead>
            <Deferred data={['pesananDiterima', 'providerAddress', 'stock']} fallback={<h1>loading</h1>}>
                <tbody className="block max-h-[70vh] overflow-y-auto">
                    {stockChecker(pesananMasuk, stock)?.map((item) => (
                        <tr
                            key={item.id}
                            className="grid w-full grid-cols-6 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center text-sm"
                        >
                            <td className="break-words">{item.id}</td>
                            <td>
                                {item.detail_transaksis.map((detail) => {
                                    return (
                                        <h1>
                                            {detail.product?.productName} : <span>{detail.amount}</span>
                                        </h1>
                                    );
                                })}
                            </td>
                            <td>{dateFormaterUtils(item.created_at)}</td>
                            <td>{item.status}</td>
                            <td>{currencyConverter(item.Total)}</td>
                            <td className="flex gap-2">
                                <Button
                                    onClick={() => router.get(route(role === "mitra" ? 'mitra.transaksi.show' : 'admin.transaksi.show', { id: item.id }))}
                                    className="w-1/2 cursor-pointer bg-white px-0 py-0 text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                                >
                                    Lihat
                                </Button>
                                <Button className="w-1/2 cursor-pointer bg-[#5961BE] px-0 py-0 text-xs font-normal text-white ring ring-[#5961BE] hover:bg-white hover:font-semibold hover:text-[#5961BE]">
                                    Terima
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Deferred>
        </table>
    );
}
