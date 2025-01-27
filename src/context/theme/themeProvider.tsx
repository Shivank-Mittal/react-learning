import { ReactNode, useState } from "react";
import {ThemeContext} from "./themeContext";
import { COLORS } from "../../project/background-changer/colors";


export default function ThemeProvider({children}: {children: ReactNode}) {
    const [themeColor, setThemeColor] = useState(COLORS.BLACK);
    return (
        <ThemeContext.Provider value= {{themeColor, setThemeColor}}>
            {children}
        </ThemeContext.Provider>
    )
}
