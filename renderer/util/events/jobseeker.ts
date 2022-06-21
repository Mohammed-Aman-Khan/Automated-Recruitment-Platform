import { ipcCheck, ipc } from './index'

export const JOBSEEKER_EVENTS = {

    GET_MY_DETAILS: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'get-my-details', ...args ) ) ),

    SAVE_MY_DETAILS: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'save-my-details', ...args ) ) ),

}