import Credential, { CredentialInterface } from '../schemas/Credential.schema'
import { UserId, UserType, Password, LoginResponse, RegisterResponse } from '../types/AuthWorker'
import { decrypt } from '../util/crypt'
import { isEqual } from 'lodash'

interface AuthWorkerInterface {
    login: (userId: UserId, password: Password) => Promise<LoginResponse>,
    register: (userId: UserId, password: Password, userType: UserType) => Promise<RegisterResponse>,
}

class AuthWorker implements AuthWorkerInterface {

    /**
     * Authenticates and Logs the User in.
     * @param {UserId} userId
     * @param {Password} password
     * @returns {Promise<LoginResponse>} Promise<LoginResponse>
     */
    login(userId: UserId, password: Password): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            Credential
                .findOne({ userId })
                .then((result: CredentialInterface | null) => {
                    if (result) { // If User found
                        const decryptedPassword = decrypt(result.password, result.key)
                        if (!isEqual(password, decryptedPassword)) // If password does not match
                            reject({
                                success: false,
                                error: new Error("Invalid Credentials")
                            })
                        else // If password matches
                            resolve({
                                success: true
                            })
                    }
                    else { // If User not found
                        reject({
                            success: false,
                            error: new Error("User does not exist")
                        })
                    }

                })
                .catch((err: Error) => {
                    reject({
                        success: false,
                        error: err
                    })
                })
        })
    }

    /**
     * Registers a new User.
     * @param {UserId} userId
     * @param {Password} password
     * @param {UserType} userType
     * @returns {Promise<RegisterResponse>} Promise<RegisterResponse>
     */
    register(userId: UserId, password: Password, userType: UserType): Promise<RegisterResponse> {

    }

}

export default AuthWorker