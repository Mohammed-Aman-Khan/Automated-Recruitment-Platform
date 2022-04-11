import * as mongoose from 'mongoose'
import { JobInterface } from '../interfaces/Job.interface'

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

export default Job