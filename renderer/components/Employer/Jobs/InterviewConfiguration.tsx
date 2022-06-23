import { useImmer } from 'use-immer'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const InterviewConfiguration = ( {
    skills,
    interviewRounds,
    setInterviewRounds,
} ) => {

    const [ openDialog, setOpenDialog ] = useImmer( false )
    const [ roundName, setRoundName ] = useImmer( '' )

    const addRound = () => {
        setInterviewRounds( prev => [ ...prev, { name: roundName } ] )
        setOpenDialog( false )
        setRoundName( '' )
    }

    return <>
        <Stack
            direction='column'
            gap={5}
        >
            <div>
                <Button
                    disableElevation
                    variant='contained'
                    onClick={() => setOpenDialog( true )}
                >
                    Add New Round
                </Button>
            </div>
            <div>
                {
                    interviewRounds.length
                        ?
                        interviewRounds
                            .map( ( {
                                name,
                                questionsConfiguration,
                            }, index ) =>
                                <Accordion
                                    key={name}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography
                                            variant='h6'
                                        >
                                            Round {index + 1} - <em>{name}</em>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                    </AccordionDetails>
                                </Accordion>
                            )
                        :
                        <></>
                }
            </div>
        </Stack>
        <Dialog
            open={openDialog}
            fullWidth
        >
            <DialogTitle>
                New Interview Round
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    variant='filled'
                    label='Round Name'
                    value={roundName}
                    onChange={e => setRoundName( e.target.value )}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog( false )}
                >
                    Cancel
                </Button>
                <Button
                    onClick={addRound}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default InterviewConfiguration