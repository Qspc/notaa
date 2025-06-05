import { ComponentProps } from "./types";

export function formatThreeDigit(amount: number | string): string {
    const num = typeof amount === "number" ? amount : parseInt(amount, 10);
    if (isNaN(num)) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function generateRandomHexColor(): string {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, "0")}`;
}

export function sumAmount(items: ComponentProps[]): number {
    return items.reduce((total, item) => total + +item.amount, 0);
}
