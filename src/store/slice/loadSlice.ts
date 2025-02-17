import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
};

const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export default loadSlice.reducer;

export const { setLoading: setLoadingAction } = loadSlice.actions;
