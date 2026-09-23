export const increaseQty = (qty: number, max = 99): number => Math.min(qty + 1, max);

export const decreaseQty = (qty: number, min = 1): number => Math.max(qty - 1, min);

export const clampQty = (value: number, max = 99): number => {
    const min = 1;
    if (isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
}