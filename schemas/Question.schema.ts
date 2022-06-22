import * as mongoose from 'mongoose'
import { QuestionInterface } from '../interfaces/Question.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<QuestionInterface>( {
    employerEmail: String,
    type: String,
    topic: String,
    question: String,
    questionText: String,
    answer: String,
    answerText: String,
    points: Number,
    timeLimit: {
        minutes: Number,
        seconds: Number,
    },
} )

// Create a Model.
const Question = mongoose.models.Question || mongoose.model<QuestionInterface>( 'Question', schema )

export default Question