import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import MyDetailsSlice from './MyDetailsSlice'
import QuestionSetSlice from './QuestionSetSlice'

const Store = configureStore( {
    reducer: {
        auth: AuthSlice.reducer,
        myDetails: MyDetailsSlice.reducer,
        questionSet: QuestionSetSlice.reducer,
    },
} )

Store.subscribe( () => {
    Object.entries( Store.getState() ).map( ( [ key, value ] ) => {
        localStorage.setItem( key, JSON.stringify( value ) )
    } )
} )

export default Store