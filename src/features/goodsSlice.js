import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    addGoods: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { addGoods } = goodsSlice.actions;
export default goodsSlice.reducer;
