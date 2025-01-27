export enum COLORS {
    GREEN = "GREEN",
    BLACK = "BLACK",
    BLUE = "BLUE",
    RED = "RED",
    BROWN = "BROWN",
    WHITE = "WHITE",
    YELLOW = "YELLOW"
}

export const ColorsRecord = new Map<string, COLORS>(Object.values(COLORS).map(value => [value, value]));