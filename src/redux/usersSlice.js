import { createSlice } from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        token: sessionStorage.getItem("authToken") || null,
        user: ""
    },
    reducers: {
        SetToken: (state, action) => {
            state.token = action.payload
        },
        SetUser: (state, action) => {
            state.user = action.payload
        },
        ResetState: (state, action) => {
            state.token = null
            state.user = ""
        }
    }
})

export const { SetToken, SetUser, ResetState } = usersSlice.actions

export default usersSlice.reducer;
