import * as mongoose from 'mongoose'

// Interface representing a document in MongoDB.
interface EmployerInterface extends mongoose.Document {
    organization: string,
    email: string,
    branch: string,
}

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<EmployerInterface>({
    organization: String,
    email: String,
    branch: String,
})

// Create a Model.
const Employer = mongoose.models.Employer || mongoose.model<EmployerInterface>('Employer', schema)

export { EmployerInterface }

export default Employer