import { useCallback } from "react"
import { useAppDispatch,useAppSelector } from "../util/redux"
import { EMPLOYER_EVENTS } from "../../util/events/employer"
import { showError, showSuccess } from "../../util/alerts"
import { setQuestionSet } from "../../redux/QuestionSetSlice"

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

    const getSkills = useCallback( question => {
        EMPLOYER_EVENTS
            .GET_SKILLS( email )
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
    }, [ email, dispatch ] )

    return {
        getQuestionSet,
        addQuestion,
        getSkills,
    }
}

export default useRequests