import RoomChat from '@/components/chat/roomChat';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { messageType } from '@/pages/chat/roomChat';
import { SharedData, User } from '@/types';
import { usePage } from '@inertiajs/react';

interface props extends SharedData {
    receiver: User;
    messages: messageType[];
}

export default function Create() {
    const { auth, receiver, messages } = usePage<props>().props;
    console.log(messages);
    return (
        <MitraPageLayout page='Bantuan'>
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Chat</h1>
                </div>
                <RoomChat sender={auth.user} receiver={receiver} messages={messages}/>
            </main>
        </MitraPageLayout>
    );
}
