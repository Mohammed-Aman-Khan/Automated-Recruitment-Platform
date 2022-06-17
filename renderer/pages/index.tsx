import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default () => {

    const router = useRouter()

    return <>
        <Head>
            <title>
                Automated Recruitment Platform
            </title>
        </Head>
        <Grid
            container
            alignItems='center'
            justifyContent='space-evenly'
            style={{ height: '100%', padding: 30, }}
        >
            <Grid
                container item
                xs={10} sm={10} md={10} lg={5} xl={5}
            >
                <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: 50 }}>
                    Joboryx
                </Typography>
                <Grid
                    container item
                    justifyContent="space-between"
                    alignContent="flex-start"
                >
                    <Grid
                        item
                    >
                        <Typography variant="h4">For Companies</Typography>
                        <br /><br />
                        <Button variant="contained" color="primary" disableElevation onClick={() => router.push( '/login/employer' )}>Start Hiring</Button>
                    </Grid>
                    <Grid
                        item
                    >
                        <Typography variant="h4">For Job Seekers</Typography>
                        <br /><br />
                        <Button variant="contained" color="primary" disableElevation onClick={() => router.push( '/login/jobseeker' )}>Get Hired</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container item
                xs={0} sm={0} md={0} lg={5} xl={5}
            >
                <img
                    alt="Illustration"
                    src="/svgs/landing-page.svg"
                    style={{ width: '100%', height: 'auto' }}
                />
            </Grid>
        </Grid>
    </>
}