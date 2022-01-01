import { Schema, model } from 'mongoose'

// Interface representing a document in MongoDB.
interface EmployerInterface {

}

// Schema corresponding to the document interface.
const schema = new Schema<EmployerInterface>({

})

// Create a Model.
const Employer = model<EmployerInterface>('Employer', schema)

export default Employer