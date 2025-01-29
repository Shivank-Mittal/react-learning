import { createSlice } from "@reduxjs/toolkit";
import { COLORS } from "../../../project/background-changer/colors";

export interface themeState {
    color: COLORS
}

const initialState: themeState = {
    color: COLORS.BLACK
}

const themeSlice = createSlice( {
    name: "theme",
    initialState,
    reducers: {
        updateThemeColor: (state, action) => {state.color = action.payload}
    }
})


export const {updateThemeColor} = themeSlice.actions
export default themeSlice.reducer;