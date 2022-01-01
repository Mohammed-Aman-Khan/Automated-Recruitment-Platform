import * as mongoose from 'mongoose'
import Credential from '../schemas/Credential.schema'
import AuthWorkerInterface, { ConnectionStatus, UserId, UserType, Password, LoginResponse, LogoutResponse, RegisterResponse } from '../types/AuthWorker'

class AuthWorker implements AuthWorkerInterface {

    connected: ConnectionStatus = false

    constructor() {

    }

    login(userId: UserId, password: Password) {

    }

    logout(userId: UserId) {

    }

    register(userId: UserId, password: Password, userType: UserType) {

    }

}

export default AuthWorker