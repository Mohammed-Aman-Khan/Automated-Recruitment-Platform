import * as mongoose from 'mongoose'
import { QuestionInterface } from '../interfaces/Question.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<QuestionInterface>( {
    employerEmail: String,
    type: String,
    topic: String,
    question: String,
    answer: String,
    points: Number,
    timeLimit: Number,
} )

// Create a Model.
const Question = mongoose.models.Question || mongoose.model<QuestionInterface>( 'Question', schema )

export default Question