import { Button } from '@/components/ui/button';
import { currencyConverter } from '@/utils/currencyConverter';
import { router, usePage } from '@inertiajs/react';
import { props } from '..';

export default function PesananDiterimaComponent() {
    const { pesananDiterima } = usePage<props>().props;

    return (
        <table className="w-full">
            <thead className="flex w-full justify-between px-5 pb-5">
                <tr className="grid w-full grid-cols-6 text-center text-lg font-semibold">
                    <td>Pembeli</td>
                    <td>Items</td>
                    <td>Alamat Tujuan</td>
                    <td>Sub-total</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {pesananDiterima?.map((item) => (
                    <tr key={item.id} className="grid w-full grid-cols-6 items-center border-t-[1.8px] border-[#D9D9D9] px-5 py-5 text-center">
                        <td>{item.user?.name}</td>
                        <td>
                            {item.detail_transaksis.map((detail) => {
                                return (
                                    <h1>
                                        {detail.product?.productName} : <span>{detail.amount}</span>
                                    </h1>
                                );
                            })}
                        </td>
                        <td>{item.address?.address}</td>
                        <td>{currencyConverter(item.ongkir ? item.Total + item.ongkir : item.Total)}</td>
                        <td>
                            <Button
                                onClick={() => router.get(route('mitra.transaksi.show', { id: item.id }))}
                                className="w-1/2 cursor-pointer bg-white px-0 py-0 text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                            >
                                Lihat
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
