export function dateFormaterUtils(param: Date, type: "Simple" | "Full" = "Full") {
    const date = new Date(param);
    if (type === "Full") {
        const formattedDate = new Intl.DateTimeFormat('id-ID', { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: 'Asia/Jakarta', hour12: false }).format(date) + ' WIB';
        return formattedDate

    } else {
        const formattedDate = new Intl.DateTimeFormat('id-ID').format(date).replaceAll('/','-');
        return formattedDate

    }
}
