import { GetJobsResponse, GetMyDetailsResponse, JobFilter, JobSeekerWorkerInterface } from '../interfaces/JobSeekerWorker.interface'
import { BasicResponse } from '../interfaces/Shared.interface';
import JobSeeker from '../schemas/JobSeeker.schema'
import { EmailId } from '../types/Credential.types'
import { CurrentlyEmployed, Experience, Interests, Qualification, Skill } from '../types/JobSeeker.types';
import { MongoObjectId } from '../types/Shared.types'
import { JobSeekerInterface } from "../interfaces/JobSeeker.interface"


class JobSeekerWorker implements JobSeekerWorkerInterface {

    async getJobs (authId: MongoObjectId, filter?: JobFilter): Promise<GetJobsResponse> {
        try {
            return {
                status: true,
                jobs: []
    
            }            
        } catch (error) {
            return {
                status: false,
                error: error.message,
                jobs: []
            }
        }
    }

    async getMyDetails (authId: MongoObjectId, email: EmailId): Promise<GetMyDetailsResponse> {
        try {
            const result = await JobSeeker.findOne({ _id: authId })
            return {
                status:true,
                data:result,
            } 
        } catch (error) {
            return {
                status:false,
                error:error.message,
            }
        }
    }

    async addQualification (authId: MongoObjectId, newQualification: Qualification): Promise<BasicResponse> {
        try {
            return {
                error: "",
                status: true
            }
        } catch (error) {
            return {
                error: error.message,
                status: false
            }
        }
    }

    async removeQualification (authId: MongoObjectId, index: number): Promise<BasicResponse> {
        try {
            return {
                error: '',
                status: true
            }
        } catch (error) {
            return{
                error: error.message,
                status: false
            }
        }
    }

    async addExperience (authId: MongoObjectId, newExperience: Experience): Promise<BasicResponse> {
        try {
            return {
                error: '',
                status: true
            }
        } catch (error) {
            return {
                error: error.message,
                status: false
            }
        }
    }

    async removeExperience (authId: MongoObjectId, index: number): Promise<BasicResponse> {
        try {
            return {
                status: true,
                error: ''
            }
        } catch (error) {
            return {
                status: false,
                error: error.message
            }
        }
    }

    async addSkill (authId: MongoObjectId, newSkill: Skill): Promise<BasicResponse> {
        try {
            return {
                status: true,
                error: ''
            }
        } catch (error) {
            return {
                error: error.message,
                status: false
            }
        }
    }

    async removeSkill (authId: MongoObjectId, index: number): Promise<BasicResponse> {
        try {
            return {
                status: true,
                error: ''
            }
        } catch (error) {
            return {
                status: false,
                error: error.message
            }
        }
    }

    async updateInterests (authId: MongoObjectId, updatedInterests: Interests[]): Promise<BasicResponse> {
        try {
            return {
                status: true,
                error: ''
            }
        } catch (error) {
            return  {
                status: false,
                error: error.message
            }
        }
    }

    async setCurrentlyEmployed (authId: MongoObjectId, currentlyEmployed: CurrentlyEmployed): Promise<BasicResponse> {
        try {
            return {
                status: true,
                error: ''
            }
        } catch (error) {
            return  {
                status: false,
                error: error.message
            }
        }
    }

    async applyForJob (authId: MongoObjectId, jobId: MongoObjectId): Promise<BasicResponse> {
        try {
            return {
                status: true,
                error: ''
            }
        } catch (error) {
            return  {
                status: false,
                error: error.message
            }
        }
    }

}

export default JobSeekerWorker