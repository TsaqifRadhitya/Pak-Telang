import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { productType } from '@/types/product';
import { router, useForm } from '@inertiajs/react';
import { Edit3Icon, LucideTrash2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { z } from 'zod';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';
import { supabaseImage } from '../../../services/imageStorage';

const productFormValidation = z.object({
    productName: z.string({ message: 'Harap mengisi nama produk' }).min(1, 'Harap mengisi nama produk'),
    productPhoto: z.array(z.string()).nonempty('Harap mengupload foto produk'),
    productPrice: z.number({ message: 'Harap mengisi harga produk' }).min(1, 'Harap mengisi harga produk'),
    productNetto: z.number({ message: 'Harap mengisi netto produk' }).min(1, 'Harap mengisi netto produk'),
    productUnit: z.enum(['ml', 'liter', 'gram', 'kg'], { message: 'Harap mengisi satuan' }),
    productDescription: z.string({ message: 'Harap mengisi deskripsi produk' }).min(1, 'Harap mengisi deskripsi produk'),
    productType: z.enum(['Barang jadi', 'Bahan Baku'], { message: 'Harap mengisi tipe produk' }),
    productStock: z.number({ message: 'Harap mengisi stok produk' }).min(0, 'Harap mengisi stok produk dengan benar'),
});
export default function ProductAdminPage({ products }: { products: productType[] }) {
    const [submit, setSubmit] = useState<boolean>(false);
    const [productSelected, setProductSelected] = useState<productType | null>(null);
    const editState = useRef(false);
    const [dialog, setDialog] = useState({ delete: false, create: false, edit: false });
    const [imageBag, setImageBag] = useState<FileList>();
    const inputField = useRef<HTMLInputElement>(null);
    const handleDelete = (params: productType) => {
        setProductSelected(params);
        setDialog({ create: false, edit: false, delete: true });
    };

    const handleEdit = (params: productType) => {
        editState.current = true;
        setData(params);
        setDialog({ create: false, edit: true, delete: false });
    };

    const handleCloseForm = () => {
        setDialog({ ...dialog, create: false, edit: false });
        reset();
        clearErrors();
        editState.current = false;
        setSubmit(false);
    };

    const handleSubmit = async () => {
        const validation = productFormValidation.safeParse(data);
        const errors = validation.error?.format();
        if (!validation.success) {
            setError('productDescription', errors?.productDescription?._errors[0] as string);
            setError('productName', errors?.productName?._errors[0] as string);
            setError('productNetto', errors?.productNetto?._errors[0] as string);
            setError('productPhoto', errors?.productPhoto?._errors[0] as string);
            setError('productPrice', errors?.productPrice?._errors[0] as string);
            setError('productStock', errors?.productStock?._errors[0] as string);
            setError('productType', errors?.productType?._errors[0] as string);
            setError('productUnit', errors?.productUnit?._errors[0] as string);
            return;
        }
        setSubmit(true);
        const imageUploadProvider = new supabaseImage('Pak Telang', 'Image');
        if (editState.current) {
            if (imageBag) {
                const url = await imageUploadProvider.uploadBatch(imageBag);
                let uniqueurl = url as string[];
                uniqueurl = uniqueurl.map((url) => `${url}?q=${Math.random() * 100}`);
                router.patch(
                    route('admin.product.update', { product: data.id }),
                    { ...data, productPhoto: uniqueurl },
                    { onFinish: handleCloseForm },
                );
                return;
            }
            patch(route('admin.product.update', { product: data.id }), { onFinish: handleCloseForm });
        } else {
            const url = await imageUploadProvider.uploadBatch(imageBag!);
            let uniqueurl = url as string[];
            uniqueurl = uniqueurl.map((url) => `${url}?q=${Math.random() * 100}`);
            router.post(route('admin.product.store'), { ...data, productPhoto: uniqueurl }, { onFinish: handleCloseForm });
        }
    };

    const handleChangeImage = () => {
        if (inputField.current?.files?.length) {
            setData(
                'productPhoto',
                Object.values(inputField.current?.files as FileList).map((obj) => URL.createObjectURL(obj)),
            );
            setImageBag(inputField.current?.files);
        }
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
    return (
        <>
            <Input className="hidden" type="file" onChange={handleChangeImage} multiple ref={inputField} accept="image/png, image/jpeg"></Input>
            {dialog.delete && (
                <section id="alertDelete" className="fixed z-50 h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                        <div className="flex w-full items-center gap-x-4">
                            <img
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                alt=""
                            />
                            <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                        </div>
                        <img src={productSelected?.productPhoto[0]} alt="" className="aspect-video w-1/3 object-cover object-center" />
                        <Heading
                            title="Apakah Anda yakin untuk menghapus produk ini ?"
                            className="text-md line mx-auto w-4/5 text-center leading-5 font-medium text-[#8A7300]"
                        />
                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer bg-[#FFFDF1] font-semibold text-[#8A7300] ring ring-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                onClick={() => setDialog((prev) => ({ ...prev, delete: false }))}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer bg-[#8A7300] text-white ring ring-[#8A7300] hover:bg-transparent hover:font-semibold hover:text-[#8A7300]"
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
            {(dialog.create || dialog.edit) && (
                <section id="productForm" className="fixed z-50 h-full w-full bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-3xl -translate-1/2 flex-col items-center gap-y-5 rounded-lg bg-white p-5 pb-10 shadow">
                        <Heading
                            title={dialog.create ? 'Form Tambah Produk' : 'Form Ubah Produk'}
                            className="w-fit text-2xl text-[#5961BE] underline decoration-[#B9BDFF] underline-offset-8"
                        />
                        <div className="w-full gap-x-20 gap-y-5 lg:grid lg:grid-cols-2 lg:px-2.5">
                            <div>
                                <HeadingSmall title="Nama Produk" className="text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('productName', e.target.value)}
                                    value={data.productName}
                                    type="text"
                                    placeholder="Nama Produk"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                                />
                                {errors.productName && <p className="text-sm text-red-600">{errors.productName}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Stok Produk" className="text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('productStock', e.target.valueAsNumber)}
                                    value={data.productStock}
                                    type="number"
                                    placeholder="Stok Produk"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                                />
                                {errors.productStock && <p className="text-sm text-red-600">{errors.productStock}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Harga Product" className="text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('productPrice', e.target.valueAsNumber)}
                                    value={data.productPrice}
                                    type="number"
                                    placeholder="Harga Product"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                                />
                                {errors.productPrice && <p className="text-sm text-red-600">{errors.productPrice}</p>}
                            </div>
                            <div className="flex gap-x-5">
                                <div className="flex-1/2">
                                    <HeadingSmall title="Netto" className="text-[#3B387E]" />
                                    <Input
                                        onChange={(e) => setData('productNetto', e.target.valueAsNumber)}
                                        value={data.productNetto}
                                        type="number"
                                        placeholder="Netto"
                                        className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                                    />
                                    {errors.productNetto && <p className="text-sm text-red-600">{errors.productNetto}</p>}
                                </div>
                                <div className="flex-1/2 lg:flex-1/4">
                                    <HeadingSmall title="Satuan" className="text-[#3B387E]" />
                                    <select
                                        onChange={(e) => setData('productUnit', e.target.value)}
                                        value={data.productUnit}
                                        className="min-h-9 rounded-lg px-3 py-1 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:border-[#B9BDFF] focus-visible:ring-3"
                                    >
                                        <option value="">Pilih Satuan</option>
                                        {(data.productType === '' || data.productType === 'Barang jadi') && <option value="ml">ml</option>}
                                        {(data.productType === '' || data.productType === 'Barang jadi') && <option value="liter">Liter</option>}
                                        <option value="gram">Gram</option>
                                        <option value="kg">Kg</option>
                                    </select>
                                    {errors.productUnit && <p className="text-sm text-red-600">{errors.productUnit}</p>}
                                </div>
                            </div>
                            <div>
                                <HeadingSmall title="Tipe Product" className="text-[#3B387E]" />
                                <select
                                    onChange={(e) => setData('productType', e.target.value)}
                                    value={data.productType}
                                    className="min-h-9 w-full rounded-lg px-3 py-1 text-[#3B387E] shadow ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:border-[#B9BDFF] focus-visible:ring-3"
                                >
                                    <option value="">Pilih Tipe Produk</option>
                                    <option value="Barang jadi">Barang jadi</option>
                                    <option value="Bahan Baku">Bahan baku</option>
                                </select>
                                {errors.productType && <p className="text-sm text-red-600">{errors.productType}</p>}
                            </div>
                            <div className="col-span-2">
                                <HeadingSmall title="Deskripsi Produk" className="text-[#3B387E]" />
                                <Textarea
                                    onChange={(e) => setData('productDescription', e.target.value)}
                                    value={data.productDescription}
                                    placeholder="Deskripsi Produk"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                                />
                                {errors.productDescription && <p className="text-sm text-red-600">{errors.productDescription}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2.5 lg:col-span-2">
                                <HeadingSmall title="Foto Produk" className="text-[#3B387E]" />
                                {!data.productPhoto.length && (
                                    <div
                                        onClick={() => inputField.current?.click()}
                                        className="flex aspect-square w-1/6 cursor-pointer flex-col items-center justify-center rounded-lg bg-[#D9D9D9] text-[#3B387E]"
                                    >
                                        <Plus size={50} />
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2.5">
                                    {data.productPhoto?.map((photo) => (
                                        <img
                                            src={photo}
                                            className="aspect-square w-1/6 rounded-lg object-cover object-center shadow ring ring-[#B9BDFF]"
                                        />
                                    ))}
                                </div>
                                <Button
                                    onClick={() => inputField.current?.click()}
                                    className="cursor-pointer bg-white text-[#3B387E] ring ring-[#5961BE] hover:bg-[#5961BE] hover:text-white lg:w-1/6"
                                >
                                    Upload Foto
                                </Button>
                                {errors.productPhoto && <p className="text-sm text-red-600">{errors.productPhoto}</p>}
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
            <AdminPageLayout page="Produk">
                <main className="relative z-0 w-full flex-1 rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <button
                        onClick={() => setDialog((prev) => ({ ...prev, create: true }))}
                        className="fixed right-0 bottom-0 -translate-1/4 cursor-pointer rounded-full bg-[#B9BDFF] p-4 shadow hover:bg-[#a2a7f9] lg:absolute"
                    >
                        <Plus size={40} />
                    </button>
                    <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                        <h1 className="text-xl font-semibold">Produk</h1>
                    </div>
                    <section className="flex w-full flex-col gap-10 overflow-y-auto p-5 md:grid md:h-[82vh] md:grid-cols-2 lg:p-10">
                        {products.map((item, i) => (
                            <div
                                key={i}
                                className="flex h-full min-h-[258px] w-full flex-col justify-between gap-y-2.5 rounded-lg p-5 shadow-lg ring ring-[#B9BDFF]"
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
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="h-fit cursor-pointer rounded-lg bg-[#FFA114] p-2.5 shadow hover:bg-[#d69534]"
                                        >
                                            <Edit3Icon color="white" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="h-fit cursor-pointer rounded-lg bg-[#EC2525] p-2.5 shadow hover:bg-[#be2727]"
                                        >
                                            <LucideTrash2 color="white" />
                                        </button>
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
                                    <div className="flex items-center justify-between">
                                        <HeadingSmall title={`Netto : ${item.productNetto} ${item.productUnit}`} />
                                        <HeadingSmall title={`Stock : ${item.productStock}`} />
                                    </div>
                                </div>
                                <p className="lg:text-md line-clamp-4 text-xs">{item.productDescription}</p>
                            </div>
                        ))}
                    </section>
                </main>
            </AdminPageLayout>
        </>
    );
}
