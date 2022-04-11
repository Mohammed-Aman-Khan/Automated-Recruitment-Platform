import * as mongoose from 'mongoose'
import { Name, EmailId, Branch } from '../types/Employer.types'

export interface EmployerInterface extends mongoose.Document {
    name: Name,
    email: EmailId,
    branch: Branch,
}