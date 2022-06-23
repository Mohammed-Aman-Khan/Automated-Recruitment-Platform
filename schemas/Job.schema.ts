import * as mongoose from 'mongoose'
import { JobInterface } from '../interfaces/Job.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<JobInterface>( {
    employerEmail: String,
    role: String,
    description: String,
    requiredSkills: [ String ],
    interviewRounds: [
        {
            name: String,
            number: Number,
            questions: [ mongoose.Schema.Types.Mixed ],
        },
    ],
    appliedCandidates: [ mongoose.Schema.Types.ObjectId ],
    interviewsCompleted: [ mongoose.Schema.Types.ObjectId ],
} )

// Create a Model.
const Job = mongoose.models.Job || mongoose.model<JobInterface>( 'Job', schema )

export default Job