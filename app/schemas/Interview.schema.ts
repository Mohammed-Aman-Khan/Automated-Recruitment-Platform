import * as mongoose from 'mongoose'
import { InterviewInterface } from '../interfaces/Interview.interface'

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<InterviewInterface>({
    candidateId: mongoose.Schema.Types.ObjectId,
    jobId: mongoose.Schema.Types.ObjectId,
    questions: [ mongoose.Schema.Types.ObjectId ],
    report: mongoose.Schema.Types.Mixed,
})

// Create a Model.
const Interview = mongoose.models.Interview || mongoose.model<InterviewInterface>('Interview', schema)

export default Interview