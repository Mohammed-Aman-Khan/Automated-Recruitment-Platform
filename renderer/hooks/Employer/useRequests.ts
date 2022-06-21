import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { EMPLOYER_EVENTS } from "../../util/events/employer"
import { showError, showSuccess } from "../../util/alerts"
import { setQuestionSet } from "../../redux/QuestionSetSlice"

const useRequests = () => {

    const dispatch = useDispatch()
    const email = useSelector( state => state.auth.email )

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

    return {
        getQuestionSet,
        addQuestion,
    }
}

export default useRequests