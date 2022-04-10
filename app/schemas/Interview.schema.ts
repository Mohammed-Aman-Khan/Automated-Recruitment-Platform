import * as mongoose from 'mongoose'

// Interface representing a document in MongoDB.
interface InterviewInterface extends mongoose.Document {

}

// Schema corresponding to the document interface.
const schema = new mongoose.Schema<InterviewInterface>({

})

// Create a Model.
const Interview = mongoose.models.Interview || mongoose.model<InterviewInterface>('Interview', schema)

export { InterviewInterface }

export default Interview