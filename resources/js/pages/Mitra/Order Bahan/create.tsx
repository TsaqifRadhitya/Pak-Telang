import MitraPageLayout from '@/layouts/mitraPageLayout';
import { addressType } from '@/types/address';
import { productType } from '@/types/product';
import { rajaOngkirIdFinder } from '@/utils/rajaOngkirIdFinder';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { detailTransactionType } from '../../../types/detailTransaction';

let providerAddressId;
let mitraAddressId;

export default function OrderBahanCreate({
    products,
    selectedProduct,
    address,
    addressProvider,
}: {
    products: productType[];
    selectedProduct?: string;
    address: addressType;
    addressProvider: addressType;
}) {
    const [transactionItem, setTransactionItem] = useState<detailTransactionType[]>();
    const [isSubmited, setSubmited] = useState<boolean>(false);

    useEffect(() => {
        const fetchAddressIds = async () => {
            try {
                const [providerRes, mitraRes] = await Promise.all([rajaOngkirIdFinder(addressProvider), rajaOngkirIdFinder(address)]);
                mitraAddressId = mitraRes;
                providerAddressId = providerRes;
                console.log(mitraAddressId,providerAddressId)
            } catch (err) {
                console.error('❌ Gagal ambil address ID:', err);
            }
        };

        fetchAddressIds();

        if (selectedProduct) {
            const { id, productName, productPrice } = products.find((item) => item.id === selectedProduct) as productType;
            setTransactionItem([
                {
                    amount: 1,
                    productId: id,
                    productName: productName,
                    subTotal: productPrice,
                },
            ]);
        }
    }, []);

    const handleDeleteTransactionItem = (params: string) => {
        setTransactionItem((prev) => prev?.filter((item) => item.productId !== params));
    };

    const handleSubmit = () => {
        if (transactionItem?.length) {
            setSubmited(true);
            router.post(route('mitra.transaksi.store'), { data: transactionItem });
        }
    };

    const handleChangeAmount = (params: 'Increment' | 'decrement', id: string) => {
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
            </main>
        </MitraPageLayout>
    );
}
