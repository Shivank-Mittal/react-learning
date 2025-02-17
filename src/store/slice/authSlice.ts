import { createSlice } from '@reduxjs/toolkit';

type userStateType = {
  $id: number;
  name: string;
};

type authStateType = {
  isLoggedIn: boolean;
  user?: userStateType;
};

const initialState: authStateType = { isLoggedIn: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = undefined;
    }
  }
});

export const { login: loginAction, logout: logoutAction } = userSlice.actions;
export default userSlice.reducer;
