export function percentageCalculation(baseValue: number, compareValue: number): number {
    if (compareValue === 0 && baseValue === 0) {
        return 0; // Tidak ada perubahan
    }

    if (compareValue === 0) {
        return 1; // Dari tidak ada menjadi ada (kenaikan penuh)
    }

    return ((baseValue - compareValue) / compareValue);
}
