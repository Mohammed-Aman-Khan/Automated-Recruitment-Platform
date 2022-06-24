import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../util/redux"
import { EMPLOYER_EVENTS } from "../../util/events/employer"
import { showError, showSuccess } from "../../util/alerts"
import { setQuestionSet } from "../../redux/QuestionSetSlice"
import { setJobs } from "../../redux/JobsSlice"

const useRequests = () => {

    const dispatch = useAppDispatch()
    const email = useAppSelector( state => state.auth.email )

    const getQuestionSet = useCallback( () => {
        EMPLOYER_EVENTS
            .GET_QUESTION_SET( email )
            .then( response => {
                if ( !response.status ) {
                    showError( response.error )
                }
                else {
                    dispatch( setQuestionSet( response.questions ) )
                }
            } )
            .catch( error => showError( error.message ) )
    }, [ email, dispatch ] )

    const addQuestion = useCallback( question => {
        EMPLOYER_EVENTS
            .ADD_QUESTION( email, question )
            .then( response => {
                if ( !response.status ) {
                    showError( response.error )
                }
                else {
                    showSuccess( 'Question added' )
                    getQuestionSet()
                }
            } )
            .catch( error => showError( error.message ) )
    }, [ email, dispatch, getQuestionSet ] )

    const getJobs = useCallback( () => {
        EMPLOYER_EVENTS
            .GET_JOBS( email )
            .then( response => {
                if ( !response.status ) {
                    showError( response.error )
                }
                else {
                    dispatch( setJobs( response.jobs ) )
                }
            } )
            .catch( error => showError( error.message ) )
    }, [ email, dispatch ] )

    const addNewJob = useCallback( ( newJob, callback ) => {
        EMPLOYER_EVENTS
            .ADD_NEW_JOB( email, newJob )
            .then( response => {
                if ( !response.status ) {
                    showError( response.error )
                }
                else {
                    showSuccess( 'Job Opening added' )
                    callback()
                }
            } )
            .catch( error => showError( error.message ) )
    }, [ email, getJobs ] )

    return {
        getQuestionSet,
        addQuestion,
        getJobs,
        addNewJob,
    }
}

export default useRequests