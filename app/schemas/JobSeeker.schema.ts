import { Schema, model } from 'mongoose'

// Interface representing a document in MongoDB.
interface IJobSeeker {

}

// Schema corresponding to the document interface.
const schema = new Schema<IJobSeeker>({

})

// Create a Model.
const JobSeeker = model<IJobSeeker>('JobSeeker', schema)

export default JobSeeker