import * as mongoose from 'mongoose'

// Interface representing a document in MongoDB.
interface InterviewInterface extends mongoose.Document {
    candidateId: mongoose.Types.ObjectId,
    jobId: mongoose.Types.ObjectId,
    questions: mongoose.Types.ObjectId[],
    report: mongoose.Schema.Types.Mixed,
}

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<InterviewInterface>({
    candidateId: mongoose.Schema.Types.ObjectId,
    jobId: mongoose.Schema.Types.ObjectId,
    questions: [ mongoose.Schema.Types.ObjectId ],
    report: mongoose.Schema.Types.Mixed,
})

// Create a Model.
const Interview = mongoose.models.Interview || mongoose.model<InterviewInterface>('Interview', schema)

export { InterviewInterface }

export default Interview