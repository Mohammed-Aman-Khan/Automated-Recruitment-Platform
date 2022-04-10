type UserId = string
type Password = string
type UserType = 'JOBSEEKER' | 'EMPLOYER'

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