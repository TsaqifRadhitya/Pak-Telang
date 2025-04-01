import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { SharedData } from '@/types';
import { productType } from '@/types/product';
import { router, useForm, usePage } from '@inertiajs/react';
import { Edit3Icon, LucideTrash2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { z } from 'zod';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';
import { supabaseImage } from '../../../services/imageStorage';

const productFormValidation = z.object({
    productName: z.string().min(1, 'Harap mengisi nama produk'),
    productPhoto: z.array(z.string()).nonempty('Harap mengisi foto produk'),
    productPrice: z.number().min(1, 'Harap mengisi harga produk'),
    productNetto: z.number().min(1, 'Harap mengisi netto produk'),
    productUnit: z.string().min(1, 'harap mengisi satuan netto produk'),
    productDescription: z.string().min(1, 'harap mengisi deskripsi produk'),
    productType: z.string().min(1),
    productStock: z.number({ message: 'harap mengisi stok produk' }).min(0,'harap mengisi stok produk dengan benar'),
});
export default function productAdminPage({ products }: { products: productType[] }) {
    const { auth } = usePage<SharedData>().props;
    const [submit, setSubmit] = useState<Boolean>(false);
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
        setSubmit(false)
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
        setSubmit(true)
        const imageUploadProvider = new supabaseImage('Pak Telang', 'Image');
        if (editState.current) {
            if (imageBag) {
                const url = await imageUploadProvider.uploadBatch(imageBag);
                let uniqueurl = url as string[];
                uniqueurl = uniqueurl.map((url, index) => `${url}?q=${Math.random() * 100}`);
                router.patch(
                    route('admin.product.update', { product: data.id }),
                    { ...data, productPhoto: uniqueurl },
                    { onFinish: handleCloseForm },
                );
                return;
            }
            patch(route('admin.product.update', { product: data.id }), { onFinish: handleCloseForm  });
        } else {
            const url = await imageUploadProvider.uploadBatch(imageBag!);
            let uniqueurl = url as string[];
            uniqueurl = uniqueurl.map((url, index) => `${url}?q=${Math.random() * 100}`);
            router.post(route('admin.product.store'), { ...data, productPhoto: uniqueurl }, { onFinish: handleCloseForm });
        }
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const photo = inputField.current?.files;
        if (photo?.length) {
            setData(
                'productPhoto',
                Object.values(photo as FileList).map((obj) => URL.createObjectURL(obj)),
            );
            setImageBag(photo);
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
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-lg bg-white p-5 pb-10">
                        <Heading title="Warning !!!" className="w-fit text-2xl text-[#5961BE] underline decoration-[#FF0000] underline-offset-8" />
                        <img src={productSelected?.productPhoto[0]} alt="" className="aspect-video w-2/3" />
                        <Heading title="Apakah Anda yakin untuk menghapus produk ini ?" className="w-fit text-lg font-medium text-[#5961BE]" />
                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer bg-white font-semibold text-green-600 ring ring-green-600 hover:bg-green-600 hover:text-white"
                                onClick={() => setDialog((prev) => ({ ...prev, delete: false }))}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer bg-red-600 font-semibold text-white hover:bg-red-700"
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
                                    className="text-[#3B387E]"
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
                                    className="text-[#3B387E] decoration-0"
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
                                    className="text-[#3B387E] decoration-0"
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
                                        className="text-[#3B387E] decoration-0"
                                    />
                                    {errors.productNetto && <p className="text-sm text-red-600">{errors.productNetto}</p>}
                                </div>
                                <div className="flex-1/2 lg:flex-1/4">
                                    <HeadingSmall title="Satuan" className="text-[#3B387E]" />
                                    <select
                                        onChange={(e) => setData('productUnit', e.target.value)}
                                        value={data.productUnit}
                                        className="text-[#3B387E] decoration-0"
                                    >
                                        <option value="">Pilih Satuan</option>
                                        <option value="ml">ml</option>
                                        <option value="liter">Liter</option>
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
                                    className="text-[#3B387E] decoration-0"
                                >
                                    <option value="">Pilih Tipe Produk</option>
                                    <option value="setengah jadi">Setengah Jadi</option>
                                    <option value="siap pakai">Siap Pakai</option>
                                </select>
                                {errors.productType && <p className="text-sm text-red-600">{errors.productType}</p>}
                            </div>
                            <div className="col-span-2">
                                <HeadingSmall title="Deskripsi Produk" className="text-[#3B387E]" />
                                <Textarea
                                    onChange={(e) => setData('productDescription', e.target.value)}
                                    value={data.productDescription}
                                    placeholder="Deskripsi Produk"
                                    className="h-20 text-[#3B387E] decoration-0"
                                />
                                {errors.productDescription && <p className="text-sm text-red-600">{errors.productDescription}</p>}
                            </div>
                            <div className="flex flex-col gap-y-2.5 lg:col-span-2">
                                <HeadingSmall title="Foto Produk" className="text-[#3B387E]" />
                                <div className="flex flex-wrap gap-2.5">
                                    {data.productPhoto?.map((photo) => (
                                        <img src={photo} className="aspect-square w-1/6 rounded-lg object-cover object-center shadow" />
                                    ))}
                                </div>
                                <Button
                                    onClick={() => inputField.current?.click()}
                                    className="cursor-pointer text-[#3B387E] ring ring-[#5961BE] hover:bg-[#5961BE] hover:text-white lg:w-1/6"
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
                <main className="relative z-0 h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                    <button
                        onClick={() => setDialog((prev) => ({ ...prev, create: true }))}
                        className="fixed right-0 bottom-0 -translate-1/4 cursor-pointer rounded-full bg-[#B9BDFF] p-4 shadow hover:bg-[#a2a7f9] lg:absolute"
                    >
                        <Plus size={40} />
                    </button>
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
