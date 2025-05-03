import { productType } from './product';
export type detailTransactionType = {
    amount : number
    subTotal : number
    transactionId? : string
    productName : string
    productId : string
    product? : productType
}
