import React, { useContext } from "react";
import { COLORS } from "../../project/background-changer/colors";


interface ThemeContextType {
    themeColor: COLORS;
    setThemeColor: (color: COLORS) => void
}

export const ThemeContext = React.createContext<ThemeContextType>({themeColor: COLORS.BLACK, setThemeColor: () => {}});

export function useTheme() {
    return useContext(ThemeContext)
}
