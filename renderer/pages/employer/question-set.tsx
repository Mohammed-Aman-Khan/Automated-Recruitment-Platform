import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useRequests from '../../hooks/Employer/useRequests'
import AddQuestion from '../../components/Employer/QuestionSet/AddQuestion'

const QuestionSet = () => {

    const { getQuestionSet } = useRequests()
    const questionSet = useSelector( state => state.questionSet )

    useEffect( getQuestionSet, [] )

    return <>
        <Head>
            <title>Question Set</title>
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
                    Question Set
                </Typography>
                <AddQuestion />
            </div>
        </Grid>
        <Grid
            item
            xs={12}
        >

        </Grid>
    </>
}

export default QuestionSet