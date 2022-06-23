import { EmailId } from "../types/JobSeeker.types"
import { BasicResponse } from "./Shared.interface"
import { QuestionInterface } from "./Question.interface"
import { Collection } from "lodash"

export interface GetQuestionSet extends BasicResponse {
    questions?: QuestionInterface[],
}

export interface GetSkills extends BasicResponse {
    skills?: Collection<any>[],
}

export interface EmployerWorkerInterface {

    getQuestionSet: ( email: EmailId ) => Promise<GetQuestionSet>,

    addQuestion: ( email: EmailId, question: QuestionInterface ) => Promise<BasicResponse>,

    getSkills: ( email: EmailId ) => Promise<GetSkills>,

}