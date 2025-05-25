import { cn } from '@/lib/utils';
import { messageType } from '@/pages/chat/roomChat';
import { supabaseImage } from '@/services/imageStorage';
import { SharedData, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Plus, Trash2Icon } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { chatService } from './roomChat';

type props = {
    setImage: (param: File[] | undefined) => void;
    inputMessage: string;
    setInputMessage: (param: string) => void;
    images: File[];
    inputFile: React.RefObject<HTMLInputElement | null>;
    isTyping: boolean;
    target: User;
    handleNewChat: (param: messageType) => void;
};

export default function ChatAreaWithPhotos(param: props) {
    const { setImage, inputMessage, images, setInputMessage, inputFile, target, handleNewChat } = param;
    const inputArea = useRef<HTMLTextAreaElement>(null);
    const imageUrl = useMemo(() => images.map((img) => URL.createObjectURL(img)), [images]);
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const handleDeleteImage = (params: number) => {
        const newImages = [...images].filter((images, index) => index != params);
        if (params !== 0) {
            setSelected((prev) => prev - 1);
        }
        setImage(newImages.length > 0 ? newImages : undefined);
    };

    const [selected, setSelected] = useState<number>(0);

    const handleSubmit = async () => {
        if (images) {
            const payloadData: messageType = {
                id: uuidv4(),
                created_at: new Date().toISOString(),
                from: user.id,
                to: target.id,
                message: inputMessage,
                isSending: true,
                image: imageUrl,
            };
            handleNewChat(payloadData);
            inputArea.current?.blur();
            setInputMessage('');
            setImage(undefined);
            const supabaseImageServices = new supabaseImage(user.email, 'Image');
            const ress = await supabaseImageServices.uploadChatImages(images);
            const newPayloadWithUrl: messageType = { ...payloadData, image: ress as string[] };
            if (user.role === 'Pak Telang') {
                router.post(route('admin.chat.store', { id: target.id }), newPayloadWithUrl, {
                    async: true,
                });
            }

            if (user.role === 'Mitra') {
                router.post(route('mitra.chat.store', { id: target.id }), newPayloadWithUrl, {
                    async: true,
                });
            }
        }
    };
    return (
        <div className="fixed top-0 left-0 z-[999] flex h-screen w-screen flex-1 flex-col bg-black/50 p-5 ring lg:relative lg:mt-5 lg:h-auto lg:w-auto lg:rounded-t-2xl">
            <img src={imageUrl[selected]} alt="" className="mx-auto mt-auto max-h-52" />
            <div className="absolute top-1/2 left-1/2 hidden w-[95%] -translate-1/2 justify-between lg:flex">
                <Button
                    className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                    onClick={() => setSelected((prev) => prev - 1)}
                    disabled={selected === 0}
                >
                    {'<'}
                </Button>
                <Button
                    className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                    onClick={() => setSelected((prev) => prev + 1)}
                    disabled={selected === images.length - 1}
                >
                    {'>'}
                </Button>
            </div>
            <div className="mt-auto mb-2.5 flex items-center justify-center gap-2.5">
                <Button
                    className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50 lg:hidden"
                    onClick={() => setSelected((prev) => prev - 1)}
                    disabled={selected === 0}
                >
                    {'<'}
                </Button>
                {imageUrl.map((image, index) => (
                    <div className="relative" key={index}>
                        <img
                            onClick={() => setSelected(index)}
                            className={cn(
                                'aspect-square h-14 cursor-pointer rounded-lg object-contain',
                                index === selected && 'scale-110 cursor-default border border-white',
                            )}
                            src={image}
                            key={index}
                        />
                        {selected === index && (
                            <Trash2Icon
                                onClick={() => handleDeleteImage(index)}
                                className={cn('absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer text-white')}
                            />
                        )}
                    </div>
                ))}
                <div
                    onClick={() => inputFile.current?.click()}
                    className="flex aspect-square h-14 cursor-pointer items-center justify-center rounded-lg border-3 border-[#3B387E] bg-white"
                >
                    <Plus strokeWidth={2.5} />
                </div>
                <Button
                    className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50 lg:hidden"
                    onClick={() => setSelected((prev) => prev + 1)}
                    disabled={selected === images.length - 1}
                >
                    {'>'}
                </Button>
            </div>
            <h1
                onClick={() => setImage(undefined)}
                className="absolute top-5 left-5 aspect-square h-fit rotate-45 cursor-pointer rounded-full bg-[#3B387E] px-2 text-xl text-white ring ring-[#3B387E] hover:hover:bg-white hover:font-semibold hover:text-[#3B387E]"
            >
                +
            </h1>
            <div className="z-[999] w-full self-end px-5 lg:px-0">
                <section className="relative mt-1 flex gap-2.5">
                    <div className="flex-1 rounded-lg bg-white">
                        <Textarea
                            placeholder="Tambahkan keterangan....."
                            className="h-fit min-h-10 flex-1 border-0 bg-white pr-7 text-[#3B387E] ring ring-[#3B387E] placeholder:text-[#3B387E] focus-visible:ring-3 focus-visible:ring-[#3B387E]"
                            value={inputMessage}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    handleSubmit();
                                }
                            }}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onFocus={() => chatService.sendSignal(user.id.toString(), target.id, 'typing')}
                            onBlur={() => chatService.sendSignal(user.id.toString(), target.id, 'leave')}
                        />
                    </div>

                    <Button onClick={handleSubmit} className="group h-10 cursor-pointer ring ring-[#3B387E] hover:bg-[#3B387E]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1378_6373)">
                                <path d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z" className="fill-[#3B387E] group-hover:fill-white" />
                                <path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" className="fill-[#3B387E] group-hover:fill-white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1378_6373">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Button>
                </section>
            </div>
        </div>
    );
}
