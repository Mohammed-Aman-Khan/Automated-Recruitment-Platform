import * as mongoose from 'mongoose'
import { Name, EmailId, DateOfBirth, Qualification, Experience, Certification, Skill, CurrentlyEmployed, Interests, ResumeLink } from '../types/JobSeeker.types'

export interface JobSeekerInterface extends mongoose.Document {
    name: Name,
    email: EmailId,
    dateOfBirth: DateOfBirth,
    qualifications?: Qualification[],
    resumeLink: ResumeLink,
    experience?: Experience[],
    certifications?: Certification[],
    skills?: Skill[],
    currentlyEmployed?: CurrentlyEmployed,
    interests?: Interests[],
}