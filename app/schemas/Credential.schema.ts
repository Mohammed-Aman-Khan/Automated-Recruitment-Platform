import * as mongoose from 'mongoose'

// Interface representing a document in MongoDB.
interface CredentialInterface extends mongoose.Document {
    userId: string,
    password: string,
    key: string,
    userType: string,
}

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<CredentialInterface>({
    userId: String,
    password: String,
    key: String,
    userType: String,
})

// Create a Model.
const Credential = mongoose.models.Credential || mongoose.model<CredentialInterface>('Credential', schema)

export { CredentialInterface }

export default Credential