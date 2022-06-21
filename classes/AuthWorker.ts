import Credential from '../schemas/Credential.schema'
import JobSeeker from '../schemas/JobSeeker.schema'
import Employer from '../schemas/Employer.schema'
import { CredentialInterface } from '../interfaces/Credential.interface'
import { JobSeekerInterface } from '../interfaces/JobSeeker.interface'
import { EmployerInterface } from '../interfaces/Employer.interface'
import { encrypt, decrypt } from '../util/crypt'
import { isEqual } from 'lodash'
import { Document } from 'mongoose'
import { AuthWorkerInterface, LoginDetails, RegisterDetails, } from '../interfaces/AuthWorker.interface'
import { BasicResponse } from '../interfaces/Shared.interface'

class AuthWorker implements AuthWorkerInterface {

    /**
     * Authenticates the User.
     * @param {LoginDetails} loginDetails
     * @returns {Promise<BasicResponse>} Promise<BasicResponse>
     */
    async login ( loginDetails: LoginDetails ): Promise<BasicResponse> {
        try {
            const { email, password, userType } = loginDetails

            const result: CredentialInterface | null = await Credential.findOne( { email, userType } )

            if ( result ) { // If User found
                let decryptedPassword = decrypt( result.password, result.key )
                if ( !isEqual( password, decryptedPassword ) ) // If password does not match
                    return {
                        status: false,
                        error: "Invalid Credentials",
                    }
                else // If password matches
                    return {
                        status: true,
                    }
            }
            else { // If User not found
                return {
                    status: false,
                    error: "User does not exist",
                }
            }
        }
        catch ( err ) {
            return {
                status: false,
                error: err.message,
            }
        }
    }

    /**
     * Registers a new User.
     * @param {RegisterDetails} registerDetails
     * @returns {Promise<BasicResponse>} Promise<BasicResponse>
     */
    async register ( registerDetails: RegisterDetails ): Promise<BasicResponse> {
        try {
            const { email, password, userType, name, branch, } = registerDetails

            const result: CredentialInterface | null = await Credential.findOne( { email } )

            if ( result ) { // If User found
                return {
                    status: false,
                    error: "User exists",
                }
            }
            else { // If User not found
                let newUser: Document<JobSeekerInterface | EmployerInterface>
                let newCredentials: Document<CredentialInterface>

                let { key, encryptedString } = encrypt( password )

                newCredentials = new Credential( {
                    email,
                    key,
                    password: encryptedString,
                    userType,
                } )

                switch ( userType ) {
                    case 'JOBSEEKER':
                        newUser = new JobSeeker( {
                            email,
                            name,
                            interests: [ 'FULL TIME', 'PART TIME', 'INTERNSHIP' ],
                        } )
                        break
                    case 'EMPLOYER':
                        newUser = new Employer( {
                            email,
                            name,
                            branch,
                        } )
                        break
                    default:
                        return {
                            status: false,
                            error: "Invalid User Type",
                        }
                }

                if ( newUser && newCredentials ) {
                    await Promise.all( [ newUser.save(), newCredentials.save() ] )
                    return {
                        status: true,
                    }
                }
            }
        }
        catch ( err ) {
            return {
                status: false,
                error: err.message
            }
        }
    }
}

export default AuthWorker