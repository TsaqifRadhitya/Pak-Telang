import RoomChat from '@/components/chat/roomChat';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { props } from '@/pages/Mitra/Chat/create';
import { usePage } from '@inertiajs/react';

export default function ShowChatPage() {
    const { auth, receiver, messages } = usePage<props>().props;

    return (
        <AdminPageLayout page="Chat">
            <main className="flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Chat</h1>
                </div>
                <RoomChat user={auth.user} target={receiver} messages={messages} />
            </main>
        </AdminPageLayout>
    );
}
