import * as mongoose from 'mongoose'
import { Name, EmailId, DateOfBirth, Qualification, Experience, Certification, Skill, CurrentlyEmployed, Interests } from '../types/JobSeeker.types'

export interface JobSeekerInterface extends mongoose.Document {
    name: Name,
    email: EmailId,
    dateOfBirth: DateOfBirth,
    qualification?: Qualification[],
    experience?: Experience[],
    certifications?: Certification[],
    skills?: Skill[],
    currentlyEmployed?: CurrentlyEmployed,
    interests?: Interests[],
}