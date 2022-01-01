import { Schema, model } from 'mongoose'

// Interface representing a document in MongoDB.
interface IEmployer {

}

// Schema corresponding to the document interface.
const schema = new Schema<IEmployer>({

})

// Create a Model.
const Employer = model<IEmployer>('Employer', schema)

export default Employer