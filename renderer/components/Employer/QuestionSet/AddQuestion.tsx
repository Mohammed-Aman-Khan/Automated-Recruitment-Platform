import useRequests from '../../../hooks/Employer/useRequests'
import { useImmer } from 'use-immer'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import dynamic from 'next/dynamic'
import { showError } from '../../../util/alerts'

const RTE = dynamic(
    () => import( '../../Shared/RTE' ),
    { ssr: false }
)

const AddQuestion = () => {

    const { addQuestion } = useRequests()
    const [ openDialog, setOpenDialog ] = useImmer( false )
    const [ type, setType ] = useImmer( '' )
    const [ topic, setTopic ] = useImmer( '' )
    const [ question, setQuestion ] = useImmer( '' )
    const [ answer, setAnswer ] = useImmer( '' )
    const [ points, setPoints ] = useImmer( null )
    const [ { minutes, seconds }, setTimeLimit ] = useImmer( {
        minutes: null,
        seconds: null,
    } )

    const addNewQuestion = () => {
        if ( !type ) {
            showError( 'Question Type required' )
            return
        }
        if ( !topic ) {
            showError( 'Question Type required' )
            return
        }
        if ( !question ) {
            showError( 'Question required' )
            return
        }
        if ( !answer ) {
            showError( 'Answer required' )
            return
        }
        if ( !points ) {
            showError( 'Points required' )
            return
        }
        if ( isNaN( minutes ) || isNaN( seconds ) ) {
            showError( 'Time Limit required' )
            return
        }

        addQuestion( {
            type,
            topic,
            question,
            answer,
            points,
            timeLimit: {
                minutes,
                seconds,
            },
        } )
        reset()
    }
    const reset = () => {
        setType( '' )
        setTopic( '' )
        setQuestion( '' )
        setAnswer( '' )
        setPoints( null )
        setTimeLimit( {
            minutes: null,
            seconds: null,
        } )
    }

    return <>
        <Button
            size='large'
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog( true )}
        >
            Add New Question
        </Button>
        <Dialog
            open={openDialog}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>
                New Question
            </DialogTitle>
            <DialogContent>
                <Stack
                    direction='column'
                    gap={5}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <FormControl
                            sx={{ width: '48%' }}
                            variant='standard'
                        >
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={type}
                                onChange={e => setType( e.target.value )}
                            >
                                {
                                    [
                                        'ORAL',
                                        'WRITTEN'
                                    ]
                                        .map( type =>
                                            <MenuItem
                                                key={type}
                                                value={type}
                                            >
                                                {type}
                                            </MenuItem>
                                        )
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ width: '48%' }}
                            variant='standard'
                            label='Topic'
                            value={topic}
                            onChange={e => setTopic( e.target.value )}
                        />
                    </div>
                    <div>
                        <Typography>Question</Typography>
                        <RTE
                            value={question}
                            onChange={val => setQuestion( val )}
                        />
                    </div>
                    <div>
                        <Typography>Answer</Typography>
                        <RTE
                            value={answer}
                            onChange={val => setAnswer( val )}
                        />
                    </div>
                    <FormControl
                        fullWidth
                        variant='standard'
                    >
                        <InputLabel>Points</InputLabel>
                        <Select
                            value={points}
                            onChange={e => setPoints( Number( e.target.value ) )}
                        >
                            {
                                Array.from( { length: 10 }, ( _, i ) => i + 1 )
                                    .map( point =>
                                        <MenuItem
                                            key={point}
                                            value={point}
                                        >
                                            {point}
                                        </MenuItem>
                                    )
                            }
                        </Select>
                    </FormControl>
                    <div>
                        <Typography>Time Limit</Typography>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                sx={{ width: '48%' }}
                                type='number'
                                label='Minutes'
                                variant='standard'
                                value={minutes}
                                onChange={e => setTimeLimit( prev => {
                                    prev.minutes = Number( e.target.value )
                                    return prev
                                } )}
                            />
                            <TextField
                                sx={{ width: '48%' }}
                                type='number'
                                label='Seconds'
                                variant='standard'
                                value={seconds}
                                onChange={e => setTimeLimit( prev => {
                                    prev.seconds = Number( e.target.value )
                                    return prev
                                } )}
                            />
                        </div>
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog( false )}
                >
                    Cancel
                </Button>
                <Button
                    onClick={reset}
                >
                    Reset
                </Button>
                <Button
                    variant='contained'
                    onClick={addNewQuestion}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default AddQuestion