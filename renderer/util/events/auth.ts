import { ipcCheck, ipc } from './index'

export const AUTH_EVENTS = {
    LOGIN: ipcCheck(async (...args) => {
        return await ipc.invoke('login', ...args)
    }),
    REGISTER: ipcCheck(async (...args) => {
        return await ipc.invoke('register', ...args)
    }),
}