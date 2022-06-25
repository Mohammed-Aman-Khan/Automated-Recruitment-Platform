import EmployerWorker from "../../classes/EmployerWorker"

const employer = new EmployerWorker()

export const EMPLOYER_EVENTS = [
    {
        name: 'employer-get-question-set',
        callback: employer.getQuestionSet,
    },
    {
        name: 'employer-add-question',
        callback: employer.addQuestion,
    },
    {
        name: 'employer-get-jobs',
        callback: employer.getJobs,
    },
    {
        name: 'employer-add-new-job',
        callback: employer.addNewJob,
    },
]