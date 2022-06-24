import { useImmer } from 'use-immer'
import { useAppSelector } from '../../hooks/util/redux'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import QuestionCard from '../../components/Employer/QuestionSet/QuestionCard'
import Stack from '@mui/material/Stack'
import { format } from '../../util/helper'

const AddQuestion = dynamic(
    () => import( '../../components/Employer/QuestionSet/AddQuestion' ),
    { ssr: false }
)

const QuestionSet = () => {

    const questionSet = useAppSelector( state => state.questionSet )
    const [ current, setCurrent ] = useImmer( null )

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
        <Grid item xs={12} />
        <Grid
            item
            xs={12}
        >
            <Grid
                container
                spacing={5}
            >
                {
                    questionSet?.map( question =>
                        <Grid
                            item
                            key={question._id}
                            xs={12} sm={12} md={6} lg={4} xl={4}
                        >
                            <QuestionCard
                                question={question}
                                onPreview={() => setCurrent( question )}
                            />
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
        <Dialog
            open={Boolean( current )}
            fullWidth
            maxWidth='sm'
        >
            <DialogContent>
                <Stack
                    direction='column'
                    gap={3}
                >
                    <div>
                        <Typography variant='h6'>Question</Typography>
                        <Typography
                            dangerouslySetInnerHTML={{ __html: current?.question }}
                        />
                    </div>
                    <div>
                        <Typography variant='h6'>Expected Answer</Typography>
                        <Typography
                            dangerouslySetInnerHTML={{ __html: current?.answer }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='button'>
                            Type - {current?.type}
                        </Typography>
                        <Typography variant='button'>
                            Topic - {current?.topic}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='button'>
                            Time Limit - {format( current?.timeLimit.minutes )}:{format( current?.timeLimit.seconds )}
                        </Typography>
                        <Typography variant='button'>
                            Points - {current?.points}
                        </Typography>
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setCurrent( null )}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default QuestionSet