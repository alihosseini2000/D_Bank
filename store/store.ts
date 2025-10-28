import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/walletSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: { wallet: walletReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;