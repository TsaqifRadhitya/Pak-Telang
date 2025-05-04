import { addressType } from "@/types/address";
import { rajaOngkirIdFinder } from "./rajaOngkirIdFinder";
import axios from "axios";
import { weightType } from "@/types/weight";
import { weightConverter } from "./weightConverter";

export async function onkirCalculation(form: addressType, destination: addressType, transasactionValue: number, weight: weightType[]) {
    const fromId = rajaOngkirIdFinder(form)
    const destinationId = rajaOngkirIdFinder(destination)
    const ress = await Promise.all([fromId, destinationId]);
    const weightConverted = weightConverter(weight)
    const rajaOngkirRess = await axios.get('https://api-sandbox.collaborator.komerce.id/tariff/api/v1/calculate', {
        params: {
            shipper_destination_id: ress[0],
            receiver_destination_id: ress[1],
            weight: weightConverted,
            item_value: transasactionValue
        },
        headers: {
            Accept: "application/json",
            "x-api-key": import.meta.env.VITE_RAJAONGKIR_API_KEY
        }
    })

    return rajaOngkirRess.data.data.calculate_reguler
}
