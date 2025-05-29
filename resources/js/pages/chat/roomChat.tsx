import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { chatServices } from '@/services/roomChat';
import { SharedData, User } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export type messageType = {
    id?: string;
    from: string;
to: string;
    message: string;
    isReaded?: boolean;
    image?: string[];
    isSending? : boolean
    created_at?: string;
};

interface Props extends SharedData {
    messages: messageType[];
    target: User;
}

const chatService = new chatServices();

export default function ChatRoom() {
    const { messages, auth, target } = usePage<Props>().props;
    const [roomchatMessages, setMessages] = useState<messageType[]>(messages);
    const [inputMessage, setInputMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [onetime, setOnetime] = useState<boolean>(false);
    const [signal, setSignal] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [roomchatMessages]);

    useEffect(() => {
        if (!onetime) {
            chatService.activeRoomChat(auth.user.id, target.id, handleDelete, handleNewChat, handelSignal);
            setOnetime(true);
        }
    }, [auth.user.id, target.id]);

    useEffect(() => {
        return () => {
            chatService.sendSignal(auth.user.id.toString(), target.id, 'typing');
        };
    }, []);

    const handelSignal = (type: 'typing' | 'leave') => {
        if (type === 'typing') {
            setSignal(true);
        } else {
            setSignal(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            setInputMessage('');
            inputRef.current?.blur();
            router.post(
                route('chat.store', { id: target.id }),
                { message: inputMessage },
                {
                    async: true,
                },
            );
        }
    };

    const handleNewChat = (params: messageType) => {
        setMessages((prev) => [...prev, params]);
    };

    const handleDelete = (id: string) => {
        setMessages((prev) => [...prev].filter((mes) => mes.id != id));
    };

    return (
        <div className="flex h-screen flex-col bg-[url('https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Image/WhatsApp%20Image%202025-03-19%20at%2020.10.22_3898d1db.jpg')] bg-cover">
            {/* Header */}
            <Card className="rounded-t-none border-b border-gray-200 bg-white p-4">
                <h1 className="text-xl font-semibold text-black">{target.name}</h1>
            </Card>

            {/* Messages area with scroll */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {roomchatMessages.map((message, index) => (
                    <Card
                        key={message.id || index}
                        className={`w-2/3 border-0 p-4 ${message.from === auth.user.id.toString() ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-100'}`}
                    >
                        <p className="text-black">{message.message}</p>
                    </Card>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div>
                {signal && <h1>{`${target.name} is typing...`}</h1>}
                <Card className="border-t border-gray-200 bg-white p-4">
                    <CardContent className="flex gap-x-2.5">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Type here"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-1 text-black"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSubmit(e);
                            }}
                            onFocus={() => chatService.sendSignal(auth.user.id.toString(), target.id, 'typing')}
                            onBlur={() => chatService.sendSignal(auth.user.id.toString(), target.id, 'leave')}
                        />
                        <Button onClick={handleSubmit} className="bg-green-500 text-white">
                            Send
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
