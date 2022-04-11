import * as mongoose from 'mongoose'

export type Role = string

export type Description = string

export type RequiredExperience = {
    min: number,
    max: number,
}

export type RequiredSkill = string

export type Type = 'PART TIME' | 'FULL TIME' | 'INTERNSHIP'

export type EligibleCandidate = mongoose.Types.ObjectId

export type InterviewCompleted = mongoose.Types.ObjectId