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
    created_at?: string;
};

interface Props extends SharedData {
    messages: messageType[];
    target: User;
}

export default function ChatRoom() {
    const { messages, auth, target } = usePage<Props>().props;
    const [roomchatMessages, setMessages] = useState<messageType[]>(messages);
    const [inputMessage, setInputMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [roomchatMessages]);

    useEffect(() => {
        const chatService = new chatServices();
        document.getElementById('app')?.removeAttribute('data-page');
        chatService.activeRoomChat(auth.user.id, target.id, handleNewChat);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            const newMessage: messageType = {
                message: inputMessage,
                to: target.id.toString(),
                from: auth.user.id.toString(),
            };
            router.post(
                route('chat.store', { id: target.id }),
                { message: inputMessage },
                {
                    onSuccess: () => {
                        setInputMessage(''); // Clear input after sending
                    },
                    async: true,
                },
            );
            setMessages((prev) => [...prev, newMessage]);
        }
    };

    const handleNewChat = (params: messageType) => {
        setMessages((prev) => [...prev, params]);
    };

    return (
        <div className="objec flex h-screen flex-col bg-[url('https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Image/WhatsApp%20Image%202025-03-19%20at%2020.10.22_3898d1db.jpg')] bg-cover">
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
            <Card className="border-t border-gray-200 bg-white p-4">
                <CardContent className="flex gap-x-2.5">
                    <Input
                        type="text"
                        placeholder="Type here"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-1 text-black"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSubmit(e);
                        }}
                    />
                    <Button onClick={handleSubmit} className="bg-green-500 text-white">
                        Send
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
