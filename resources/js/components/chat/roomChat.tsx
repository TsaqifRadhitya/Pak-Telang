import { messageType } from '@/pages/chat/roomChat';
import { User } from '@/types';

export default function RoomChat({ sender, receiver, messages }: { sender: User; receiver: User; messages: messageType[] }) {
    // const [messagesState, setMessages] = useState<messageType[]>(messages);

    console.log(sender, receiver, messages);

    // const handleSendMessage = () => {

    // }

    // const newMessage = (data:messageType) => {
    //     if(messages){
    //         setMessages([...messagesState,data])
    //         return
    //     }

    //     setMessages([data])
    // }

    // const removeMessage = (id:string) => {
    //     const newMessages = [...messagesState].filter((message) => message.id != id)
    //     setMessages(newMessages)
    // }

    return <></>;
}
