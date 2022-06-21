import JobSeekerWorker from "../../classes/JobSeekerWorker"

const jobseeker = new JobSeekerWorker()

export const JOBSEEKER_EVENTS = [
    {
        name: 'save-my-details',
        callback: jobseeker.saveMyDetails,
    },
    {
        name: 'get-my-details',
        callback: jobseeker.getMyDetails,
    }
]