import * as mongoose from 'mongoose'
import { JobSeekerInterface } from '../interfaces/JobSeeker.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<JobSeekerInterface>( {
    name: String,
    email: String,
    resumeLink: String,
    qualifications: [
        {
            level: String,
            yearOfCompletion: String,
            institution: String
        },
    ],
    experience: [
        {
            startdate: String,
            endDate: String,
            organization: String,
            role: String,
            description: String,
        }
    ],
    certifications: [ String ],
    skills: [ String ],
} )

// Create a Model.
const JobSeeker = mongoose.models.JobSeeker || mongoose.model<JobSeekerInterface>( 'JobSeeker', schema )

export default JobSeeker