import { ipcCheck, ipc } from './index'

export const JOBSEEKER_EVENTS = {

    GET_JOBS: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'jobseeker-get-jobs', ...args ) ) ),

    GET_MY_DETAILS: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'jobseeker-get-my-details', ...args ) ) ),

    SAVE_MY_DETAILS: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'jobseeker-save-my-details', ...args ) ) ),

}