import { cn } from '@/lib/utils';
import { messageType } from '@/pages/chat/roomChat';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import Heading from '../heading';
import { Button } from '../ui/button';
export default function BubbleChat({ message, removeMessage }: { message: messageType; removeMessage: (id: string) => void }) {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const [isOpen, setOpen] = useState<boolean>(false);
    const [indexPhoto, setIndexPhoto] = useState<number>(0);

    const handelDeleteMessage = () => {
        if (user.role === 'Pak Telang') {
            router.delete(route('admin.chat.delete', { id: message.id }), {
                async: true,
            });
        }

        if (user.role === 'Mitra') {
            router.delete(route('mitra.chat.delete', { id: message.id }), {
                async: true,
            });
        }
        removeMessage(message.id as string);
        setOpen(false);
    };

    return (
        <section className={cn('flex w-full justify-start px-5 text-[#3B387E]', message.from === user.id && 'justify-end')}>
            {!!indexPhoto && (
                <div className="fixed top-0 left-0 z-[999] flex h-full w-full flex-col bg-black/50 p-10 lg:absolute">
                    <img src={message.image![indexPhoto - 1]} alt="" className="mx-auto my-auto max-h-96" />
                    <h1
                        onClick={() => setIndexPhoto(0)}
                        className="absolute top-5 left-5 aspect-square h-fit rotate-45 cursor-pointer rounded-full bg-[#3B387E] px-2 text-xl text-white ring ring-[#3B387E] hover:hover:bg-white hover:font-semibold hover:text-[#3B387E]"
                    >
                        +
                    </h1>
                    {message.image!.length > 1 && (
                        <div className="absolute top-1/2 left-1/2 hidden w-[95%] -translate-1/2 justify-between lg:flex">
                            <Button
                                className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                                onClick={() => setIndexPhoto((prev) => prev - 1)}
                                disabled={indexPhoto === 1}
                            >
                                {'<'}
                            </Button>
                            <Button
                                className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                                onClick={() => setIndexPhoto((prev) => prev + 1)}
                                disabled={indexPhoto === message.image!.length}
                            >
                                {'>'}
                            </Button>
                        </div>
                    )}
                    {message.image!.length > 1 && (
                        <div className="mt-auto mb-2.5 flex items-center justify-center gap-2.5">
                            <Button
                                className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                                onClick={() => setIndexPhoto((prev) => prev - 1)}
                                disabled={indexPhoto === 1}
                            >
                                {'<'}
                            </Button>
                            {message.image!.map((image, index) => (
                                <div className="relative" key={index}>
                                    <img
                                        onClick={() => setIndexPhoto(index + 1)}
                                        className={cn(
                                            'aspect-square h-16 cursor-pointer rounded-lg object-contain',
                                            index + 1 === indexPhoto && 'scale-110 cursor-default border border-white',
                                        )}
                                        src={image}
                                        key={index}
                                    />
                                </div>
                            ))}
                            <Button
                                className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                                onClick={() => setIndexPhoto((prev) => prev + 1)}
                                disabled={indexPhoto === message.image!.length}
                            >
                                {'>'}
                            </Button>
                        </div>
                    )}
                </div>
            )}
            {isOpen && (
                <section id="alertDelete" className="fixed top-0 left-0 z-[999] h-screen w-screen bg-black/50">
                    <article className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-1/2 flex-col items-center gap-y-5 rounded-2xl border border-[#8A7300] bg-[#FFFDF1] p-5 pb-10">
                        <div className="flex w-full flex-1/2 items-center gap-x-4">
                            <img
                                src="https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Asset/Icon/warningIcon.svg"
                                alt=""
                            />
                            <h1 className="text-xl font-bold text-[#8A7300]">Warning!!</h1>
                        </div>
                        <DotLottieReact
                            loop
                            className="w-1/2"
                            src="https://lottie.host/0d4d6ac7-6c39-410c-beae-8b835e7e6790/PrUVLgMZXE.lottie"
                            autoplay
                        />
                        <Heading
                            title="Apakah Anda yakin untuk menghapus pesan ini?"
                            className="text-md line mx-auto text-center leading-5 font-medium text-[#8A7300]"
                        />

                        <div className="flex w-1/2 justify-center gap-x-2.5">
                            <Button
                                className="w-1/2 cursor-pointer border border-[#8A7300] bg-[#FFFDF1] font-semibold text-[#8A7300] hover:bg-[#8A7300] hover:text-white"
                                onClick={() => setOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer border border-[#8A7300] bg-[#8A7300] text-white hover:bg-transparent hover:font-semibold hover:text-[#8A7300]"
                                onClick={handelDeleteMessage}
                            >
                                Yakin
                            </Button>
                        </div>
                    </article>
                </section>
            )}
            <div className={cn('flex w-fit max-w-1/2 flex-col', message.from === user.id ? 'items-end' : 'items-start')}>
                {message.from === user.id && (
                    <Button
                        disabled={message.isSending}
                        onClick={() => setOpen(true)}
                        className="cursor-pointer rounded-xl border-2 border-[#5961BE] bg-[#B9BDFF] disabled:cursor-default disabled:opacity-50"
                    >
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.0013 13.8333C1.0013 14.75 1.7513 15.5 2.66797 15.5H9.33464C10.2513 15.5 11.0013 14.75 11.0013 13.8333V3.83333H1.0013V13.8333ZM11.8346 1.33333H8.91797L8.08464 0.5H3.91797L3.08464 1.33333H0.167969V3H11.8346V1.33333Z"
                                fill="#3B387E"
                            />
                        </svg>
                        Hapus Pesan
                    </Button>
                )}
                {message.image && (
                    <div
                        onClick={() => setIndexPhoto(1)}
                        className={cn(
                            'relative mt-2.5 w-full cursor-pointer rounded-t-lg border border-[#AFB3FF] p-2.5',
                            message.from === user.id && 'border-[#048730]/33',
                        )}
                    >
                        <img src={message.image[0]} className="w-full" />
                        {message.image.length > 1 && (
                            <h1
                                className={cn(
                                    'absolute top-1/2 left-1/2 -translate-1/2 text-5xl font-black text-[#AFB3FF]',
                                    message.from === user.id && 'text-[#05521e]',
                                )}
                            >
                                +{message.image.length - 1}
                            </h1>
                        )}
                    </div>
                )}
                <pre
                    className={cn(
                        'lg:text-md w-full rounded-2xl border border-[#AFB3FF] bg-[#AFB3FF]/24 px-5 py-4 font-sans text-xs break-words whitespace-pre-wrap md:text-sm',
                        message.from === user.id && 'mt-2.5 border-[#048730]/33 bg-[#A0D9A0]/37',
                        message.image && 'mt-0 rounded-t-none border-t-0',
                    )}
                >
                    {message.message}
                </pre>
                <svg
                    className={cn('-translate-x-3 -translate-y-1', message.from === user.id && 'translate-x-3 -rotate-120')}
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="9.09922"
                        cy="3.9"
                        r="3.4"
                        className={cn('fill-[#AFB3FF] stroke-[#AFB3FF]', message.from === user.id && 'fill-[#A0D9A0] stroke-[#048730]/33')}
                        fillOpacity="0.24"
                    />
                    <circle
                        className={cn('fill-[#AFB3FF] stroke-[#AFB3FF]', message.from === user.id && 'fill-[#A0D9A0] stroke-[#048730]/33')}
                        cx="2.6"
                        cy="7.79922"
                        r="2.1"
                        fillOpacity="0.24"
                    />
                </svg>
            </div>
        </section>
    );
}
