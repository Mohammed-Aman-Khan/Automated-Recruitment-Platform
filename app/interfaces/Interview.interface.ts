import * as mongoose from 'mongoose'
import { CandidateId, JobId, Question, Report } from '../types/Interview.types'

export interface InterviewInterface extends mongoose.Document {
    candidateId: CandidateId,
    jobId: JobId,
    questions: Question[],
    report: Report,
}