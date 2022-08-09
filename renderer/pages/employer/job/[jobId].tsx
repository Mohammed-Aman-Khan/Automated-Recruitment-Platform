import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/util/redux'
import find from 'lodash/find'

const Job = () => {

    const router = useRouter()
    const { jobId } = router.query
    const [ job, setJob ] = useState( null )
    const jobs = useAppSelector( state => state.jobs )

    useEffect( () => {
        setJob( find( jobs, { _id: jobId } ) )
    }, [] )

    useEffect( () => { console.log( jobId ) }, [ jobId ] )

    return <>
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <IconButton size='small' color='default' onClick={() => router.back()}>
                <ArrowBackIcon />
            </IconButton>
        </div>
        <Grid
            container
        >

        </Grid>
    </>
}

export default Job