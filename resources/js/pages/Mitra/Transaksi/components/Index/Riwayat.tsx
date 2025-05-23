import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { Deferred, router, usePage } from '@inertiajs/react';
import { props } from '../..';

export default function RiwayatComponent({ role }: { role: 'admin' | 'mitra' }) {
    const { Riwayat } = usePage<props>().props;
    return (
        <table className="w-full">
            <thead className="flex w-full justify-between px-5 pb-5">
                <tr className={cn('grid w-full grid-cols-6 text-center font-semibold', role === 'admin' && 'grid-cols-5')}>
                    <td>Transaksi ID</td>
                    <td>Items</td>
                    <td>Dibuat Pada</td>
                    {role === 'mitra' && <td>Kategori</td>}
                    <td>Sub-total</td>
                    <td>Action</td>
                </tr>
            </thead>
            <Deferred data={'Riwayat'} fallback={<h1>Loading</h1>}>
                <tbody className="block max-h-[70vh] overflow-y-auto">
                    {Riwayat?.map((item) => (
                        <tr
                            key={item.id}
                            className={cn(
                                'grid w-full grid-cols-6 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center text-sm',
                                role === 'admin' && 'grid-cols-5',
                            )}
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
                            {role === 'mitra' && (
                                <td className={item.type === 'Barang jadi' ? 'font-semibold text-[#048730]' : 'font-semibold text-[#FFA114]'}>
                                    {item.type === 'Barang jadi' ? 'Pesanan Masuk' : 'Pesanan Keluar'}
                                </td>
                            )}
                            <td>{currencyConverter(item.Total + (item.ongkir ?? 0))}</td>
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
