import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabaseImage } from '@/services/imageStorage';
import { currencyConverter } from '@/utils/currencyConverter';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { props } from '..';
import InputError from '../../../../components/input-error';

export default function Pending() {
    const { mutations } = usePage<props>().props;
    const [id, setId] = useState<string>();
    const [err, setErr] = useState<boolean>(false);
    const [image, setImage] = useState<File>();
    const [isSubmited, setSubmited] = useState<boolean>();

    const handleSubmit = async () => {
        if (!image) {
            setErr(true);
            return;
        }
        setSubmited(true);
        const supabaseImageService = new supabaseImage(mutations.find((mutation) => mutation.id === id)!.user!.email, 'Image');
        const ress = await supabaseImageService.uploadBuktiTf(image);
        router.patch(
            route('admin.ewallet.store', { id: id }),
            {
                bukti: ress,
            },
            { onFinish: handleCancel },
        );
    };

    useEffect(()=> {
        setErr(false)
    },[image])

    const handleCancel = () => {
        setErr(false);
        setImage(undefined);
        setSubmited(false)
        setId(undefined);
    };

    const inputImageRef = useRef<HTMLInputElement>(null);

    return (
        <>
            {id && !isSubmited && (
                <section className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/50">
                    <div className="flex min-w-xl flex-col items-center space-y-1 rounded-lg bg-white p-10 pt-5 shadow">
                        <Heading title="Bukti Transfer" className="underline decoration-[#B9BDFF] decoration-4 underline-offset-8" />
                        {image && (
                            <img
                                onClick={() => inputImageRef.current?.click()}
                                className="mt-5 aspect-auto max-h-[60vh] rounded-lg ring-[1.5px] ring-[#3B387E]"
                                src={URL.createObjectURL(image)}
                                alt=""
                            />
                        )}
                        <Input
                            ref={inputImageRef}
                            accept="image/png, image/jpeg"
                            type="file"
                            onChange={(e) => setImage(e.target.files ? (Object.values(e.target.files as FileList)[0] as File) : undefined)}
                            className="hidden"
                        />
                        {!image && (
                            <div
                                onClick={() => inputImageRef.current?.click()}
                                className="mt-5 flex w-full cursor-pointer items-center gap-5 rounded-lg border-2 border-[#B9BDFF] p-2.5"
                            >
                                <button className="cursor-pointer rounded-sm bg-[#B9BDFF] p-1 px-3 text-sm font-semibold text-[#3B387E] hover:bg-[#B9BDFF]">
                                    Choose File
                                </button>
                                <p className="w-fit">{'Pilih File'}</p>
                            </div>
                        )}
                        {err && <InputError className="w-full" message="Harap mengupload bukti transfer" />}
                        <div className="mt-5 flex w-full justify-end gap-2.5">
                            <Button
                                onClick={handleCancel}
                                className="w-full flex-1/7 cursor-pointer bg-transparent font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white md:w-auto md:flex-none"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="w-full flex-1/7 cursor-pointer bg-[#5961BE] text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] md:w-auto md:flex-none"
                            >
                                Transfer
                            </Button>
                        </div>
                    </div>
                </section>
            )}
            {mutations
                .filter((filter) => !filter.finished)
                .map((mutation) => (
                    <section className="flex justify-between border-b-2 border-[#D9D9D9] p-5 px-7">
                        <div>
                            <h1 className="font-semibold">{mutation.user?.name}</h1>
                            <h1 className="text-xs">
                                {mutation.payment?.type === 'bank' ? 'Transfer Bank' : 'Transfer E-Wallet'} - {mutation.payment?.provider} -{' '}
                                {mutation.payment?.number}
                            </h1>
                        </div>
                        <div className="flex items-center gap-10">
                            <div>
                                <p className="text-xs">{dateFormaterUtils(mutation.created_at)}</p>
                                <p className="text-right font-semibold">{currencyConverter(mutation.nominal)}</p>
                            </div>
                            <Button
                                disabled={isSubmited}
                                onClick={() => setId(mutation.id)}
                                className="h-fit w-20 cursor-pointer rounded-sm bg-[#5961BE] py-1 text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE]"
                            >
                                Transfer
                            </Button>
                        </div>
                    </section>
                ))}
        </>
    );
}
