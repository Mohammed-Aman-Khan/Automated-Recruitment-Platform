import EmployerWorker from "../../classes/EmployerWorker"

const employer = new EmployerWorker()

export const EMPLOYER_EVENTS = [
    {
        name: 'get-question-set',
        callback: employer.getQuestionSet
    },
    {
        name: 'add-question',
        callback: employer.addQuestion
    },
]