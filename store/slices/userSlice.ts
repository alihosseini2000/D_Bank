import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { address: '', profile: null, history: [] },
  reducers: {
    setUser: (state, action) => { state.address = action.payload; },
    setProfile: (state, action) => { state.profile = action.payload; },
  },
});

export const { setUser, setProfile } = userSlice.actions;
export default userSlice.reducer;