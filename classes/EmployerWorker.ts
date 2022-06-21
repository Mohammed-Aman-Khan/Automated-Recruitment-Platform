import Employer from "../schemas/Employer.schema"
import Question from "../schemas/Question.schema"
import { EmployerWorkerInterface, GetQuestionSet } from '../interfaces/EmployerWorker.interface'
import { EmailId } from "../types/Employer.types"
import { BasicResponse } from "../interfaces/Shared.interface"
import { QuestionInterface } from "../interfaces/Question.interface"

class EmployerWorker implements EmployerWorkerInterface {

    async getQuestionSet ( email: EmailId ): Promise<GetQuestionSet> {
        try {
            const result = await Question.find( { employerEmail: email } )

            return {
                status: true,
                questions: result,
            }
        }
        catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }

    async addQuestion ( email: EmailId, question: QuestionInterface ): Promise<BasicResponse> {
        try {
            const newQuestion = new Question( question )

            await newQuestion.save()

            return {
                status: true,
            }
        }
        catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }

}

export default EmployerWorker