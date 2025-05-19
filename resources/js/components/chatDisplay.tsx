import { chatType } from '@/types/chat';
import { dateFormaterUtils } from '@/utils/dateFormater';
import HeadingSmall from './heading-small';
import { router } from '@inertiajs/react';

export default function ChatDisplayComponent({ lastChat, type }: { lastChat: chatType; type: 'Admin' | 'Mitra' }) {
    const handleJoinRoomChat = () => {
        switch(type){
            case "Admin":
                break
            case "Mitra":
                router.get(route('mitra.chat.index'))
                break
        }
    }

    return (
        <section onClick={handleJoinRoomChat} className="flex cursor-pointer justify-between">
            <div className="2/3 flex w-full items-center justify-between gap-5">
                <img
                    src={lastChat.senderProfile.profile_picture}
                    className="aspect-square w-16 rounded-full border-2 border-[#3B387E] object-cover object-top shadow"
                    alt=""
                />
                <div className="flex flex-1 flex-col justify-between">
                    <HeadingSmall title={lastChat.senderProfile.name} className="font-semibold" />
                    <p className="line-clamp-1 max-w-2xl break-words">{lastChat.message ?? ''}</p>
                </div>
            </div>
            <div className="flex w-96 gap-7.5">
                <p className="text-[0.85rem] font-extralight">
                    {lastChat.created_at ? dateFormaterUtils(lastChat.created_at as unknown as Date) : ''}
                </p>
                {lastChat.unreaded > 0 && (
                    <div className="flex h-7 w-7 items-center justify-center self-center rounded-full bg-[#4CA763] text-white">
                        <p>{lastChat.unreaded}</p>
                    </div>
                )}
            </div>
        </section>
    );
}
