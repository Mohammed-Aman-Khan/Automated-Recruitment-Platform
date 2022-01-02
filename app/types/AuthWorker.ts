type UserId = string
type Password = string
type UserType = 'JOB_SEEKER' | 'EMPLOYER'

type LoginResponse = {
    success: boolean,
    error?: Error,
}

type RegisterResponse = {
    success: boolean,
    error?: Error,
}

export {
    UserId,
    Password,
    UserType,
    LoginResponse,
    RegisterResponse
}