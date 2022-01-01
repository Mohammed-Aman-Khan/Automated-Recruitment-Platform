type ConnectionStatus = boolean
type UserId = string
type Password = string
type UserType = 'JOB_SEEKER' | 'EMPLOYER'

type LoginResponse = {
    success: boolean,
    error: Error,
}

type LogoutResponse = {
    success: boolean,
    error: Error,
}

type RegisterResponse = {
    success: boolean,
    error: Error,
}

interface AuthWorkerInterface {
    connected: ConnectionStatus,
    login: (userId: UserId, password: Password) => LoginResponse,
    logout: (userId: UserId) => LogoutResponse,
    register: (userId: UserId, password: Password, userType: UserType) => RegisterResponse,
}


export {
    ConnectionStatus,
    UserId,
    Password,
    UserType,
    LoginResponse,
    LogoutResponse,
    RegisterResponse
}

export default AuthWorkerInterface