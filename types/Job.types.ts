import * as mongoose from 'mongoose'
import { Question } from './Question.types'

export type EmployerEmail = string

export type Role = string

export type Description = string

export type RequiredSkill = string

export type AppliedCandidate = mongoose.Types.ObjectId

export type InterviewCompleted = mongoose.Types.ObjectId

export type InterviewRound = {
    name: string,
    questions: Question[]
}