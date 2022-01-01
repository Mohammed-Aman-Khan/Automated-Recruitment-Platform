import { Schema, model } from 'mongoose'

// Interface representing a document in MongoDB.
interface JobSeekerInterface {

}

// Schema corresponding to the document interface.
const schema = new Schema<JobSeekerInterface>({

})

// Create a Model.
const JobSeeker = model<JobSeekerInterface>('JobSeeker', schema)

export default JobSeeker