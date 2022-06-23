import useRequests from '../../../hooks/Employer/useRequests'
import { useImmer } from 'use-immer'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import JobDescription from './JobDescription'
import InterviewConfiguration from './InterviewConfiguration'
import ReviewAndFinalize from './ReviewAndFinalize'
import { showError } from '../../../util/alerts'

const steps = [ 'Job Description', 'Interview Configuration', 'Review & Finalize' ]

const AddJobOpening = () => {

    const [ openDialog, setOpenDialog ] = useImmer( false )
    const [ activeStep, setActiveStep ] = useImmer( 0 )

    const [ role, setRole ] = useImmer( '' )
    const [ description, setDescription ] = useImmer( '' )
    const [ skills, setSkills ] = useImmer( [] )
    const [ interviewRounds, setInterviewRounds ] = useImmer( [] )

    const getStep = stepNumber => {
        switch ( stepNumber + 1 ) {
            case 1:
                return <JobDescription
                    {...{
                        role, setRole,
                        description, setDescription,
                        skills, setSkills,
                    }}
                />
            case 2:
                return <InterviewConfiguration
                    interviewRounds={interviewRounds}
                    setInterviewRounds={setInterviewRounds}
                />
            case 3:
                return <ReviewAndFinalize
                    {...{
                        role,
                        description,
                        skills,
                        interviewRounds,
                    }}
                />
            default:
                return <></>
        }
    }
    const next = activeStep => {
        switch ( activeStep + 1 ) {
            case 1:
                if ( !role ) {
                    showError( 'Job Role required' )
                    return
                }
                if ( !description ) {
                    showError( 'Job Description required' )
                    return
                }
                if ( !skills.length ) {
                    showError( 'Add Required Skills' )
                    return
                }
                setActiveStep( activeStep + 1 )
                break
            case 2:
                setActiveStep( activeStep + 1 )
                break
            case 3:
                setActiveStep( 0 )
                break
            default:
                return
        }
    }

    return <>
        <Button
            size='large'
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog( true )}
        >
            Add New Job Opening
        </Button>
        <Dialog
            open={openDialog}
            fullWidth
            fullScreen
        >
            <DialogTitle>
                New Job Opening
            </DialogTitle>
            <DialogContent>
                <Stepper nonLinear activeStep={activeStep}>
                    {
                        steps
                            .map( stepLabel =>
                                <Step key={stepLabel}>
                                    <StepLabel color="inherit">
                                        {stepLabel}
                                    </StepLabel>
                                </Step>
                            )
                    }
                </Stepper>
                <br />
                {getStep( activeStep )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog( false )}
                >
                    Cancel
                </Button>
                <Button>
                    Reset
                </Button>
                {
                    activeStep > 0 &&
                    <Button
                        variant='outlined'
                        onClick={() => setActiveStep( activeStep - 1 )}
                    >
                        Back
                    </Button>
                }
                <Button
                    variant='outlined'
                    onClick={() => next( activeStep )}
                >
                    {activeStep + 1 === steps.length ? 'Finish' : 'Next'}
                </Button>
                <Button
                    variant='contained'>
                    Add Job Opening
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default AddJobOpening