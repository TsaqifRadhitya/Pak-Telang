import { Button } from '@/components/ui/button';
import LandingPageLayout from '@/layouts/landingPageLayout';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { addressType } from '@/types/address';
import { detailTransactionType } from '@/types/detailTransaction';
import { productType } from '@/types/product';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

interface props extends SharedData {
    products: productType[];
    selectedProduct?: string;
    address: addressType;
}

export default function TransactionCreate() {
    const { products, selectedProduct, address } = usePage<props>().props;
    const [data, setData] = useState<detailTransactionType[]>();
    const [isSubmited, setSubmited] = useState<boolean>(false);

    const handleDeleteTransactionItem = (params: string) => {
        setData((prev) => prev?.filter((item) => item.productId !== params));
    };

    const handleSubmit = () => {
        if (data?.length) {
            setSubmited(true);
            router.post(route('customer.transaksi.store'), { data: data });
        }
    };

    const handleChangeAmount = (params: 'Increment' | 'decrement', id: string) => {
        setData((prev) => {
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

    useEffect(() => {
        if (selectedProduct) {
            const seletected = products.find((item) => item.id === selectedProduct);
            if (seletected) {
                setData([{ amount: 1, productId: selectedProduct, subTotal: seletected!.productPrice, productName: seletected!.productName }]);
            }
        }
    }, [selectedProduct]);
    return (
        <LandingPageLayout>
            <section className="flex flex-col bg-[#EBEFFF] p-5 pt-20 text-[#3B387E] md:px-10 lg:min-h-screen">
                <Heading title="Transaksi" disableMb className="text-3xl" />
                <div className="mt-5 flex flex-1 flex-col gap-16 px-5 lg:flex-row">
                    <article className="scrollbar scrollbar-track-transparent scrollbar-thumb-[#5961BE] grid flex-2/3 gap-16 overflow-y-auto px-1 pt-1 sm:grid-cols-2 lg:max-h-[70vh] lg:grid-cols-1 xl:grid-cols-2">
                        {products.map((item) => (
                            <section
                                onClick={(e) => {
                                    if (!(e.target as HTMLElement).closest('button') && !isSubmited) {
                                        handleChangeAmount('Increment', item.id);
                                    }
                                }}
                                className={cn(
                                    'relative aspect-2/3 w-full cursor-pointer rounded-lg bg-[#EBEFFF] pb-2.5 shadow',
                                    data?.find((data) => data.productId === item.id) && 'ring-3 ring-[#5961BE]',
                                )}
                            >
                                {data?.find((data) => data.productId === item.id) && (
                                    <div className="absolute top-4 left-4 z-40 aspect-square overflow-hidden rounded-full bg-[#EBEFFF] p-1.5 ring ring-[#5961BE]">
                                        <svg className="aspect-square w-7" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    </div>
                                )}
                                <div className="h-2/5 w-full rounded-t-lg bg-[#9A9FFF]"></div>
                                <div className="absolute top-0 left-1/2 h-1/2 w-4/5 -translate-x-1/2 rounded-b-full bg-linear-180 from-[#9A9FFF] to-[#7D85DE]">
                                    <img
                                        src={item.productPhoto[0]}
                                        alt=""
                                        className="absolute bottom-0 left-1/2 aspect-6/9 w-1/2 -translate-x-1/2 object-cover object-center"
                                    />
                                </div>
                                <div className="mt-20 w-3/5 rounded-r-full bg-[#5961BE] px-6 py-2 shadow-md">
                                    <h1 className="text-md w-fit pr-4 font-medium text-white md:text-xl 2xl:text-xl">{item.productName}</h1>
                                </div>
                                <p className="line-clamp-4 px-6 py-6 text-sm font-medium text-[#5961BE]">{item.productDescription}</p>
                                <div className="mt-auto flex w-full items-center justify-between px-6">
                                    <h1 className="text-md font-bold text-[#5961BE] md:text-xl">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.productPrice)}
                                    </h1>
                                </div>
                            </section>
                        ))}
                    </article>
                    <div className="flex h-fit min-h-[80vh] flex-3/5 flex-col gap-7">
                        <div className="flex flex-col gap-1.5 rounded-xl bg-white p-5 shadow-sm">
                            <div className="flex justify-between">
                                <HeadingSmall title="Alamat Tujuan" className="text-2xl font-semibold" />
                                <svg
                                    onClick={() => router.get(route('customer.profile.edit'),{fts : true})}
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
                        <div className="flex h-fit flex-6/7 flex-col rounded-xl bg-white p-5 text-lg">
                            <table className="w-full">
                                <thead className="flex w-full justify-between border-b-[1.8px] border-[#D9D9D9] px-5 pb-2">
                                    <tr className="grid w-full grid-cols-4 text-left">
                                        <th className="text-center">Nama Produk</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-center">Sub-total</th>
                                        <th className="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item) => (
                                        <tr
                                            key={item.productId}
                                            className="grid w-full grid-cols-4 items-center border-b-[1.8px] border-[#D9D9D9] px-5 py-5"
                                        >
                                            <td>
                                                <p className="rounded px-2 py-1 text-center">{item.productName}</p>
                                            </td>
                                            <td className="text-center">
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
                                            <td className="text-center">
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                }).format(item.subTotal)}
                                            </td>
                                            <td className="text-center">
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
                            <div className="mt-auto space-y-10">
                                <div className="flex justify-between">
                                    <Heading title="Subtotal" />
                                    <Heading
                                        title={
                                            data
                                                ? new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency' }).format(
                                                      data!.map((item) => item.subTotal).reduce((total, current) => total + current, 0),
                                                  )
                                                : new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency' }).format(0)
                                        }
                                    />
                                </div>
                                <div className="flex justify-between gap-5">
                                    <Button
                                        disabled={isSubmited}
                                        onClick={() => router.get(route('produk'))}
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
                    </div>
                </div>
            </section>
        </LandingPageLayout>
    );
}
