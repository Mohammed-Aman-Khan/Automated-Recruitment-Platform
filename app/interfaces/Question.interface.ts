import * as mongoose from 'mongoose'
import { EmployerId, Type, Topic, Question, Answer, Points, TimeLimit } from '../types/Question.types'

export interface QuestionInterface extends mongoose.Document {
    employerId: EmployerId,
    type: Type,
    topic: Topic,
    question: Question,
    answer: Answer,
    points: Points,
    timeLimit: TimeLimit,
}