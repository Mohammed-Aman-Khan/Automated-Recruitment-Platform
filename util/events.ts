import AuthWorker from "../classes/AuthWorker"
import JobSeekerWorker from "../classes/JobSeekerWorker"
import electron from 'electron'

type EventName = string
type EventCaller = (data?) => any
type EventAndCaller = {
    name: EventName,
    caller: EventCaller,
}





const ipcRenderer = electron.ipcRenderer || false
const voidFunction = () => { }
const ipcCheck: EventCaller = (callback) => ipcRenderer ? callback : voidFunction





export const AUTH_EVENTS_AND_CALLERS: EventAndCaller[] = [
    {
        name: 'login',
        caller: ipcCheck(),
    },
    {
        name: 'register',
        caller: ipcCheck(),
    },
]

const AUTH_EVENTS = {}
AUTH_EVENTS_AND_CALLERS.forEach(({ name }) => AUTH_EVENTS[ name.toUpperCase() ] = name)
export { AUTH_EVENTS }





export const JOBSEEKER_EVENTS_AND_CALLERS: EventAndCaller[] = [

]

const JOBSEEKER_EVENTS = {}
JOBSEEKER_EVENTS_AND_CALLERS.forEach(({ name }) => JOBSEEKER_EVENTS[ name.toUpperCase() ] = name)
export { JOBSEEKER_EVENTS }





export const EMPLOYER_EVENTS_AND_CALLERS: EventAndCaller[] = [

]

const EMPLOYER_EVENTS = {}
EMPLOYER_EVENTS_AND_CALLERS.forEach(({ name }) => EMPLOYER_EVENTS[ name.toUpperCase() ] = name)
export { EMPLOYER_EVENTS }