import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import { kontenType } from '@/types/koten';
import { router, useForm } from '@inertiajs/react';
import { LucideTrash2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import z from 'zod';
import { supabaseImage } from '../../../services/imageStorage';

const youtubeUrlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})(?:[&?][^#\s]*)?$/;

const inputValidation = z.object({
    slug: z.string({ message: 'Harap mengisi judul' }).min(1, 'Harap mengisi judul'),
    category: z.enum(['Blog', 'Penyaluran Donasi'], { message: 'Harap memilih kategori konten' }),
    content: z.string({ message: 'Harap mengisi isi konten' }),
    imageCover: z.string({ message: 'Harap mengupload sampul konten' }),
    video: z
        .string()
        .optional()
        .transform((val) => (val === '' || val === undefined ? null : val))
        .nullable()
        .refine((val) => val === null || youtubeUrlRegex.test(val), {
            message: 'Harap menginput link video youtube dengan benar',
        }),
});

export default function CreateKonten() {
    const { data, setData, errors, setError, clearErrors } = useForm<kontenType>();
    const [imageBag, setImageBag] = useState<File[]>();
    const [sampul, setSampul] = useState<FileList>();
    const imageBagRef = useRef<HTMLInputElement>(null);
    const imageCoverRef = useRef<HTMLInputElement>(null);

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            if (e.target.id === 'imageCover') {
                setData('imageCover', URL.createObjectURL(e.target.files[0]));
                setSampul(e.target.files);
                return;
            }
            const files = Object.values(e.target.files);
            setImageBag((prev) => {
                if (prev) {
                    return [...prev, ...files];
                }
                return files;
            });
            setData(
                'imageContent',
                data.imageContent?.length
                    ? [...data.imageContent, ...files.map((foto) => URL.createObjectURL(foto))]
                    : files.map((foto) => URL.createObjectURL(foto)),
            );
            e.target.value = '';
        }
    };

    const handleRemoveImage = (id: number) => {
        const newListUrl = data.imageContent?.filter((data, index) => index != id);
        setData('imageContent', newListUrl);
        const newImageBag = imageBag?.filter((data, index) => index != id);
        setImageBag(newImageBag);
    };

    const handleSubmit = async () => {
        clearErrors();
        const validationResult = inputValidation.safeParse(data);
        if (!validationResult.success) {
            const err = validationResult.error.format();
            setError('category', err.category?._errors[0] ?? '');
            setError('content', err.content?._errors[0] ?? '');
            setError('imageCover', err.imageCover?._errors[0] ?? '');
            setError('slug', err.slug?._errors[0] ?? '');
            setError('video', err.video?._errors[0] ?? '');
            return;
        }
        const imageUploader = new supabaseImage('Pak Telang', 'Konten');
        if (imageBag) {
            const urlImageCover = imageUploader.uploadKonten(sampul as FileList);
            const urlImageContent = imageUploader.uploadKonten(imageBag as File[]);
            const allUrl = await Promise.all([urlImageContent, urlImageCover]);
            console.log(allUrl);
            router.post(route('admin.konten.store'), {
                ...data,
                imageCover: allUrl[1]![0],
                imageContent: allUrl[0],
            });
            return;
        }
        const urlImageCover = await imageUploader.uploadKonten(sampul as FileList);
        router.post(route('admin.konten.store'), {
            ...data,
            imageCover: urlImageCover![0],
            imageContent: null,
        });
    };
    return (
        <AdminPageLayout page="Konten">
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Tambah Konten</h1>
                </div>
                <div className="flex max-h-[82.2vh] flex-col gap-2 overflow-y-auto px-10 py-5">
                    <div className="flex flex-col gap-0.5">
                        <Label className="text-lg font-semibold">Judul</Label>
                        <Input
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="Judul"
                            className="border-0 ring ring-[#B9BDFF] placeholder:text-[#AFB3FF] focus-visible:ring-[#B9BDFF]"
                            type="text"
                        />
                        {errors.slug && <p className="text-xs font-extralight text-red-600 italic">{errors.slug}</p>}
                    </div>
                    <div className="flex w-full flex-col gap-2.5 md:flex-row">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <Label className="text-lg font-semibold">Link Video</Label>
                            <Input
                                value={data.video}
                                placeholder="Link Video"
                                onChange={(e) => setData('video', e.target.value)}
                                className="border-0 ring ring-[#B9BDFF] placeholder:text-[#AFB3FF] focus-visible:ring-[#B9BDFF]"
                                type="text"
                            />
                            {errors.video && <p className="text-xs font-extralight text-red-600 italic">{errors.video}</p>}
                        </div>
                        <div className="flex flex-1 flex-col gap-0.5">
                            <Label className="text-lg font-semibold">Kategori Konten</Label>
                            <select
                                onChange={(e) => setData('category', e.target.value as 'Blog' | 'Penyaluran Donasi')}
                                value={data.category}
                                className="min-h-9 w-full rounded-lg px-3 py-1 text-[#3B387E] shadow ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:border-[#B9BDFF] focus-visible:ring-3"
                            >
                                <option value="">Pilih Kategori Konten</option>
                                <option value="Blog">Blog</option>
                                <option value="Penyaluran Donasi">Penyaluran Donasi</option>
                            </select>
                            {errors.category && <p className="text-xs font-extralight text-red-600 italic">{errors.category}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <Label className="text-lg font-semibold">Sampul Foto</Label>
                        {data.imageCover && (
                            <img
                                src={data.imageCover}
                                className="mx-auto aspect-video w-1/2 cursor-pointer rounded-lg object-cover object-center ring ring-[#AFB3FF]"
                                onClick={() => imageCoverRef.current?.click()}
                            ></img>
                        )}
                        <Input
                            id="imageCover"
                            onChange={handleChangeImage}
                            className={cn(
                                'file:text-[#3B387E cursor-pointer border-0 ring ring-[#B9BDFF] file:cursor-pointer focus-visible:ring-[#B9BDFF]',
                                data.imageCover && 'hidden',
                            )}
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={imageCoverRef}
                        />
                        {errors.imageCover && <p className="text-xs font-extralight text-red-600 italic">{errors.imageCover}</p>}
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <Label className="text-lg font-semibold">Lampiran Foto</Label>

                        {data.imageContent
                            ? data.imageContent.length > 0 && (
                                  <div className="grid w-full gap-7 lg:grid-cols-3">
                                      {data.imageContent.map((img, index) => (
                                          <div className="relative" key={index}>
                                              <Button
                                                  onClick={() => handleRemoveImage(index)}
                                                  className="group absolute top-2 right-2 cursor-pointer bg-[#EC2525] ring ring-[#EC2525] hover:bg-white hover:text-[#EC2525]"
                                              >
                                                  <LucideTrash2 className="text-white group-hover:text-[#EC2525]" />
                                              </Button>
                                              <img
                                                  onClick={() => imageBagRef.current?.click()}
                                                  src={img}
                                                  className="aspect-video w-full rounded-xl object-cover object-center ring ring-[#969bfa]"
                                              />
                                          </div>
                                      ))}
                                      <div
                                          onClick={() => imageBagRef.current?.click()}
                                          className="stroke-dash-2 flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#B9BDFF]"
                                      >
                                          <Plus size={75} strokeWidth={2} className="text-[#969bfa]" />
                                      </div>
                                  </div>
                              )
                            : null}
                        <Input
                            id="imageContent"
                            onChange={handleChangeImage}
                            className={cn(
                                'file:text-[#3B387E]c cursor-pointer border-0 ring ring-[#B9BDFF] file:cursor-pointer focus-visible:ring-[#B9BDFF]',
                                data.imageContent?.length && 'hidden',
                            )}
                            type="file"
                            multiple
                            accept="image/png, image/jpeg"
                            ref={imageBagRef}
                        />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <Label className="text-lg font-semibold">Isi Konten</Label>
                        <Textarea
                            placeholder="Silahkan mengisi isi konten"
                            onChange={(e) => setData('content', e.target.value)}
                            value={data.content}
                            className="h-[26.8vh] border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                        />
                        {errors.content && <p className="text-xs font-extralight text-red-600 italic">{errors.content}</p>}
                    </div>
                    <div className="mt-5 flex items-center justify-end gap-2.5">
                        <Button
                            onClick={() => router.get(route('admin.konten'))}
                            className="min-w-32 cursor-pointer bg-transparent font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="105961BE min-w-32 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </main>
        </AdminPageLayout>
    );
}
