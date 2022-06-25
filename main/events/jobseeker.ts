import JobSeekerWorker from "../../classes/JobSeekerWorker"

const jobseeker = new JobSeekerWorker()

export const JOBSEEKER_EVENTS = [
    {
        name: 'jobseeker-get-jobs',
        callback: jobseeker.getJobs,
    },
    {
        name: 'jobseeker-save-my-details',
        callback: jobseeker.saveMyDetails,
    },
    {
        name: 'jobseeker-get-my-details',
        callback: jobseeker.getMyDetails,
    }
]