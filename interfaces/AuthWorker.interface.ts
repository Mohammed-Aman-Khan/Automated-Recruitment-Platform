import { EmployerInterface } from "./Employer.interface";
import { JobSeekerInterface } from "./JobSeeker.interface";
import { EmailId, Password, UserType } from "../types/Credential.types";
import { BasicResponse } from "./Shared.interface";

export interface LoginDetails {
    email: EmailId,
    password: Password,
    userType: UserType,
}

export interface RegisterDetails extends JobSeekerInterface, EmployerInterface {
    password: Password,
    userType: UserType,
}


export interface AuthWorkerInterface {

    login: (loginDetails: LoginDetails) => Promise<BasicResponse>,

    register: (registerDetails: RegisterDetails) => Promise<BasicResponse>,

}