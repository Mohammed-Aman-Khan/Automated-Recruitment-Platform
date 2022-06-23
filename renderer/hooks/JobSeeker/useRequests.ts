import { useCallback } from "react"
import { useAppDispatch,useAppSelector } from "../util/redux"
import { AUTH_EVENTS } from "../../util/events/auth"
import { JOBSEEKER_EVENTS } from "../../util/events/jobseeker"
import { showError, showSuccess } from "../../util/alerts"
import { setMyDetails } from "../../redux/MyDetailsSlice"

const useRequests = () => {

    const dispatch = useAppDispatch()
    const email = useAppSelector( state => state.auth.email )

    const getMyDetails = useCallback( () => {
        JOBSEEKER_EVENTS
            .GET_MY_DETAILS( email )
            .then( response => {
                if ( !response.status ) {
                    showError( response.error )
                }
                else {
                    dispatch( setMyDetails( response.data ) )
                }
            } )
            .catch( error => showError( error.message ) )
    }, [ email, dispatch ] )

    const saveMyDetails = useCallback( data => {
        JOBSEEKER_EVENTS
            .SAVE_MY_DETAILS( email, data )
            .then( response => {
                if ( !response.status ) {
                    showError( response.error )
                }
                else {
                    getMyDetails()
                }
            } )
            .catch( error => showError( error.message ) )
    }, [ email, dispatch, getMyDetails ] )

    return {
        getMyDetails,
        saveMyDetails,
    }
}

export default useRequests