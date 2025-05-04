import { addressType } from "@/types/address";
import axios from "axios";

export async function rajaOngkirIdFinder(param: addressType) {
    const { address, cityName, districtName, postalCode, province } = param
    const ress = await axios.get('https://rajaongkir.komerce.id/api/v1/destination/domestic-destination', {
        params: {
            search: `${address}, ${districtName}, ${cityName}, ${province} ${postalCode}`
        },
        headers : {
            Accept : "application/json",
            key : import.meta.env.VITE_RAJAONGKIR_API_KEY_ID
        }
    })

    return await ress.data.data[0].id
}
