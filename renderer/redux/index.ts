import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import JobsSlice from './JobsSlice'
import MyDetailsSlice from './MyDetailsSlice'
import QuestionSetSlice from './QuestionSetSlice'

const Store = configureStore( {
    reducer: {
        auth: AuthSlice.reducer,
        myDetails: MyDetailsSlice.reducer,
        questionSet: QuestionSetSlice.reducer,
        jobs: JobsSlice.reducer,
    },
} )

Store.subscribe( () => {
    Object
        .entries( Store.getState() )
        .forEach( ( [ key, value ] ) => {
            localStorage.setItem( key, JSON.stringify( value ) )
        } )
} )

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store