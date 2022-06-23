import { ipcCheck, ipc } from './index'

export const EMPLOYER_EVENTS = {

    GET_QUESTION_SET: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'get-question-set', ...args ) ) ),

    ADD_QUESTION: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'add-question', ...args ) ) ),

    GET_SKILLS: ipcCheck( async ( ...args ) => JSON.parse( await ipc.invoke( 'get-skills', ...args ) ) ),

}