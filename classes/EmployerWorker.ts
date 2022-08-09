import Job from "../schemas/Job.schema"
import Employer from "../schemas/Employer.schema"
import Question from "../schemas/Question.schema"
import {
    EmployerWorkerInterface,
    GetJobs,
    GetQuestionSet,
    NewJob,
} from "../interfaces/EmployerWorker.interface"
import { EmailId } from "../types/Employer.types"
import { BasicResponse } from "../interfaces/Shared.interface"
import { QuestionInterface } from "../interfaces/Question.interface"
import { convert } from "html-to-text"
import filter from "lodash/filter"
import shuffle from "lodash/shuffle"
import random from "lodash/random"
import isEqual from "lodash/isEqual"
import lowerCase from "lodash/lowerCase"

class EmployerWorker implements EmployerWorkerInterface {
    async getQuestionSet ( email: EmailId ): Promise<GetQuestionSet> {
        try {
            const result = await Question.find( { employerEmail: email } )

            return {
                status: true,
                questions: result,
            }
        } catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }

    async addQuestion (
        email: EmailId,
        question: QuestionInterface
    ): Promise<BasicResponse> {
        try {
            const newQuestion = new Question( {
                employerEmail: email,
                questionText: convert( question.question, { wordWrap: 130 } ),
                answerText: convert( question.answer, { wordWrap: 130 } ),
                ...question,
            } )

            await newQuestion.save()

            return {
                status: true,
            }
        } catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }

    async getJobs ( email: EmailId ): Promise<GetJobs> {
        try {
            const jobs = await Job.find( { employerEmail: email } )

            return {
                status: true,
                jobs: jobs,
            }
        } catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }

    async addNewJob ( email: EmailId, newJob: NewJob ): Promise<BasicResponse> {
        try {
            const allQuestions = await Question.find( { employerEmail: email } )

            const interviewRounds = []

            for (
                let roundIndex = 0;
                roundIndex < newJob.interviewRounds.length;
                roundIndex++
            ) {
                const questions = []

                for (
                    let configIndex = 0;
                    configIndex <
                    newJob.interviewRounds[ roundIndex ].questionsConfiguration.length;
                    configIndex++
                ) {
                    let matchingQuestions = shuffle(
                        filter( allQuestions, ( i ) =>
                            isEqual(
                                lowerCase( i.topic ),
                                lowerCase(
                                    newJob.interviewRounds[ roundIndex ].questionsConfiguration[
                                        configIndex
                                    ].skill
                                )
                            )
                        )
                    )

                    switch (
                    Number(
                        newJob.interviewRounds[ roundIndex ].questionsConfiguration[
                            configIndex
                        ].level
                    )
                    ) {
                        case 1:
                            questions.push( ...matchingQuestions.slice( 0, random( 3, 5 ) ) )
                            break
                        case 2:
                            questions.push( ...matchingQuestions.slice( 0, random( 6, 10 ) ) )
                            break
                        case 3:
                            questions.push( ...matchingQuestions.slice( 0, random( 11, 15 ) ) )
                            break
                    }
                }

                interviewRounds.push( {
                    name: newJob.interviewRounds[ roundIndex ].name,
                    questions,
                } )
            }

            const newJobOpening = new Job( {
                employerEmail: email,
                role: newJob.role,
                description: newJob.description,
                requiredSkills: newJob.requiredSkills,
                interviewRounds: interviewRounds,
                appliedCandidates: [],
                interviewsCompleted: [],
            } )

            await newJobOpening.save()

            return {
                status: true,
            }
        } catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }
}

export default EmployerWorker
