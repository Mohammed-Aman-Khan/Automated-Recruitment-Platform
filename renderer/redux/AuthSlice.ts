import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    email: '',
    userType: '',
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.loggedIn = true
            state.email = action.payload.email
            state.userType = action.payload.userType
            return state
        },
        resetAuth: (state, action) => {
            state = initialState
            return state
        },
    }
})

export const {
    setAuth,
    resetAuth,
} = AuthSlice.actions

export default AuthSlice