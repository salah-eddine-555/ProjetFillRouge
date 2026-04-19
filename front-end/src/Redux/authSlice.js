
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    auth: localStorage.getItem('token') ? true : false ,
    user: JSON.parse(localStorage.getItem('user'))|| {}
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action)=> {
            state.auth = true;
            state.user = action.payload;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.auth = false;
            state.user = {};
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload));
        }
    }
})
export const {login, logout, setUser} = authSlice.actions;
export default  authSlice.reducer;