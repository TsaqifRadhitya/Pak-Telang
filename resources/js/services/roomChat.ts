import { RealtimeChannel } from '@supabase/supabase-js';
import { supabaseService } from './supabase';
import { messageType } from '@/pages/chat/roomChat';

export class chatServices extends supabaseService {

    private chanel: RealtimeChannel | undefined;

    public async activeRoomChat(source: string, target: string, deleteMesage: (id: string) => void, setter: (params: messageType) => void, handleSignal: (params: 'typing' | 'leave') => void) {
        const chanel = this.supabaseConnection.channel('chat')
        this.chanel = chanel
        chanel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
            const newMessage = payload.new
            const sender = newMessage.from
            const receiver = newMessage.to
            if (sender === target && receiver === source) {
                await this.supabaseConnection.from('messages').update({ isReaded: true }).eq('id', newMessage.id)
                setter({
                    id: newMessage.id,
                    from: sender,
                    image: newMessage.image,
                    to: receiver,
                    message: newMessage.message
                });
            }
            if (sender === source && receiver === target) {
                await this.supabaseConnection.from('messages').update({ isReaded: true }).eq('id', newMessage.id)
                setter({
                    id: newMessage.id,
                    from: sender,
                    to: receiver,
                    message: newMessage.message
                });
            }
        })

        chanel.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, (payload) => {
            const deletedMessage = payload.old
            deleteMesage(deletedMessage.id)
        })

        chanel.on('broadcast', { event: 'Broadcast' }, (payload) => {
            console.log(payload)
            if (payload.payload.id === target) {
                handleSignal(payload.payload.event)
            }
        })
        chanel.subscribe()
    }

    public async sendSignal(sender: string, type: 'typing' | 'leave') {
        await this.chanel?.send({ type: 'broadcast', event: 'Broadcast', payload: { event: type, id: sender } })
    }
}
