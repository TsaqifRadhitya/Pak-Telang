import { cn } from '@/lib/utils';
import { messageType } from '@/pages/chat/roomChat';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Button } from '../ui/button';
export default function BubbleChat({ message }: { message: messageType }) {
    const {
        auth: { user },
    } = usePage<SharedData>().props;

    const handelDeleteMessage = (id: string) => {
        if (user.role === 'Pak Telang') {
            router.delete(route('admin.chat.delete', { id: id }), {
                async: true,
            });
        }

        if (user.role === 'Mitra') {
            router.delete(route('mitra.chat.delete', { id: id }), {
                async: true,
            });
        }
    };

    return (
        <section className={cn('flex w-full justify-start px-5 text-[#3B387E]', message.from === user.id && 'justify-end')}>
            <div className={cn('flex w-1/2 flex-col', message.from === user.id ? 'items-end' : 'items-start')}>
                {message.from === user.id && (
                    <Button
                        onClick={() => handelDeleteMessage(message.id as string)}
                        className="cursor-pointer rounded-xl border-2 border-[#5961BE] bg-[#B9BDFF]"
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
                <pre
                    className={cn(
                        'lg:text-md w-full rounded-2xl bg-[#AFB3FF]/24 px-5 py-4 font-sans text-xs break-words whitespace-pre-wrap ring ring-[#AFB3FF] md:text-sm',
                        message.from === user.id && 'mt-2.5 bg-[#A0D9A0]/37 text-right ring-[#048730]/33',
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
