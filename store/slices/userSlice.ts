// app/(providers)/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  address: string | null;
  isConnected: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'zh';
  isAdmin: boolean;
}

const initialState: UserState = {
  address: null,
  isConnected: false,
  theme: 'dark',
  language: 'en',
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectWallet: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
      state.isConnected = true;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.isConnected = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setLanguage: (state, action: PayloadAction<'en' | 'es' | 'zh'>) => {
      state.language = action.payload;
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { connectWallet, disconnectWallet, toggleTheme, setLanguage, setAdmin } = userSlice.actions;
export default userSlice.reducer;