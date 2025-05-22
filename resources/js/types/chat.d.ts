import { User } from "."

export type chatType = {
    id: string
    message: string
    isReaded: boolean
    from: string
    to: string,
    senderProfile?: User
    created_at: string
    unreaded: number
}
