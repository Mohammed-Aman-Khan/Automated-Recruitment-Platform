import * as mongoose from 'mongoose'
import { UserType, EmailId, Key, Password } from '../types/Credential.types'

export interface CredentialInterface extends mongoose.Document {
    email: EmailId,
    password: Password,
    key: Key,
    userType: UserType,
}