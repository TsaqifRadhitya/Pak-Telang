export function currencyConverter(param: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: "IDR" }).format(param)
}
