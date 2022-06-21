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
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import { showError } from '../../../util/alerts'
import { Fragment } from 'react'
import capitalize from 'lodash/capitalize'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const initialExperience = {
    startDate: '',
    endDate: '',
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
        if ( !newExperience.organization ) {
            showError( 'Organization required' )
            return
        }
        if ( !newExperience.startDate ) {
            showError( 'Start Date required' )
            return
        }
        if ( !newExperience.endDate ) {
            showError( 'End Date required' )
            return
        }
        if ( !newExperience.role ) {
            showError( 'Role required' )
            return
        }
        if ( !newExperience.description ) {
            showError( 'Description required' )
            return
        }

        setExperience( [ ...experience, newExperience ] )
        setOpenDialog( false )
        setNewExperience( initialExperience )
    }

    return <>
        <Paper
            variant='outlined'
            sx={{ borderRadius: '20px', padding: '20px' }}
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
            {
                experience?.map( ( {
                    startDate,
                    endDate,
                    organization,
                    role,
                    description,
                }, index ) =>
                    <Fragment key={`${ role } - ${ organization }`}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <Typography variant='body1'>
                                    <strong>{role}</strong> at <em>{organization}</em>
                                </Typography>
                                <Typography variant='button'>
                                    <strong>{startDate}</strong> to <strong>{endDate}</strong>
                                </Typography>
                                <br />
                                <Typography>
                                    {description}
                                </Typography>
                            </div>
                            <div>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                &nbsp;&nbsp;
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                        {
                            index + 1 === experience.length
                                ?
                                <></>
                                :
                                <>
                                    <br />
                                    <Divider />
                                    <br />
                                </>
                        }
                    </Fragment>
                )
            }
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
                    <TextField
                        fullWidth
                        variant='standard'
                        label='Start Date (MM-YYYY)'
                        value={newExperience.startDate}
                        onChange={val => set( 'startDate', val )}
                    />
                    <TextField
                        fullWidth
                        variant='standard'
                        label='End Date (MM-YYYY)'
                        value={newExperience.endDate}
                        onChange={val => set( 'endDate', val )}
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