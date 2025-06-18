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

export function palleteColors(index: number) {
    const pieChartColors = [
        "#FF6B6B", // Coral Red
        "#FFD93D", // Dandelion
        "#6BCB77", // Mint Green
        "#4D96FF", // Azure Blue
        "#845EC2", // Amethyst
        "#F9F871", // Butter Yellow
        "#00C9A7", // Aquamarine
        "#FF9671", // Mango
        "#FFC75F", // Sunbeam
        "#C34A36", // Brick
        "#0081CF", // Cobalt
        "#B0A8B9", // Lavender Gray
        "#2C73D2", // Denim
        "#FF6F91", // Watermelon Pink
        "#198754", // Emerald
        "#5FAD56", // Spring Green
        "#A28089", // Dusty Mauve
        "#F3C5FF", // Lilac Mist
        "#FFB085", // Apricot
        "#A3D2CA", // Cool Mint
    ];

    return pieChartColors[index]
        ? pieChartColors[index]
        : generateRandomHexColor();
}
