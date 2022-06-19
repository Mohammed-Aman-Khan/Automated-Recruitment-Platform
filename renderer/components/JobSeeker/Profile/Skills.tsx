import { useImmer } from 'use-immer'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import capitalize from 'lodash/capitalize'
import cloneDeep from 'lodash/cloneDeep'
import Chip from '@mui/material/Chip'

const initialSkill = ''

const Qualification = ( {
    skills,
    setSkills,
} ) => {

    const [ newSkill, setNewSkill ] = useImmer( initialSkill )

    const addSkill = () => {
        if ( !newSkill ) {
            return
        }

        const newSkills = newSkill.split( ',' ).map( item => item.replace( /\s+/g, " " ).trim().split( ' ' ).map( capitalize ).join( ' ' ) )

        setSkills( [ ...skills, ...newSkills ] )
        setNewSkill( initialSkill )
    }

    const deleteSkill = index => {
        const newSkills = cloneDeep( skills )
        newSkills.splice( index, 1 )
        setSkills( newSkills )
    }

    return <>
        <Paper
            variant='outlined'
            sx={{ borderRadius: '20px', padding: '20px' }}
        >
            <Typography
                variant='h6'
            >
                Skills
            </Typography>
            <br />
            <TextField
                fullWidth
                label='Add New'
                variant='standard'
                value={newSkill}
                onChange={e => setNewSkill( e.target.value )}
                helperText='Add multiple skills by seperating them with a comma (,)'
            />
            <br /><br />
            <Button
                variant='outlined'
                onClick={addSkill}
            >
                Add
            </Button>
            <br /><br />
            {
                skills
                    .map( ( skill, index ) =>
                        <Chip
                            sx={{
                                marginLeft: '5px',
                                marginRight: '5px'
                            }}
                            label={skill}
                            onDelete={() => deleteSkill( index )}
                        />
                    )
            }
        </Paper>
    </>
}

export default Qualification