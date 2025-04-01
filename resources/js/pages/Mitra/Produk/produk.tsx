import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { productType } from '@/types/product';
import { useForm } from '@inertiajs/react';
import { Edit3Icon } from 'lucide-react';
import { useState } from 'react';
export default function productMitraPage({ products }: { products: productType[] }) {
    const [dialog, setDialog] = useState(false);
    const [submit, setSubmit] = useState<Boolean>(false);

    const handleEdit = (params: productType) => {
        setData(params);
        setDialog(true);
    };
    const { data, setData, errors, setError, reset, clearErrors, patch } = useForm<productType>({
        productDescription: '',
        productName: '',
        productNetto: 0,
        productPhoto: [],
        productPrice: 0,
        productStock: 0,
        productType: '',
        productUnit: '',
        id: '',
    });
    const handleSubmit = () => {
        const stock = data.productStock;

        if (stock < 0) {
            setError('productStock', 'Harap mengisi stock dengan benar');
            return;
        }
        setSubmit(true);
        patch(route('mitra.produk.update', { id: data.id }), { onFinish: handleCloseForm });
    };
    const handleCloseForm = () => {
        reset();
        clearErrors();
        setDialog(false);
        setSubmit(false);
    };
    return (
        <>
            {dialog && (
                <section id="productForm" className="fixed z-50 h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-3xl -translate-1/2 flex-col items-center gap-y-5 rounded-lg bg-white p-5 pb-10 shadow">
                        <Heading
                            title="Form Ubah Produk"
                            className="w-fit text-2xl text-[#5961BE] underline decoration-[#B9BDFF] underline-offset-8"
                        />
                        <div className="w-full gap-x-20 gap-y-5 lg:grid lg:grid-cols-2 lg:px-2.5">
                            <div>
                                <HeadingSmall title="Nama Produk" className="text-[#3B387E]" />
                                <Input value={data.productName} type="text" placeholder="Nama Produk" className="text-[#3B387E]" disabled />
                            </div>
                            <div>
                                <HeadingSmall title="Stok Produk" className="text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('productStock', e.target.valueAsNumber)}
                                    value={data.productStock}
                                    type="number"
                                    placeholder="Stok Produk"
                                    className="text-[#3B387E] decoration-0"
                                />
                                {errors.productStock && <p className="text-sm text-red-600">{errors.productStock}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Harga Product" className="text-[#3B387E]" />
                                <Input
                                    value={data.productPrice}
                                    type="number"
                                    placeholder="Harga Product"
                                    className="text-[#3B387E] decoration-0"
                                    disabled
                                />
                            </div>
                            <div className="flex gap-x-5">
                                <div className="flex-1/2">
                                    <HeadingSmall title="Netto" className="text-[#3B387E]" />
                                    <Input
                                        value={data.productNetto}
                                        type="number"
                                        placeholder="Netto"
                                        className="text-[#3B387E] decoration-0"
                                        disabled
                                    />
                                </div>
                                <div className="flex-1/2 lg:flex-1/4">
                                    <HeadingSmall title="Satuan" className="text-[#3B387E]" />
                                    <select disabled value={data.productUnit} className="text-[#3B387E] decoration-0">
                                        <option value="">Pilih Satuan</option>
                                        <option value="ml">ml</option>
                                        <option value="liter">Liter</option>
                                        <option value="gram">Gram</option>
                                        <option value="kg">Kg</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <HeadingSmall title="Deskripsi Produk" className="text-[#3B387E]" />
                                <Textarea
                                    value={data.productDescription}
                                    placeholder="Deskripsi Produk"
                                    className="h-20 text-[#3B387E] decoration-0"
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-y-2.5 lg:col-span-2">
                                <HeadingSmall title="Foto Produk" className="text-[#3B387E]" />
                                <div className="flex flex-wrap gap-2.5">
                                    {data.productPhoto?.map((photo) => (
                                        <img src={photo} className="aspect-square w-1/6 rounded-lg object-cover object-center shadow" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-end">
                            <div className="flex w-1/3 gap-x-2.5">
                                <Button
                                    className="w-1/2 cursor-pointer bg-white font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:text-white"
                                    onClick={handleCloseForm}
                                    disabled={submit as boolean}
                                >
                                    Batal
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={submit as boolean}
                                    className="w-1/2 cursor-pointer bg-[#5961BE] font-semibold text-white hover:bg-[#43498e]"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    </article>
                </section>
            )}
            <MitraPageLayout page="Produk">
                <main className="relative z-0 h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <div className="absolute right-0 bottom-0 -translate-1/4 cursor-pointer rounded-full bg-[#B9BDFF] p-4 shadow hover:bg-[#a2a7f9]"></div>
                    <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                        <h1 className="text-xl font-semibold">Produk</h1>
                    </div>
                    <section className="flex w-full flex-col gap-10 overflow-y-auto p-5 lg:grid lg:aspect-9/5 lg:grid-cols-2 lg:p-10">
                        {products.map((item, i) => (
                            <div key={i} className="flex aspect-7/4 flex-col justify-between rounded-lg p-5 shadow-lg ring ring-[#B9BDFF]">
                                <div className="flex w-full">
                                    <div className="flex flex-2/3 gap-x-2.5">
                                        {item.productPhoto.map((photo, i) =>
                                            i > 2 ? null : <img src={photo} key={i} className="aspect-square w-1/4 rounded-lg ring ring-[#B9BDFF]" />,
                                        )}
                                    </div>
                                    <div className="flex flex-1/3 justify-end gap-x-1.5">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="h-fit cursor-pointer rounded-lg bg-[#FFA114] p-2.5 shadow hover:bg-[#d69534]"
                                        >
                                            <Edit3Icon color="white" />
                                        </button>
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
            </MitraPageLayout>
        </>
    );
}
