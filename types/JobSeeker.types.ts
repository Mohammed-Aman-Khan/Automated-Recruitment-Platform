export type Name = string

export type EmailId = string

export type ResumeLink = string

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

export type Certification = string

export type Skill = string