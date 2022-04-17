import * as mongoose from 'mongoose'
import { EmployerInterface } from '../interfaces/Employer.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<EmployerInterface>({
    name: String,
    email: String,
    branch: String,
})

// Create a Model.
const Employer = mongoose.models.Employer || mongoose.model<EmployerInterface>('Employer', schema)

export default Employer