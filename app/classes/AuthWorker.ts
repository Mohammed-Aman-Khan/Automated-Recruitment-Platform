import Credential from '../schemas/Credential.schema'
import * as mongoose from 'mongoose'

class AuthWorker {

    connected = false

    constructor() {
        mongoose.connect(process.env.DB_URL)
            .then(() => {
                this.connected = true
            })
            .catch(err => {
                throw new Error(err.message)
            })
    }

    login(userId: string, password: string) {

    }

    logout(userId: string) {

    }

    register(userId: string, password: string, userType: 'JOB_SEEKER' | 'EMPLOYER') {

    }

}

export default AuthWorker