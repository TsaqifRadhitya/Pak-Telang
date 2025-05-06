import { User } from "."
import { paymentType } from "./payment"

export type eWalletType = {
    id: string
    nominal: number
    bukti: string
    finished: boolean
    type: eWalletAcivityType
    userId: string
    transaksiId: string
    paymentId: string
    created_at: Date
    user? : User
    payment? : paymentType
}

export type eWalletAcivityType = 'Pemasukan' | 'Pengeluaran' | 'Penarikan'
