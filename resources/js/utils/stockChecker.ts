import { productDetailType } from "@/types/productDetail";
import { transactionType } from "@/types/transaction";

export function stockChecker(transactions: transactionType[], stocks: productDetailType[]) {
    console.log(transactions)
    return transactions?.filter((transaction) =>
        transaction.detail_transaksis.every((detail) =>
            stocks.find((stock) => stock.productId === detail.productId)?.stock ?? 0 >= detail.amount
        ) && !transaction.providerId && transaction.status === "Menunggu Konfirmasi"
    )
}
