import { useImmer } from 'use-immer'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { DesktopDatePicker } from '@mui/x-date-pickers'

const initialExperience = {
    startDate: null,
    endDate: null,
    organization: '',
    role: '',
    description: '',
}

const Experience = ( {
    experience,
    setExperience,
} ) => {

    const [ openDialog, setOpenDialog ] = useImmer( false )
    const [ newExperience, setNewExperience ] = useImmer( initialExperience )

    const set = ( key, value ) => {
        setNewExperience( prev => {
            prev[ key ] = value
        } )
    }

    const addExperience = () => {

        setExperience( [ ...experience, newExperience ] )
        setOpenDialog( false )
        setNewExperience( initialExperience )
    }

    return <>
        <Paper
            variant='outlined'
            sx={{ borderRadius: '20px', padding: '20px', maxHeight: '500px' }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant='h6'
                >
                    Experience
                </Typography>
                <Button
                    variant='outlined'
                    onClick={() => setOpenDialog( true )}
                >
                    Add Experience
                </Button>
            </div>
            <br />
        </Paper>
        <Dialog
            open={openDialog}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle>
                Add Experience
            </DialogTitle>
            <DialogContent>
                <br />
                <Stack
                    direction='column'
                    gap={5}
                >
                    <TextField
                        fullWidth
                        variant='standard'
                        label='Organization'
                        value={newExperience.organization}
                        onChange={e => set( 'organization', e.target.value )}
                    />
                    <DesktopDatePicker
                        views={[ 'month', 'year' ]}
                        label='Start Date'
                        inputFormat='MM-yyyy'
                        value={newExperience.startDate}
                        onChange={val => set( 'startDate', val )}
                        renderInput={params => <TextField fullWidth variant='standard' {...params} />}
                    />
                    <DesktopDatePicker
                        views={[ 'month', 'year' ]}
                        label='End Date'
                        inputFormat='MM-yyyy'
                        value={newExperience.endDate}
                        onChange={val => set( 'endDate', val )}
                        renderInput={params => <TextField fullWidth variant='standard' {...params} />}
                    />
                    <TextField
                        fullWidth
                        variant='standard'
                        label='Role'
                        value={newExperience.role}
                        onChange={e => set( 'role', e.target.value )}
                    />
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={5}
                        variant='standard'
                        label='Description'
                        value={newExperience.description}
                        onChange={e => set( 'description', e.target.value )}
                    />
                </Stack>
                <br />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog( false )}
                >
                    Cancel
                </Button>
                <Button
                    variant='outlined'
                    onClick={addExperience}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default Experience