import { weightType } from "@/types/weight";

export function weightConverter(params: weightType[]) {
    const mapWeight = params.map((item) => {
        if (item.unit === 'gram') {
            return item.weight / 1000
        }
        return item.weight
    })

    return mapWeight.reduce((prev, current) => prev + current, 0)
}
