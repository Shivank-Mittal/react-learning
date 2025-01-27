export enum COLORS {
    GREEN = "rgb(22, 163, 74)",
    BLACK = "BLACK",
    BLUE = "rgb(37, 99, 235)",
    RED = "rgb(239, 68, 68)",
    BROWN = "BROWN",
    WHITE = "WHITE",
    YELLOW = "rgb(234, 179, 8)"
}

export const ColorsRecord = new Map<string, COLORS>(Object.values(COLORS).map(value => [value, value]));