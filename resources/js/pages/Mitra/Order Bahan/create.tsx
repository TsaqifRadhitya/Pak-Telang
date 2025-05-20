import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { cn } from '@/lib/utils';
import { addressType } from '@/types/address';
import { productType } from '@/types/product';
import { rajaOngkirType } from '@/types/rajaOngkir';
import { unit, weightType } from '@/types/weight';
import { currencyConverter } from '@/utils/currencyConverter';
import { weightConverter } from '@/utils/weightConverter';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { detailTransactionType } from '../../../types/detailTransaction';

export default function OrderBahanCreate({
    products,
    selectedProduct,
    address,
}: {
    products: productType[];
    selectedProduct?: string;
    address: addressType;
}) {
    const [transactionItem, setTransactionItem] = useState<detailTransactionType[]>();
    const [isSubmited, setSubmited] = useState<boolean>(false);
    const [isFetching, setFetching] = useState<boolean>(false);
    const [outDated, setOutDated] = useState<boolean>(true);
    const [err, setErr] = useState<boolean>();
    const [selectedKurir, setSelectedKurir] = useState<rajaOngkirType>();
    const [ongkirProvider, setOngkirProvider] = useState<rajaOngkirType[]>();
    useEffect(() => {
        const transactionItemSaved = window.localStorage.getItem('transactionItem');
        if (transactionItemSaved && selectedProduct) {
            setTransactionItem(JSON.parse(transactionItemSaved));
            handleChangeAmount('Increment', selectedProduct);
            return;
        }

        if (selectedProduct) {
            handleChangeAmount('Increment', selectedProduct);
            handleFetchKurir();
            return;
        }

        if (transactionItemSaved) {
            setTransactionItem(JSON.parse(transactionItemSaved));
            return;
        }
    }, []);

    useEffect(() => {
        if (selectedKurir && err) {
            setErr(false);
        }
    }, [selectedKurir]);

    useEffect(() => {
        if (transactionItem?.length) {
            window.localStorage.setItem('transactionItem', JSON.stringify(transactionItem));
        }
    }, [transactionItem]);

    const handleFetchKurir = async () => {
        if (transactionItem && outDated && !isFetching) {
            setFetching(true);
            const rawWeight: weightType[] = transactionItem.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                return {
                    unit: product!.productUnit as unit,
                    weight: product!.productNetto * item.amount,
                };
            });
            const weight = weightConverter(rawWeight);
            const price = transactionItem!.map((item) => item.subTotal).reduce((total, current) => total + current, 0);
            const getKurir = await axios.get(route('rajaongkir'), {
                params: {
                    weight: weight,
                    item_value: price,
                },
            });
            setOngkirProvider(getKurir.data);
            setFetching(false);
            setOutDated(false);
        }
    };

    const handleDeleteTransactionItem = (params: string) => {
        setOutDated(true);
        setOngkirProvider(undefined);
        setSelectedKurir(undefined);
        setTransactionItem((prev) => prev?.filter((item) => item.productId !== params));
    };

    const handleSubmit = () => {
        if (transactionItem?.length && selectedKurir) {
            setSubmited(true);
            router.post(
                route('mitra.order bahan.store'),
                {
                    ongkir: selectedKurir?.shipping_cost ?? 0,
                    metodePengiriman: `${selectedKurir?.shipping_name} (${selectedKurir?.service_name})`,
                    data: transactionItem,
                },
                {
                    onFinish: () => window.location.reload(),
                },
            );
            return
        }
        setErr(true);
    };

    const handleChangeAmount = (params: 'Increment' | 'decrement', id: string) => {
        setOutDated(true);
        setOngkirProvider(undefined);
        setSelectedKurir(undefined);
        setTransactionItem((prev) => {
            const existing = prev?.find((item) => item.productId === id);
            const product = products.find((p) => p.id === id);
            if (!product) return prev;
            if (!existing) {
                return [
                    ...(prev ?? []),
                    {
                        productId: product.id,
                        productName: product.productName,
                        amount: 1,
                        subTotal: product.productPrice,
                    },
                ];
            }

            return prev?.map((item) => {
                if (item.productId !== id) return item;

                const currentAmount = item.amount;
                const pricePerUnit = item.subTotal / currentAmount;

                if (params === 'Increment' && currentAmount < product.productStock) {
                    const newAmount = currentAmount + 1;
                    return {
                        ...item,
                        amount: newAmount,
                        subTotal: pricePerUnit * newAmount,
                    };
                }

                if (params === 'decrement' && currentAmount > 1) {
                    const newAmount = currentAmount - 1;
                    return {
                        ...item,
                        amount: newAmount,
                        subTotal: pricePerUnit * newAmount,
                    };
                }

                return item;
            });
        });
    };

    return (
        <MitraPageLayout page="Order Bahan">
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Order Bahan</h1>
                </div>
                <div className="flex flex-1 gap-5 p-5 px-7 pt-5 lg:pb-0">
                    <div className="max-h-[79vh] flex-1/2 space-y-5 overflow-y-auto px-1 pt-0.5 pb-5">
                        {products.map((item, i) => (
                            <div
                                onClick={() => handleChangeAmount('Increment', item.id)}
                                key={i}
                                className={cn(
                                    'flex h-fit w-full flex-col justify-between gap-y-2.5 rounded-lg bg-white p-5 shadow-lg ring ring-[#B9BDFF]',
                                    transactionItem?.find((data) => data.productId === item.id) && 'ring-3 ring-[#5961BE]',
                                )}
                            >
                                <div className="flex w-full">
                                    <div className="flex flex-2/3 gap-x-2.5">
                                        {item.productPhoto.map((photo, i) =>
                                            i > 2 ? null : (
                                                <img
                                                    src={photo}
                                                    key={i}
                                                    className="aspect-square w-1/4 rounded-lg object-cover object-center ring ring-[#B9BDFF]"
                                                />
                                            ),
                                        )}
                                    </div>
                                    <div className="flex flex-1/3 justify-end gap-x-1.5">
                                        {transactionItem?.find((data) => data.productId === item.id) && (
                                            <svg
                                                className="aspect-square h-fit w-1/4 rounded-full bg-[#EBEFFF] p-2 ring ring-[#5961BE]"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1.86328 2.18555L3.20373 2.41755L3.82433 9.81126C3.87395 10.4151 4.37855 10.8785 4.98433 10.8765H12.0146C12.5926 10.8778 13.0831 10.4525 13.1649 9.88021L13.7765 5.65395C13.8448 5.18157 13.5168 4.74335 13.045 4.67504C13.0038 4.66924 3.41897 4.66601 3.41897 4.66601"
                                                    stroke="#3B387E"
                                                    stroke-width="0.966667"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M9.19336 7.04878H10.9804"
                                                    stroke="#3B387E"
                                                    stroke-width="0.966667"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M4.70019 13.1113C4.89416 13.1113 5.05076 13.2686 5.05076 13.4619C5.05076 13.6559 4.89416 13.8131 4.70019 13.8131C4.50621 13.8131 4.34961 13.6559 4.34961 13.4619C4.34961 13.2686 4.50621 13.1113 4.70019 13.1113Z"
                                                    fill="#3B387E"
                                                    stroke="#3B387E"
                                                    stroke-width="0.966667"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M11.9717 13.1113C12.1656 13.1113 12.3229 13.2686 12.3229 13.4619C12.3229 13.6559 12.1656 13.8131 11.9717 13.8131C11.7777 13.8131 11.6211 13.6559 11.6211 13.4619C11.6211 13.2686 11.7777 13.1113 11.9717 13.1113Z"
                                                    fill="#3B387E"
                                                    stroke="#3B387E"
                                                    stroke-width="0.966667"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <Heading title={item.productName} className="text-md xl:text-xl" disableMb />
                                        <Heading
                                            className="text-md xl:text-xl"
                                            disableMb
                                            title={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.productPrice)}
                                        />
                                    </div>
                                    <HeadingSmall title={`Netto : ${item.productNetto} ${item.productUnit}`} />
                                </div>
                                <p className="lg:text-md line-clamp-4 text-xs">{item.productDescription}</p>
                            </div>
                        ))}
                    </div>
                    <div className="max-h-[79vh] flex-1/2 space-y-5 overflow-y-auto px-0.5 pt-0.5 pb-5">
                        <div className="flex flex-col gap-1.5 rounded-xl bg-white p-5 shadow-sm ring ring-[#B9BDFF]">
                            <div className="flex justify-between">
                                <HeadingSmall title="Alamat Tujuan" className="text-2xl font-semibold" />
                                <svg
                                    onClick={() => router.get(route('mitra.profile.edit'), { fts: true })}
                                    className="cursor-pointer"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.98985 2.64648H7.01111C4.56136 2.64648 3.02539 4.38112 3.02539 6.83686V13.4615C3.02539 15.9172 4.55419 17.6518 7.01111 17.6518H14.0409C16.4986 17.6518 18.0274 15.9172 18.0274 13.4615V10.2519"
                                        stroke="#3B387E"
                                        stroke-width="1.1952"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M7.86788 9.1255L13.8214 3.171C14.5631 2.42998 15.7652 2.42998 16.5069 3.171L17.4765 4.14071C18.2182 4.88253 18.2182 6.0857 17.4765 6.82673L11.4943 12.8099C11.1701 13.1342 10.7303 13.3167 10.2714 13.3167H7.28711L7.362 10.3048C7.37315 9.86174 7.55399 9.43944 7.86788 9.1255Z"
                                        stroke="#3B387E"
                                        stroke-width="1.1952"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M12.916 4.08984L16.5536 7.72804"
                                        stroke="#3B387E"
                                        stroke-width="1.1952"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <h1>{`${address.address}, ${address.districtName}, ${address.cityName} ${address.province}, ${address.postalCode}`}</h1>
                            <p className="text-[#FFA114]">Note: Alamat dapat diubah melalui profil anda</p>
                        </div>
                        <div className="flex h-fit flex-6/7 flex-col rounded-xl bg-white p-5 text-lg ring ring-[#B9BDFF]">
                            <table className="w-full">
                                <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                                    <tr className="grid w-full grid-cols-10 text-left">
                                        <th className="col-span-3 text-center">Nama Produk</th>
                                        <th className="col-span-3 text-center">Quantity</th>
                                        <th className="col-span-3 text-center">Sub-total</th>
                                        <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionItem?.map((item) => (
                                        <tr
                                            key={item.productId}
                                            className="grid w-full grid-cols-10 items-center border-b-[1.8px] border-[#D9D9D9] px-5 py-5"
                                        >
                                            <td className="col-span-3">
                                                <p className="rounded px-2 py-1 text-center">{item.productName}</p>
                                            </td>
                                            <td className="col-span-3 text-center">
                                                <div className="mx-auto flex w-2/3 items-center justify-between overflow-hidden rounded-full px-5 ring ring-[#3B387E]">
                                                    <Button
                                                        className="cursor-pointer bg-transparent px-0 py-0 font-semibold disabled:cursor-default"
                                                        onClick={() => handleChangeAmount('decrement', item.productId)}
                                                        disabled={item.amount === 1 || isSubmited}
                                                    >
                                                        -
                                                    </Button>
                                                    <p className="text-sm font-semibold">{item.amount}</p>
                                                    <Button
                                                        className="cursor-pointer bg-transparent px-0 py-0 font-semibold disabled:cursor-default"
                                                        onClick={() => handleChangeAmount('Increment', item.productId)}
                                                        disabled={
                                                            item.amount === products.find((items) => items.id === item.productId)?.productStock ||
                                                            isSubmited
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="col-span-3 text-center">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                }).format(item.subTotal)}
                                            </td>
                                            <td className="ml-auto w-fit text-center">
                                                <Button
                                                    disabled={isSubmited}
                                                    className="aspect-square cursor-pointer rounded-full bg-[#FFD6DA] px-3 py-0 text-xl font-black text-[#B71C1C] hover:bg-[#FFD6DAbedan] hover:ring hover:ring-[#B71C1C]"
                                                    onClick={() => handleDeleteTransactionItem(item.productId)}
                                                >
                                                    x
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-10 space-y-10">
                                <div className="flex justify-between">
                                    <Heading title="Subtotal" />
                                    <Heading
                                        title={
                                            transactionItem
                                                ? new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency' }).format(
                                                      transactionItem!.map((item) => item.subTotal).reduce((total, current) => total + current, 0),
                                                  )
                                                : new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency' }).format(0)
                                        }
                                    />
                                </div>
                                <div className="flex justify-between gap-5">
                                    <Button
                                        disabled={isSubmited}
                                        onClick={() => router.get(route('mitra.order bahan'))}
                                        className="flex-1 cursor-pointer bg-transparent font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        disabled={isSubmited}
                                        onClick={handleSubmit}
                                        className="flex-1 cursor-pointer bg-[#5961BE] font-normal text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                                    >
                                        Pesan Sekarang
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg bg-white p-5 ring ring-[#B9BDFF]">
                            <Heading title="Metode Pengiriman" />
                            <HeadingSmall title="Pilih Metode Pengiriman" />
                            <select
                                onChange={(e) => setSelectedKurir(e.target.value ? ongkirProvider![parseInt(e.target.value)] : undefined)}
                                onClick={handleFetchKurir}
                                className="w-full rounded-lg p-2 ring ring-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option value="">Pilih Kurir</option>
                                {ongkirProvider?.map((provider, index) => (
                                    <option className="flex w-full" value={index}>
                                        {provider.shipping_name} - {provider.service_name} - {currencyConverter(provider.shipping_cost)}
                                    </option>
                                ))}
                            </select>
                            {err && <InputError className="mt-1" message="Harap memilih metode pengiriman" />}
                        </div>
                    </div>
                </div>
            </main>
        </MitraPageLayout>
    );
}
