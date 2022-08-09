import { useEffect } from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import AddJobOpening from '../../components/Employer/Jobs/AddJobOpening'
import { EMPLOYER_EVENTS } from '../../util/events/employer'
import { useAppDispatch, useAppSelector } from '../../hooks/util/redux'
import { showError } from '../../util/alerts'
import { setJobs } from '../../redux/JobsSlice'
import JobOpening from '../../components/Employer/Jobs/JobOpening'

const Index = () => {

    const email = useAppSelector( state => state.auth.email )
    const jobs = useAppSelector( state => state.jobs )
    const dispatch = useAppDispatch()

    const getJobs = async () => {
        try {
            const response = await EMPLOYER_EVENTS.GET_JOBS( email )

            if ( !response.status ) {
                showError( response.error )
            }
            else {
                dispatch( setJobs( response.jobs ) )
            }
        }
        catch ( error ) {
            showError( error.message )
        }
    }

    useEffect( () => { getJobs() }, [ email ] )

    return <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <Grid
            item
            xs={12}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h4'>
                    Jobs Openings
                </Typography>
                <AddJobOpening getJobs={() => { getJobs() }} />
            </div>
        </Grid>
        <Grid item xs={12} />
        <Grid />
        <Grid
            container item
            spacing={5}
        >
            {
                jobs.map( ( job ) =>
                    <Grid
                        item
                        key={job._id}
                        xs={12} sm={6} md={4} lg={4} xl={4}
                    >
                        <JobOpening
                            job={job}
                        />
                    </Grid>
                )
            }
        </Grid>
    </>
}

export default Index