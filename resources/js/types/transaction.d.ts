import { detailTransactionType } from "./detailTransaction"

export type transactionType = {
    created_at : Date
    id : string
    ongkir?: number
    resi?: string
    status : string
    Total: number
    snapToken : string
    detail_transaksis : detailTransactionType[]

}
