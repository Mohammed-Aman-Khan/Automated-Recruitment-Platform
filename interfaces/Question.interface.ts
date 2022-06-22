import * as mongoose from 'mongoose'
import { EmailId, Type, Topic, Question, Answer, Points, TimeLimit } from '../types/Question.types'

export interface QuestionInterface extends mongoose.Document {
    employerEmail: EmailId,
    type: Type,
    topic: Topic,
    question: Question,
    questionText: Question,
    answer: Answer,
    answerText: Answer,
    points: Points,
    timeLimit: TimeLimit,
}