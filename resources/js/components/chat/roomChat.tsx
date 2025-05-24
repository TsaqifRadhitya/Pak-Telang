import { cn } from '@/lib/utils';
import { messageType } from '@/pages/chat/roomChat';
import { chatServices } from '@/services/roomChat';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Heading from '../heading';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import BubbleChat from './bubbleChat';
import ChatAreaWithPhotos from './chatAreaWithPhotos';
import IsTypingComponent from './isTypingAnimation';

export const chatService = new chatServices();

export default function RoomChat({ user, target, messages }: { user: User; target: User; messages: messageType[] }) {
    const [messagesState, setMessages] = useState<messageType[]>(messages);
    const [images, setImages] = useState<File[]>();
    const [connected, setConnected] = useState<boolean>(false);
    const inputFile = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isTyping, setTyping] = useState<boolean>(false);
    const inputArea = useRef<HTMLTextAreaElement>(null);
    const { data, setData, post, processing, reset } = useForm<messageType>({
        from: user.id,
        to: target.id,
        message: '',
    });

    const handleChangeInputImage = (param: FileList | null) => {
        if (param?.length && param.length > 0) {
            setImages(images ? [...images, ...Object.values(param)] : Object.values(param));
        }
    };

    const handleNewChat = (params: messageType) => {
        setMessages((prev) => [...prev, params]);
    };

    const handelSignal = (type: 'typing' | 'leave') => {
        if (type === 'typing') {
            setTyping(true);
        } else {
            setTyping(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesState]);

    useEffect(() => {
        if (!connected) {
            chatService.activeRoomChat(user.id, target.id, removeMessage, handleNewChat, handelSignal);
            setConnected(true);
        }
    }, [user, target]);

    const newMessage = () => {
        if (data.message) {
            if (user.role === 'Pak Telang') {
                inputArea.current?.blur();
                post(route('admin.chat.store', { id: target.id }), {
                    async: true,
                    onFinish: () => reset(),
                });
            }

            if (user.role === 'Mitra') {
                inputArea.current?.blur();
                post(route('mitra.chat.store', { id: target.id }), {
                    async: true,
                    onFinish: () => reset(),
                });
            }
        }
    };

    const removeMessage = (id: string) => {
        setMessages((prev) => [...prev].filter((mes) => mes.id != id));
    };

    return (
        <section className={cn('relative flex flex-1 flex-col p-10 pb-5', images && 'pb-0')}>
            <div className="flex items-center gap-5 border-b-2 border-[#D9D9D9] px-2 pb-2.5">
                <img src={target.profile_picture} className="aspect-square w-12 rounded-full object-cover object-center" alt="" />
                <Heading title={target.name} />
                <Input
                    type="file"
                    className="hidden"
                    ref={inputFile}
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleChangeInputImage(e.target.files)}
                />
            </div>
            {images && (
                <ChatAreaWithPhotos
                    setImage={setImages}
                    inputMessage={data.message}
                    setInputMessage={(param: string) => setData('message', param)}
                    images={images}
                    newMessage={newMessage}
                    inputFile={inputFile}
                    isTyping={isTyping}
                />
            )}
            {!images && (
                <>
                    <div className="flex h-[55vh] flex-col gap-5 overflow-y-auto px-1 py-5">
                        {messagesState.map((message, index) => (
                            <BubbleChat key={index} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="mt-auto">
                        {isTyping && <IsTypingComponent person={target} />}
                        <div onSubmit={newMessage} className="relative mt-1 flex items-end gap-2.5">
                            <Textarea
                                disabled={processing}
                                placeholder="Ketikan pesan...."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault(); // supaya tidak bikin newline
                                        newMessage();
                                    }
                                }}
                                ref={inputArea}
                                onFocus={() => chatService.sendSignal(user.id.toString(), target.id, 'typing')}
                                onBlur={() => chatService.sendSignal(user.id.toString(), target.id, 'leave')}
                                className="max-h-20 min-h-10 flex-1 border-0 py-2.5 pr-10 text-[#3B387E] ring ring-[#3B387E] placeholder:text-[#3B387E] focus-visible:ring-3 focus-visible:ring-[#3B387E]"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                            />
                            <svg
                                className={cn('absolute right-16 bottom-2.5 cursor-pointer', processing && 'cursor-default')}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                onClick={() => !processing && inputFile.current?.click()}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_1378_6370)">
                                    <path
                                        d="M19 7V9.99C19 9.99 17.01 10 17 9.99V7H14C14 7 14.01 5.01 14 5H17V2H19V5H22V7H19ZM16 11V8H13V5H5C3.9 5 3 5.9 3 7V19C3 20.1 3.9 21 5 21H17C18.1 21 19 20.1 19 19V11H16ZM5 19L8 15L10 18L13 14L17 19H5Z"
                                        fill="#3B387E"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1378_6370">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <Button
                                onClick={newMessage}
                                disabled={processing}
                                className="group h-11 cursor-pointer ring ring-[#3B387E] hover:bg-[#3B387E] md:h-10"
                            >
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
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
