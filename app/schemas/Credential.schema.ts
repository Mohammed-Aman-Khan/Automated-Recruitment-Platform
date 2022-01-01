import { Schema, model } from 'mongoose'

// Interface representing a document in MongoDB.
interface ICredential {
    userId: string,
    password: string,
    userType: string,
}

// Schema corresponding to the document interface.
const schema = new Schema<ICredential>({
    userId: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
})

// Create a Model.
const Credential = model<ICredential>('Credential', schema)

export default Credential