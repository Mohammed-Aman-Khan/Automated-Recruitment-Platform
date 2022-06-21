import * as mongoose from 'mongoose'
import { Name, EmailId, Qualification, Experience, Certification, Skill, ResumeLink } from '../types/JobSeeker.types'

export interface JobSeekerInterface extends mongoose.Document {
    name: Name,
    email: EmailId,
    qualifications?: Qualification[],
    resumeLink: ResumeLink,
    experience?: Experience[],
    certifications?: Certification[],
    skills?: Skill[],
}