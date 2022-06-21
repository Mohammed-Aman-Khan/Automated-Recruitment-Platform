import { ipcCheck, ipc } from './index'

export const AUTH_EVENTS = {

    LOGIN: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'login', ...args ) ) ),

    REGISTER: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'register', ...args ) ) ),

}