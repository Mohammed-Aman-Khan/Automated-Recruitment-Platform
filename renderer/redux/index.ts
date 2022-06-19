import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'

const Store = configureStore( {
    reducer: {
        auth: AuthSlice.reducer,
    },
} )

Store.subscribe( () => {
    Object.entries( Store.getState() ).map( ( [ key, value ] ) => {
        localStorage.setItem( key, JSON.stringify( value ) )
    } )
} )

export default Store