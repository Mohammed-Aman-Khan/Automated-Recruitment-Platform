import * as mongoose from 'mongoose'

// Interface representing a document in MongoDB.
interface JobInterface extends mongoose.Document {
    role: string,
    description: string,
    requiredExperience: {
        min: number,
        max: number,
    },
    requiredSkills: string[],
    type: 'PART TIME' | 'FULL TIME' | 'INTERNSHIP',
    eligibleCandidates: mongoose.Types.ObjectId[],
    interviewsCompleted: mongoose.Types.ObjectId[],
}

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<JobInterface>({
    role: String,
    description: String,
    requiredExperience: {
        min: Number,
        max: Number,
    },
    requiredSkills: [ String ],
    type: String,
    eligibleCandidates: [ mongoose.Schema.Types.ObjectId ],
    interviewsCompleted: [ mongoose.Schema.Types.ObjectId ],
})

// Create a Model.
const Job = mongoose.models.Job || mongoose.model<JobInterface>('Job', schema)

export { JobInterface }

export default Job