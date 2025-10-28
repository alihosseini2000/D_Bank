import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  address: string | null;
  balance: string;
}

const initialState: UserState = { address: null, balance: '0' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
  },
});

export const { setWallet, setBalance } = userSlice.actions;
export default userSlice.reducer;