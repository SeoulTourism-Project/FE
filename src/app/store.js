import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../features/languageSlice';
import goodsReducer from '../features/goodsSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    goods: goodsReducer,
  },
});
