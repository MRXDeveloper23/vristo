import { createSlice } from '@reduxjs/toolkit';
import { getToken, saveToken, removeToken } from '../services/tokenServices';

const initialState = { token: getToken() || null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            const { token } = action.payload;
            saveToken(token);
            return { token };
        },
        signOut: () => {
            removeToken();
            return { token: null };
        },
    },
});
export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
