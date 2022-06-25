import { useEffect, Fragment } from 'react'
import { useImmer } from 'use-immer'
import { useAppSelector } from '../../../hooks/util/redux'
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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import uniq from 'lodash/uniq'
import capitalize from 'lodash/capitalize'

const valueText = value => {
    switch ( value ) {
        case 1:
            return 'Level - Beginner'
        case 2:
            return 'Level - Intermediate'
        case 3:
            return 'Level - Expert'
    }
}

const InterviewConfiguration = ( {
    // skills,
    interviewRounds,
    setInterviewRounds,
} ) => {

    const questionSet = useAppSelector( state => state.questionSet.map( ( { topic, points } ) => ( { topic, points } ) ) )
    const [ openDialog, setOpenDialog ] = useImmer( false )
    const [ roundName, setRoundName ] = useImmer( '' )
    const [ availableTopics, setAvailableTopics ] = useImmer( [] )

    const addRound = () => {
        setInterviewRounds( prev => [ ...prev, {
            name: roundName,
            questionsConfiguration: [
                {
                    skill: '',
                    level: 1,
                }
            ]
        } ] )
        setOpenDialog( false )
        setRoundName( '' )
    }
    const removeRound = roundIndex => {
        setInterviewRounds( prev => {
            prev.splice( roundIndex, 1 )
            return prev
        } )
    }
    const addConfiguration = roundIndex => {
        setInterviewRounds( prev => {
            prev[ roundIndex ].questionsConfiguration.push( {
                skill: '',
                numberOfQuestions: null,
            } )
            return prev
        } )
    }
    const setConfiguation = ( key, value, roundIndex, configurationIndex ) => {
        setInterviewRounds( prev => {
            prev[ roundIndex ].questionsConfiguration[ configurationIndex ][ key ] = value
        } )
    }
    const removeConfiguration = ( roundIndex, configurationIndex ) => {
        setInterviewRounds( prev => {
            prev[ roundIndex ].questionsConfiguration.splice( configurationIndex, 1 )
            return prev
        } )
    }

    useEffect( () => {
        if ( questionSet ) {
            setAvailableTopics( uniq( questionSet.map( ( { topic } ) => topic ) ).map( item => item.replace( /\s+/g, " " ).trim().split( ' ' ).map( capitalize ).join( ' ' ) ) )
        }
    }, [ questionSet ] )

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
                            }, roundIndex ) =>
                                <Accordion
                                    key={name}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => removeRound( roundIndex )}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography
                                            variant='h6'
                                        >
                                            Round {roundIndex + 1} - <em>{name}</em>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            questionsConfiguration?.map( ( {
                                                skill,
                                                level,
                                            }, configurationIndex ) =>
                                                <Fragment
                                                    key={configurationIndex}
                                                >
                                                    <Stack
                                                        direction='row'
                                                        gap={3}
                                                    >
                                                        <FormControl
                                                            variant='filled'
                                                            fullWidth
                                                        >
                                                            <InputLabel>Skill</InputLabel>
                                                            <Select
                                                                value={skill}
                                                                onChange={e => setConfiguation( 'skill', e.target.value, roundIndex, configurationIndex )}
                                                            >
                                                                {
                                                                    availableTopics
                                                                        .map( topic =>
                                                                            <MenuItem
                                                                                key={topic}
                                                                                value={topic}
                                                                            >
                                                                                {topic}
                                                                            </MenuItem>
                                                                        )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        <div
                                                            style={{
                                                                minWidth: 400,
                                                                marginLeft: 50,
                                                            }}
                                                        >
                                                            <Slider
                                                                valueLabelDisplay="on"
                                                                value={level}
                                                                valueLabelFormat={valueText}
                                                                step={1}
                                                                marks
                                                                min={1}
                                                                max={3}
                                                                onChange={(e, value) => setConfiguation( 'level', Number( value ), roundIndex, configurationIndex )}
                                                            />
                                                        </div>
                                                        <div>
                                                            <IconButton
                                                                onClick={() => removeConfiguration( roundIndex, configurationIndex )}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </div>
                                                    </Stack>
                                                    {
                                                        configurationIndex + 1 === questionsConfiguration.length ? <></> : <br />
                                                    }
                                                </Fragment>
                                            )
                                        }
                                        <br />
                                        <Button
                                            startIcon={<AddIcon />}
                                            variant='outlined'
                                            onClick={() => addConfiguration( roundIndex )}
                                        >
                                            Add Skill Questions
                                        </Button>
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