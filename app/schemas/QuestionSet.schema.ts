import * as mongoose from 'mongoose'

// Interface representing a document in MongoDB.
interface QuestionSetInterface extends mongoose.Document {
    employerId: mongoose.Types.ObjectId,
    type: 'VERBAL' | 'NONVERBAL',
    topic: string,
    question: string,
    answer: string,
    points: number,
    timeLimit: Number, // in ms
}

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<QuestionSetInterface>({
    employerId: mongoose.Schema.Types.ObjectId,
    type: String,
    topic: String,
    question: String,
    answer: String,
    points: Number,
    timeLimit: Number,
})

// Create a Model.
const QuestionSet = mongoose.models.QuestionSet || mongoose.model<QuestionSetInterface>('QuestionSet', schema)

export { QuestionSetInterface }

export default QuestionSet