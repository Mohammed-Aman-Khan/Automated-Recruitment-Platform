import { RequiredExperience, RequiredSkill, Type } from "../types/Job.types";
import { CurrentlyEmployed, EmailId, Experience, Interests, Qualification, Skill } from "../types/JobSeeker.types";
import { JobInterface } from "./Job.interface";
import { JobSeekerInterface } from "./JobSeeker.interface";
import { BasicResponse } from "./Shared.interface";
import { MongoObjectId } from "../types/Shared.types";

export interface JobFilter {
    type?: Type[],
    requiredExperience?: RequiredExperience,
    requiredSkills?: RequiredSkill[],
}

export interface GetJobsResponse extends BasicResponse {
    jobs: JobInterface[],
}

export interface GetMyDetailsResponse extends BasicResponse {
    data: JobSeekerInterface,
}

export interface JobSeekerWorkerInterface {

    getJobs: (authId: MongoObjectId, filter?: JobFilter) => Promise<GetJobsResponse>,

    getMyDetails: (authId: MongoObjectId, email: EmailId) => Promise<GetMyDetailsResponse>,

    addQualification: (authId: MongoObjectId, newQualification: Qualification) => Promise<BasicResponse>,

    removeQualification: (authId: MongoObjectId, index: number) => Promise<BasicResponse>,

    addExperience: (authId: MongoObjectId, newExperience: Experience) => Promise<BasicResponse>,

    removeExperience: (authId: MongoObjectId, index: number) => Promise<BasicResponse>,

    addSkill: (authId: MongoObjectId, newSkill: Skill) => Promise<BasicResponse>,

    removeSkill: (authId: MongoObjectId, index: number) => Promise<BasicResponse>,

    updateInterests: (authId: MongoObjectId, updatedInterests: Interests[]) => Promise<BasicResponse>,

    setCurrentlyEmployed: (authId: MongoObjectId, currentlyEmployed: CurrentlyEmployed) => Promise<BasicResponse>,

    applyForJob: (authId: MongoObjectId, jobId: MongoObjectId) => Promise<BasicResponse>,

}