import { useImmer } from 'use-immer'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
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

const initialQualification = {
    level: '',
    yearOfCompletion: '',
    institution: '',
}

const Qualification = ( {
    qualifications,
    setQualifications,
} ) => {

    const [ openDialog, setOpenDialog ] = useImmer( false )
    const [ newQualification, setNewQualification ] = useImmer( initialQualification )

    const set = ( key, value ) => {
        setNewQualification( prev => {
            prev[ key ] = value
        } )
    }

    const addQualification = () => {
        if ( !newQualification.level ) {
            showError( 'Qualification Level required' )
            return
        }
        if ( !newQualification.yearOfCompletion ) {
            showError( 'Year of Completion required' )
            return
        }
        if ( !/^\d{4}$/.test( newQualification.yearOfCompletion ) ) {
            showError( 'Invalid Year of Completion' )
            return
        }
        if ( !newQualification.institution ) {
            showError( 'Institution required' )
            return
        }

        setQualifications( [ ...qualifications, newQualification ] )
        setOpenDialog( false )
        setNewQualification( initialQualification )
    }

    return <>
        <Paper
            variant='outlined'
            sx={{ borderRadius: '20px', padding: '20px', }}
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
                    Qualifications
                </Typography>
                <Button
                    variant='outlined'
                    onClick={() => setOpenDialog( true )}
                >
                    Add Qualification
                </Button>
            </div>
            <br />
            {
                qualifications?.map( ( {
                    level,
                    yearOfCompletion,
                    institution,
                }, index ) =>
                    <Fragment key={`${ institution } - ${ level } - ${ yearOfCompletion }`}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <Typography variant='body1'>
                                    <strong>{level}</strong>
                                </Typography>
                                <Typography variant='button'>
                                    <em>
                                        {String( institution ).split( ' ' ).map( capitalize ).join( ' ' )}
                                    </em>
                                </Typography>
                                <br />
                                <Typography variant='subtitle2'>
                                    Year of Completion - {yearOfCompletion}
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
                            index + 1 === qualifications.length
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
                Add Qualification
            </DialogTitle>
            <DialogContent>
                <br />
                <Stack
                    direction='column'
                    gap={5}
                >
                    <FormControl
                        fullWidth
                        variant='standard'
                    >
                        <InputLabel>Qualification Level</InputLabel>
                        <Select
                            fullWidth
                            value={newQualification.level}
                            onChange={e => set( 'level', e.target.value )}
                        >
                            {
                                [
                                    'Primary School',
                                    'High School',
                                    'Diploma',
                                    'Graduation',
                                    'Post Graduation',
                                    'Doctorate',
                                ]
                                    .map( level =>
                                        <MenuItem
                                            key={level}
                                            value={level}
                                        >
                                            {level}
                                        </MenuItem>
                                    )
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        type='number'
                        variant='standard'
                        label='Year of Completion'
                        value={newQualification.yearOfCompletion}
                        onChange={e => set( 'yearOfCompletion', e.target.value )}
                    />
                    <TextField
                        fullWidth
                        variant='standard'
                        label='Institution'
                        value={newQualification.institution}
                        onChange={e => set( 'institution', e.target.value )}
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
                    onClick={addQualification}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default Qualification