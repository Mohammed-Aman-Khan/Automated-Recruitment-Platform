import { EmailId } from "../types/JobSeeker.types"
import { BasicResponse } from "./Shared.interface"
import { QuestionInterface } from "./Question.interface"
import { Description, Role, RequiredSkill } from "../types/Job.types"
import { JobInterface } from "./Job.interface"

export interface NewJob {
    role: Role,
    description: Description,
    requiredSkills: RequiredSkill[],
    interviewRounds: Array<{
        name: string,
        questionsConfiguration: Array<{
            skill: string,
            level: 1 | 2 | 3,
        }>,
    }>,
}

export interface GetQuestionSet extends BasicResponse {
    questions?: QuestionInterface[],
}

export interface GetJobs extends BasicResponse {
    jobs?: JobInterface[]
}

export interface EmployerWorkerInterface {

    getQuestionSet: ( email: EmailId ) => Promise<GetQuestionSet>,

    addQuestion: ( email: EmailId, question: QuestionInterface ) => Promise<BasicResponse>,

    getJobs: ( email: EmailId ) => Promise<GetJobs>,

    addNewJob: ( email: EmailId, newJob: NewJob ) => Promise<BasicResponse>,

}