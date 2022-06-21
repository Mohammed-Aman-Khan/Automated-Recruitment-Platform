import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    resumeLink: '',
    qualifications: [],
    experience: [],
    certifications: [],
    skills: [],
}

const MyDetailsSlice = createSlice( {
    name: 'myDetails',
    initialState,
    reducers: {
        setMyDetails: ( state, action ) => {
            state = action.payload
            return state
        },
        resetMyDetails: ( state, action ) => {
            return initialState
        },
    }
} )

export const {
    setMyDetails,
    resetMyDetails,
} = MyDetailsSlice.actions

export default MyDetailsSlice