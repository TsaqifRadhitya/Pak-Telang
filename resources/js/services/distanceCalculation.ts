import { addressType } from "@/types/address";
import { addressFormater } from "@/utils/addressFormater";
import axios from "axios";

export async function distaceCalculationService(param: { from: addressType, to: addressType }) {
    const fromAddressFormated = addressFormater(param.from)
    const toAddressFormated = addressFormater(param.to)
    const ress = await axios.get('https://api.distancematrix.ai/maps/api/distancematrix/json', {
        params: {
            origins: fromAddressFormated,
            destinations: toAddressFormated,
            key: import.meta.env.VITE_DISTANCE_MATRIX_AI
        }
    })
    const price = getPrice(ress.data.rows[0].elements[0].distance.value / 1000)
    return price
}

function getPrice(param: number) {
    if (param < 1) {
        return 12000
    }
    return Math.floor((param - 1)) * 2000 + 12000
}
