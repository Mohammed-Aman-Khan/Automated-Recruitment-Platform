import * as mongoose from 'mongoose'
import { Role, Description, RequiredExperience, RequiredSkill, Type, EligibleCandidate, InterviewCompleted } from '../types/Job.types'

export interface JobInterface extends mongoose.Document {
    role: Role,
    description: Description,
    requiredExperience: RequiredExperience,
    requiredSkills: RequiredSkill[],
    type: Type,
    eligibleCandidates: EligibleCandidate[],
    interviewsCompleted: InterviewCompleted[],
}