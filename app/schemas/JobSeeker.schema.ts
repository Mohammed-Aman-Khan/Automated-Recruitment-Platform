import * as mongoose from 'mongoose'
import { JobSeekerInterface } from '../interfaces/JobSeeker.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<JobSeekerInterface>({
    name: String,
    email: String,
    dateOfBirth: String,
    qualification: [
        {
            level: String,
            yearOfCompletion: String,
            institution: String
        },
    ],
    experience: [
        {
            startdate: {
                month: Number,
                year: Number,
            },
            endDate: {
                month: Number,
                year: Number,
            },
            organization: String,
            role: String,
            description: String,
        }
    ],
    certifications: [
        {
            course: String,
            duration: {
                month: Number,
                year: Number,
            },
            issuingAuthority: String,
            mode: String,
        }
    ],
    skills: [ String ],
    currentlyEmployed: Boolean,
    interestedIn: [ String ],
})

// Create a Model.
const JobSeeker = mongoose.models.JobSeeker || mongoose.model<JobSeekerInterface>('JobSeeker', schema)

export default JobSeeker