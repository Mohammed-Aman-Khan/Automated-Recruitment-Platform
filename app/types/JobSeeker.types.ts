import * as mongoose from 'mongoose'

export type Name = string

export type EmailId = string

export type DateOfBirth = string

export type Qualification = {
    level: String,
    yearOfCompletion: string,
    institution: string,
}

export type Experience = {
    startdate: {
        month: number,
        year: number,
    },
    endDate: {
        month: number,
        year: number,
    },
    organization: string,
    role: string,
    description: string,
}

export type Certification = {
    course: string,
    duration: {
        month: number,
        year: number,
    },
    issuingAuthority: string,
    mode: 'ONLINE' | 'OFFLINE'
}

export type Skill = string

export type CurrentlyEmployed = boolean

export type Interests = 'PART TIME' | 'FULL TIME' | 'INTERNSHIP'