import { User } from "."
import { addressType } from "./address"
import { detailTransactionType } from "./detailTransaction"

export type transactionType = {
    created_at : Date
    id : string
    ongkir?: number
    resi?: string
    status : string
    metodePengiriman : string
    Total: number
    snapToken : string
    detail_transaksis : detailTransactionType[]
    user? : User
    providerId : string
    address? : addressType

}
