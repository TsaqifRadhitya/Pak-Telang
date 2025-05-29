import ChatDisplayComponent from '@/components/chatDisplay';
import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { chatType } from '@/types/chat';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import z from 'zod';

type BroadCastType = {
    title: string;
    pesan: string;
};

const BroadCastValidation = z.object({
    title: z.string({ message: 'Harap mengisi judul broadcast' }).min(1, 'Harap mengisi judul broadcast'),
    pesan: z.string({ message: 'Harap mengisi pesan broadcast' }).min(1, 'Harap mengisi pesan broadcast'),
});

export default function Index({ messages }: { messages: chatType[] }) {
    const fetcher = async (url: string) => {
        return (await axios.get(url)).data;
    };

    const [isOpen, setOpen] = useState<boolean>();

    const { data: formData, setData, errors, setError, reset, post, processing } = useForm<BroadCastType>();

    const { data } = useSWR(route('admin.chat.swr'), fetcher);

    const handleSubmitBroadCast = () => {
        const validationRess = BroadCastValidation.safeParse(formData);
        if (!validationRess.success) {
            const err = validationRess.error.format();
            setError('pesan', err.pesan?._errors[0] as string);
            setError('title', err.title?._errors[0] as string);
            return;
        }
        post(route('broadcast.store'));
        setOpen(false);
    };

    useEffect(() => {
        mutate(route('admin.chat.swr'), messages);
    }, [messages]);

    useEffect(() => {
        reset();
    }, [isOpen, reset]);
    return (
        <AdminPageLayout page="Chat">
            {isOpen && (
                <section className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/30">
                    <div className="w-5/6 max-w-[800px] space-y-5 rounded-xl bg-white p-10 shadow">
                        <div className="mx-auto w-fit">
                            <Heading title="Form Broadcast" className="mb-1.5 px-2.5 text-2xl font-black" />
                            <div className="h-[5px] rounded-full bg-[#B9BDFF]"></div>
                        </div>
                        <article className="flex w-full flex-col">
                            <div>
                                <HeadingSmall title="Judul" className="font-semibold text-[#3B387E]" />
                                <Input
                                    onChange={(e) => setData('title', e.target.value)}
                                    value={formData.title}
                                    type="text"
                                    placeholder="Judul"
                                    className="border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                                />
                                {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                            </div>
                            <div>
                                <HeadingSmall title="Pesan" className="font-semibold text-[#3B387E]" />
                                <Textarea
                                    onChange={(e) => setData('pesan', e.target.value)}
                                    value={formData.pesan}
                                    placeholder="Pesan"
                                    className="min-h-50 border-0 text-[#3B387E] ring ring-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:ring-3 focus-visible:ring-[#B9BDFF]"
                                />
                                {errors.pesan && <p className="text-sm text-red-600">{errors.pesan}</p>}
                            </div>
                        </article>
                        <article className="flex flex-col-reverse justify-end gap-x-5 lg:flex-row">
                            <Button
                                onClick={() => setOpen(false)}
                                className="mb-2.5 min-h-0 min-w-20 cursor-pointer rounded-xl bg-transparent text-xs font-semibold text-[#5961BE] ring ring-[#5961BE] hover:bg-[#5961BE] hover:font-normal hover:text-white lg:min-w-32"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleSubmitBroadCast}
                                disabled={processing}
                                className="mb-2.5 min-h-0 min-w-20 cursor-pointer rounded-xl bg-[#5961BE] text-xs text-white ring ring-[#5961BE] hover:bg-transparent hover:font-semibold hover:text-[#5961BE] lg:min-w-32"
                            >
                                Kirim
                            </Button>
                        </article>
                    </div>
                </section>
            )}
            <main className="relative flex h-full min-h-screen w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg lg:min-h-min">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Chat</h1>
                </div>
                <div className="flex flex-col gap-2.5 px-10 pt-5 lg:max-h-[80vh] lg:overflow-y-auto">
                    {(data as chatType[])?.map((message, index) => (
                        <div>
                            <ChatDisplayComponent key={index} className="mx-2.5 my-2.5" lastChat={message} type="Admin" />
                            <div className="h-[1.5px] bg-[#D9D9D9]"></div>
                        </div>
                    ))}
                </div>
                <Button
                    onClick={() => setOpen(true)}
                    className="fixed right-5 bottom-5 z-[999] aspect-square h-18 cursor-pointer rounded-full border-2 border-[#B9BDFF] bg-[#B9BDFF] shadow-sm lg:absolute"
                >
                    <svg className="scale-150" width="100" height="100" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1574_5259)">
                            <path
                                d="M24.75 15.125V17.875H30.25V15.125H24.75ZM22 24.2138C23.32 25.19 25.0388 26.4825 26.4 27.5C26.95 26.7712 27.5 26.0287 28.05 25.3C26.6887 24.2825 24.97 22.99 23.65 22C23.1 22.7425 22.55 23.485 22 24.2138ZM28.05 7.7C27.5 6.97125 26.95 6.22875 26.4 5.5C25.0388 6.5175 23.32 7.81 22 8.8C22.55 9.52875 23.1 10.2713 23.65 11C24.97 10.01 26.6887 8.73125 28.05 7.7ZM5.5 12.375C3.9875 12.375 2.75 13.6125 2.75 15.125V17.875C2.75 19.3875 3.9875 20.625 5.5 20.625H6.875V26.125H9.625V20.625H11L17.875 24.75V8.25L11 12.375H5.5ZM21.3125 16.5C21.3125 14.6713 20.515 13.0212 19.25 11.8937V21.0925C20.515 19.9788 21.3125 18.3287 21.3125 16.5Z"
                                fill="#3B387E"
                            />
                        </g>
                    </svg>
                </Button>
            </main>
        </AdminPageLayout>
    );
}
