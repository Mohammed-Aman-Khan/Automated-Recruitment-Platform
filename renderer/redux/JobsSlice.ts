import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const JobsSlice = createSlice( {
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: ( state, action ) => {
            return action.payload
        },
        resetJobs: ( state, action ) => {
            return initialState
        },
    }
} )

export const {
    setJobs,
    resetJobs,
} = JobsSlice.actions

export default JobsSlice