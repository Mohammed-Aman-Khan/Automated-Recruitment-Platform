import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const QuestionSet = createSlice( {
    name: 'questionSet',
    initialState,
    reducers: {
        setQuestionSet: ( state, action ) => {
            return action.payload
        },
        resetQuestionSet: ( state, action ) => {
            return initialState
        },
    }
} )

export const {
    setQuestionSet,
    resetQuestionSet,
} = QuestionSet.actions

export default QuestionSet