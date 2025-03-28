import { supabaseService } from './supabase';
import { messageType } from '@/pages/chat/roomChat';

export class chatServices extends supabaseService {
    public activeRoomChat(source: string, target: string, setter: (params: messageType) => void) {
        this.supabaseConnection.channel('chat').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
            const newMessage = payload.new
            const sender = newMessage.from
            const receiver = newMessage.to
            if (sender === target && receiver === source) {
                console.log(newMessage)
                setter({
                    from: sender,
                    to: receiver,
                    message: newMessage.message
                });
            }
        }).subscribe()
    }

    public async getUserList(user: string) {
        const users = await this.supabaseConnection.from('users').select().not('id', 'like', user)
        return users
    }
}
