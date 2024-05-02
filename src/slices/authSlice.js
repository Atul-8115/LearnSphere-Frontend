import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signupData: null,
    loading: false,
    refreshToken: localStorage.getItem("refreshToken") ? JSON.parse(localStorage.getItem("refreshToken")) : null
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
         setSignupData(state, value) {
            state.signupData = value.payload;
          },
          setLoading(state, value) {
            state.loading = value.payload;
          },
          setToken(state, value) {
            state.refreshToken = value.payload;
          },
    }
})

export const { 
    setToken, 
    setSignupData, 
    setLoading 
} = authSlice.actions
export default authSlice.reducer