import { ipcCheck, ipc } from './index'

export const EMPLOYER_EVENTS = {

    GET_QUESTION_SET: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'employer-get-question-set', ...args ) ) ),

    ADD_QUESTION: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'employer-add-question', ...args ) ) ),

    GET_JOBS: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'employer-get-jobs', ...args ) ) ),

    ADD_NEW_JOB: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'employer-add-new-job', ...args ) ) ),

}