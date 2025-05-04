import { Button } from '@/components/ui/button';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { transactionType } from '@/types/transaction';
import { currencyConverter } from '@/utils/currencyConverter';
import ContainerProvider, { sectionType } from './components/containerProvider';

export default function TransactionShow({ section, transaction }: { section: sectionType; transaction: transactionType }) {
    console.log(section, transaction);
    return (
        <MitraPageLayout page="Transaksi">
            <ContainerProvider section={section}>
                <section>
                    <div className="space-y-10">
                        <div className="flex">
                            <p className="flex-1/2">
                                {' '}
                                Alamat : {transaction.address?.address}, {transaction.address?.districtName}, {transaction.address?.cityName},{' '}
                                {transaction.address?.province}, {transaction.address?.postalCode}
                            </p>
                            <p className="flex-1/2 text-right">Metode Pengiriman : {transaction.metodePengiriman}</p>
                        </div>
                        <table className="p w-full">
                            <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                                <tr className="grid w-full grid-cols-4 text-left">
                                    <th className="text-center">Nama Produk</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Harga</th>
                                    <th className="text-center">Sub-total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.detail_transaksis.map((item) => (
                                    <tr
                                        key={item.productId}
                                        className="grid w-full grid-cols-4 items-center border-b-[1.8px] border-[#D9D9D9] px-5 py-7 text-center"
                                    >
                                        <td>{item.product?.productName}</td>
                                        <td>{item.amount}</td>
                                        <td>{currencyConverter(item.subTotal / item.amount)}</td>
                                        <td>{currencyConverter(item.subTotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-5 font-semibold">
                        <div className="flex justify-between px-2.5">
                            <p>Subtotal</p>
                            <p>{currencyConverter(transaction.Total)}</p>
                        </div>
                        <div className="flex justify-between px-2.5">
                            <p>Ongkir</p>
                            <p>{currencyConverter(transaction.ongkir ?? 0)}</p>
                        </div>
                        <div className="flex justify-between border-t-2 border-[#D9D9D9] px-2.5 pt-5 text-xl font-bold">
                            <p>Total</p>
                            <p>{currencyConverter(transaction.Total + (transaction.ongkir ?? 0))}</p>
                        </div>
                        <div className="flex justify-end pt-2.5">
                            {section === 'Dipesan' && transaction.status === 'Dalam Pengiriman' && (
                                <Button
                                    // onClick={handlePayment}
                                    className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                                >
                                    Ubah Status
                                </Button>
                            )}

                            {section === 'Pesanan Diterima' && transaction.status === 'Pembayaran Berhasil' && (
                                <Button
                                    // onClick={handlePayment}
                                    className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                                >
                                    Ubah Status
                                </Button>
                            )}

                            {section === 'Pesanan Masuk' && (
                                <Button
                                    disabled={!!transaction.providerId}
                                    // onClick={handlePayment}
                                    className="w-full max-w-56 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                                >
                                    Konfirmasi Pesanan
                                </Button>
                            )}
                        </div>
                    </div>
                </section>
            </ContainerProvider>
        </MitraPageLayout>
    );
}
