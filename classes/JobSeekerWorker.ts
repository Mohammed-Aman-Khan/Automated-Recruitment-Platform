import { GetJobsResponse, GetMyDetailsResponse, JobFilter, JobSeekerWorkerInterface } from '../interfaces/JobSeekerWorker.interface'
import { BasicResponse } from '../interfaces/Shared.interface'
import JobSeeker from '../schemas/JobSeeker.schema'
import { EmailId } from '../types/Credential.types'
import { CurrentlyEmployed, Experience, Interests, Qualification, Skill } from '../types/JobSeeker.types'
import { MongoObjectId } from '../types/Shared.types'
import { JobSeekerInterface } from "../interfaces/JobSeeker.interface"


class JobSeekerWorker implements JobSeekerWorkerInterface {

    async getJobs ( authId: MongoObjectId, filter?: JobFilter ): Promise<GetJobsResponse> {
        try {
            return {
                status: true,
                jobs: []

            }
        } catch ( error ) {
            return {
                status: false,
                error: error.message,
                jobs: []
            }
        }
    }

    async getMyDetails ( authId: MongoObjectId, email: EmailId ): Promise<GetMyDetailsResponse> {
        try {
            const result = await JobSeeker.findOne( { _id: authId } )
            return {
                status: true,
                data: result,
            }
        } catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }
}

export default JobSeekerWorker