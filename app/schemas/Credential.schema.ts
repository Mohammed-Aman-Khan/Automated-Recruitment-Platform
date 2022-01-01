import { Schema, model } from 'mongoose'

// Interface representing a document in MongoDB.
interface CredentialInterface {
    userId: string,
    password: string,
    userType: string,
}

// Schema corresponding to the document interface.
const schema = new Schema<CredentialInterface>({
    userId: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
})

// Create a Model.
const Credential = model<CredentialInterface>('Credential', schema)

export default Credential