import AuthWorker from "../../classes/AuthWorker"

const auth = new AuthWorker()

export const AUTH_EVENTS = [
    {
        name: 'login',
        callback: auth.login,
    },
    {
        name: 'register',
        callback: auth.register,
    }
]