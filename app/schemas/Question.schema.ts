import * as mongoose from 'mongoose'

// Interface representing a document in MongoDB.
interface QuestionInterface extends mongoose.Document {
    employerId: mongoose.Types.ObjectId,
    type: 'VERBAL' | 'NONVERBAL',
    topic: string,
    question: string,
    answer: string,
    points: number,
    timeLimit: Number, // in ms
}

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<QuestionInterface>({
    employerId: mongoose.Schema.Types.ObjectId,
    type: String,
    topic: String,
    question: String,
    answer: String,
    points: Number,
    timeLimit: Number,
})

// Create a Model.
const Question = mongoose.models.Question || mongoose.model<QuestionInterface>('Question', schema)

export { QuestionInterface }

export default Question