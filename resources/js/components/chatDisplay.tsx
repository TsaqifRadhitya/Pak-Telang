import { useCurrentMediaQuerry } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { chatType } from '@/types/chat';
import { dateFormaterUtils } from '@/utils/dateFormater';
import { router } from '@inertiajs/react';
import HeadingSmall from './heading-small';

export default function ChatDisplayComponent({ lastChat, type, className }: { lastChat: chatType; type: 'Admin' | 'Mitra'; className?: string }) {
    const handleJoinRoomChat = () => {
        switch (type) {
            case 'Admin':
                router.get(route('admin.chat.show', { id: lastChat.senderProfile!.id }));
                break;
            case 'Mitra':
                router.get(route('mitra.chat.index'));
                break;
        }
    };

    const { lg } = useCurrentMediaQuerry();

    return (
        <section onClick={handleJoinRoomChat} className={cn('flex cursor-pointer justify-between', className)}>
            <div className="flex w-full items-center justify-between gap-5">
                <img
                    src={lastChat.senderProfile?.profile_picture || window.location.origin + '/Asset/Icon/Profile.svg'}
                    className="aspect-square w-10 rounded-full object-cover object-top shadow lg:w-16"
                    alt=""
                />
                <div className="flex flex-1 flex-col justify-between">
                    <HeadingSmall
                        title={type === 'Mitra' ? 'Pak Telang' : lastChat.senderProfile!.name}
                        className="max-w-40 text-sm font-semibold break-words lg:max-w-max lg:text-lg"
                    />
                    <p className="line-clamp-1 max-w-2xl text-xs break-words lg:text-lg">{lastChat.message ?? ''}</p>
                </div>
            </div>
            <div className="flex w-32 items-center gap-7.5 lg:w-96 lg:items-baseline">
                <p className="min-w-max text-[0.6rem] font-extralight lg:text-[0.85rem]">
                    {lastChat.created_at ? dateFormaterUtils(lastChat.created_at as unknown as Date, lg ? 'Full' : 'Simple') : ''}
                </p>
                {lastChat.unreaded > 0 && (
                    <div className="flex aspect-square h-5 w-5 items-center justify-center self-center rounded-full bg-[#4CA763] text-white lg:h-7 lg:w-7">
                        <p className="lg:text-md text-xs">{lastChat.unreaded}</p>
                    </div>
                )}
            </div>
        </section>
    );
}
