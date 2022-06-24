import { RequiredSkill, } from "../types/Job.types"
import { EmailId } from "../types/JobSeeker.types"
import { JobInterface } from "./Job.interface"
import { JobSeekerInterface } from "./JobSeeker.interface"
import { BasicResponse } from "./Shared.interface"
import { MongoObjectId } from "../types/Shared.types"

export interface JobFilter {
    requiredSkills?: RequiredSkill[],
}

export interface GetJobsResponse extends BasicResponse {
    jobs?: JobInterface[],
}

export interface GetMyDetailsResponse extends BasicResponse {
    data?: JobSeekerInterface,
}

export interface JobSeekerWorkerInterface {

    getJobs: ( filter?: JobFilter ) => Promise<GetJobsResponse>,

    getMyDetails: ( email: EmailId ) => Promise<GetMyDetailsResponse>,

    saveMyDetails: ( email: EmailId, details: JobSeekerInterface ) => Promise<BasicResponse>,

    // applyForJob: ( jobId: MongoObjectId ) => Promise<BasicResponse>,

}