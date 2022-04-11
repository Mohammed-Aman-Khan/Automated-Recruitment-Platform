import * as mongoose from 'mongoose'

export type EmployerId = mongoose.Types.ObjectId

export type Type = 'VERBAL' | 'NONVERBAL'

export type Topic = string

export type Question = string

export type Answer = string

export type Points = number

export type TimeLimit = number