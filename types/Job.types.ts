import * as mongoose from 'mongoose'

export type EmployerEmail = string

export type Role = string

export type Description = string

export type RequiredSkill = string

export type AppliedCandidate = mongoose.Types.ObjectId

export type InterviewCompleted = mongoose.Types.ObjectId

export type InterviewRound = mongoose.Schema.Types.Mixed