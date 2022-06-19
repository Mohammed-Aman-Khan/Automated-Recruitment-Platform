import electron from 'electron'

const ipcPresent = Boolean( electron.ipcRenderer )
export const ipc = electron.ipcRenderer

const voidFunction = async ( ...args ) => { }
export const ipcCheck = ( callback ) => ipcPresent ? callback : voidFunction