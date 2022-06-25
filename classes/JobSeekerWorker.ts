import { GetJobsResponse, GetMyDetailsResponse, JobFilter, JobSeekerWorkerInterface } from '../interfaces/JobSeekerWorker.interface'
import { BasicResponse } from '../interfaces/Shared.interface'
import JobSeeker from '../schemas/JobSeeker.schema'
import { EmailId } from '../types/Credential.types'
import { JobSeekerInterface } from "../interfaces/JobSeeker.interface"
import Job from '../schemas/Job.schema'

class JobSeekerWorker implements JobSeekerWorkerInterface {

    async getJobs ( filter?: JobFilter ): Promise<GetJobsResponse> {
        try {
            const result = await Job.find( filter || {} )

            return {
                status: true,
                jobs: result,
            }
        }
        catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }

    async getMyDetails ( email: EmailId ): Promise<GetMyDetailsResponse> {
        try {
            const result = await JobSeeker.findOne( { email }, { _id: 0, __v: 0 } )
            return {
                status: true,
                data: result,
            }
        }
        catch ( error ) {
            return {
                status: false,
                error: error.message,
            }
        }
    }

    async saveMyDetails ( email: EmailId, details: JobSeekerInterface ): Promise<BasicResponse> {
        try {
            const updateResult = await JobSeeker.updateOne(
                { email },
                {
                    name: details.name,
                    email: details.email,
                    qualifications: details.qualifications,
                    resumeLink: details.resumeLink,
                    experience: details.experience,
                    certifications: details.certifications,
                    skills: details.skills,
                }
            )

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

export default JobSeekerWorker