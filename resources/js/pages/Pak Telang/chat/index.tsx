import ChatDisplayComponent from '@/components/chatDisplay';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { chatType } from '@/types/chat';
import axios from 'axios';
import { useEffect } from 'react';
import useSWR, { mutate } from 'swr';

export default function Index({ messages }: { messages: chatType[] }) {
    const fetcher = async (url: string) => {
        return (await axios.get(url)).data;
    };

    const { data } = useSWR(route('admin.chat.swr'), fetcher);

    useEffect(() => {
        mutate(route('admin.chat.swr'), messages);
    }, [messages]);
    return (
        <AdminPageLayout page="Chat">
            <main className="flex h-full min-h-screen w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg lg:min-h-min">
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
            </main>
        </AdminPageLayout>
    );
}
