import { EmailId } from "../types/JobSeeker.types"
import { BasicResponse } from "./Shared.interface"
import { QuestionInterface } from "./Question.interface"

export interface GetQuestionSet extends BasicResponse {
    questions?: QuestionInterface[],
}

export interface EmployerWorkerInterface {

    getQuestionSet: ( email: EmailId ) => Promise<GetQuestionSet>,

    addQuestion: ( email: EmailId, question: QuestionInterface ) => Promise<BasicResponse>,

}