import Credential, { CredentialInterface } from '../schemas/Credential.schema'
import JobSeeker, { JobSeekerInterface } from '../schemas/JobSeeker.schema'
import Employer, { EmployerInterface } from '../schemas/Employer.schema'
import { UserId, UserType, Password, LoginResponse, RegisterResponse } from '../types/AuthWorker'
import { decrypt } from '../util/crypt'
import { isEqual } from 'lodash'
import { Document } from 'mongoose'

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
    login (userId: UserId, password: Password): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            // Querying the database
            Credential
                .findOne({ userId })
                .then((result: CredentialInterface | null) => {
                    if (result) { // If User found
                        let decryptedPassword = decrypt(result.password, result.key)
                        if (!isEqual(password, decryptedPassword)) // If password does not match
                            reject({
                                success: false,
                                error: new Error("Invalid Credentials")
                            })
                        else // If password matches
                            resolve({ success: true })
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
    register (userId: UserId, password: Password, userType: UserType): Promise<RegisterResponse> {
        return new Promise<RegisterResponse>((resolve, reject) => {
            // Check whether an account with the same UserId exists
            // Querying the database
            Credential
                .findOne({ userId })
                .then((result: CredentialInterface | null) => {
                    if (result) { // If User found
                        reject({
                            success: false,
                            error: new Error("User exists")
                        })
                    }
                    else { // If User not found
                        let newUser: Document<JobSeekerInterface | EmployerInterface>
                        switch (userType) {
                            case 'JOBSEEKER':
                                newUser = new JobSeeker({

                                })
                                return newUser.save()
                                break
                            case 'EMPLOYER':
                                newUser = new Employer({

                                })
                                return newUser.save()
                                break
                            default:
                                reject({
                                    success: false,
                                    error: new Error("Invalid User Type")
                                })
                                break
                        }
                    }
                })
                .then(() => resolve({ success: true }))
                .catch((err: Error) => {
                    reject({
                        success: false,
                        error: err
                    })
                })
        })
    }
}

export default AuthWorker