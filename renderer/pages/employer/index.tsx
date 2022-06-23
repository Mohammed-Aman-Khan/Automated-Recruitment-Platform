import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import AddJobOpening from '../../components/Employer/Jobs/AddJobOpening'

const Index = () => {
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
                <AddJobOpening />
            </div>
        </Grid>
        <Grid item xs={12} />
        <Grid />
    </>
}

export default Index