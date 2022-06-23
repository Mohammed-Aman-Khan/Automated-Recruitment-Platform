import * as mongoose from 'mongoose'
import { Role, Description, RequiredSkill, AppliedCandidate, InterviewCompleted, EmployerEmail, InterviewRound } from '../types/Job.types'

export interface JobInterface extends mongoose.Document {
    employerEmail: EmployerEmail,
    role: Role,
    description: Description,
    requiredSkills: RequiredSkill[],
    interviewRounds: InterviewRound[],
    appliedCandidates: AppliedCandidate[],
    interviewsCompleted: InterviewCompleted[],
}