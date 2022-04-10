import * as mongoose from 'mongoose'

interface QualificationInterface {
    level: string,
    yearOfCompletion: string,
    institution: string
}

interface ExperienceInterface {
    startdate: {
        month: number,
        year: number,
    },
    endDate: {
        month: number,
        year: number,
    },
    organization: string,
    role: string,
    description: string,
}

interface CertificationInterface {
    course: string,
    duration: {
        month: number,
        year: number,
    },
    issuingAuthority: string,
    mode: 'ONLINE' | 'OFFLINE'
}

// Interface representing a document in MongoDB.
interface JobSeekerInterface extends mongoose.Document {
    name: string,
    email: string,
    dateOfBirth: string,
    qualification: QualificationInterface[],
    experience: ExperienceInterface[],
    certifications: CertificationInterface[],
    skills: string[],
    currentlyEmployed: boolean,
    interestedIn: 'PART TIME' | 'FULL TIME' | 'INTERNSHIP'[]
}

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

export { JobSeekerInterface }

export default JobSeeker