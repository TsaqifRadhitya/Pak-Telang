import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { productType } from '@/types/product';
import { router } from '@inertiajs/react';
import { Edit3Icon, LucideTrash2, Plus } from 'lucide-react';
import { useState } from 'react';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';

export default function productAdminPage({ products }: { products: productType[] }) {
    const [productSelected, setProductSelected] = useState<productType>();
    const [dialog, setDialog] = useState({ delete: false, create: false, edit: false });
    const handleDelete = (params: productType) => {
        setProductSelected(params);
        setDialog({ create: false, edit: false, delete: true });
    };

    const handleEdit = (params: productType) => {};

    const handleCreateSubmit = () => {};
    return (
        <>
            {dialog.delete && (
                <section id="alertDelete" className="fixed z-50 h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-lg bg-white p-5 pb-10">
                        <Heading title="Warning !!!" className="w-fit text-2xl text-[#5961BE] underline decoration-[#FF0000] underline-offset-8" />
                        <img src={productSelected?.productPhoto[0]} alt="" className="aspect-video w-2/3" />
                        <Heading title="Apakah Anda yakin untuk menghapus produk ini ?" className="w-fit text-lg font-medium text-[#5961BE]" />
                        <div className="flex w-full justify-center gap-x-2.5">
                            <Button
                                className="cursor-pointer bg-white font-semibold text-green-600 ring ring-green-600 hover:bg-green-600 hover:text-white lg:w-1/4"
                                onClick={() => setDialog((prev) => ({ ...prev, delete: false }))}
                            >
                                Batal
                            </Button>
                            <Button
                                className="cursor-pointer bg-red-600 font-semibold text-white hover:bg-red-700 lg:w-1/4"
                                onClick={() => {
                                    setDialog((prev) => ({ ...prev, delete: false }));
                                    router.delete(route('admin.product.destroy', { product: productSelected?.id }));
                                }}
                            >
                                Yakin
                            </Button>
                        </div>
                    </article>
                </section>
            )}
            <AdminPageLayout page="Produk">
                <main className="relative z-0 h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <div className="fixed right-0 bottom-0 -translate-1/4 cursor-pointer rounded-full bg-[#B9BDFF] p-4 shadow hover:bg-[#a2a7f9] lg:absolute">
                        <Plus size={40} />
                    </div>
                    <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                        <h1 className="text-xl font-semibold">Produk</h1>
                    </div>
                    <section className="flex w-full flex-col gap-10 overflow-y-auto p-5 lg:grid lg:aspect-9/5 lg:grid-cols-2 lg:p-10">
                        {products.map((item) => (
                            <div className="flex aspect-7/4 flex-col justify-between rounded-lg p-5 shadow-lg ring ring-[#B9BDFF]">
                                <div className="flex w-full">
                                    <div className="flex flex-2/3 gap-x-2.5">
                                        {item.productPhoto.map((photo, i) =>
                                            i > 2 ? null : <img src={photo} className="aspect-square w-1/4 rounded-lg ring ring-[#B9BDFF]" />,
                                        )}
                                    </div>
                                    <div className="flex flex-1/3 justify-end gap-x-1.5">
                                        <div className="h-fit cursor-pointer rounded-lg bg-[#FFA114] p-2.5 shadow hover:bg-[#d69534]">
                                            <Edit3Icon color="white" />
                                        </div>
                                        <div
                                            onClick={() => handleDelete(item)}
                                            className="h-fit cursor-pointer rounded-lg bg-[#EC2525] p-2.5 shadow hover:bg-[#be2727]"
                                        >
                                            <LucideTrash2 color="white" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <Heading title={item.productName} disableMb />
                                        <Heading
                                            disableMb
                                            title={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.productPrice)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <HeadingSmall title={`Netto : ${item.productNetto} ${item.productUnit}`} />
                                        <HeadingSmall title={`Stock : ${item.productStock}`} />
                                    </div>
                                </div>
                                <p className="text-md">{item.productDescription}</p>
                            </div>
                        ))}
                    </section>
                </main>
            </AdminPageLayout>
        </>
    );
}
