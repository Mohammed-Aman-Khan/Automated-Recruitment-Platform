import { useImmer } from "use-immer"
import { useAppSelector } from "../../hooks/util/redux"
import Head from "next/head"
import Job from '../../components/JobSeeker/Jobs/Job'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const Jobs = () => {

    const jobs = useAppSelector( state => state.jobs )
    const [ current, setCurrent ] = useImmer( null )

    return <>
        <Head>
            <title>Job Search</title>
        </Head>
        <Grid
            item
            xs={12}
        >
            <Typography
                variant="h4"
            >
                Job Search
            </Typography>
        </Grid>
        <Grid
            item
            xs={12}
        >
            <Typography
                variant="h6"
            >
                Available Jobs
            </Typography>
        </Grid>
        <Grid
            container item
            xs={12}
            spacing={5}
        >
            {
                jobs?.map( job =>
                    <Grid
                        key={job._id}
                        item
                        xs={12} sm={6} md={4} lg={3} xl={3}
                    >
                        <Job
                            job={job}
                            setCurrent={setCurrent}
                        />
                    </Grid>
                )
            }
        </Grid>
        <Dialog
            open={Boolean( current )}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>
                Details
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setCurrent( null )}
                >
                    Close
                </Button>
                <Button
                    disableElevation
                    variant='contained'
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default Jobs