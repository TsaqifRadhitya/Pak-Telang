import { addressType } from "@/types/address";

export function addressFormater(param: addressType) {
    return `${param.address}, ${param.districtName}, ${param.cityName}, ${param.province}, ${param.postalCode}`
}
