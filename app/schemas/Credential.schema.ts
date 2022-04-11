import * as mongoose from 'mongoose'
import { CredentialInterface } from '../interfaces/Credential.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<CredentialInterface>({
    emailId: String,
    password: String,
    key: String,
    userType: String,
})

// Create a Model.
const Credential = mongoose.models.Credential || mongoose.model<CredentialInterface>('Credential', schema)

export default Credential