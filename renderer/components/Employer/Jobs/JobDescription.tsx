import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Skills from '../../Shared/Skills'
import RTE from '../../Shared/RTE'

const JobDescription = ( {
    role, setRole,
    description, setDescription,
    skills, setSkills,
} ) => {
    return <Stack
        direction='column'
        gap={5}
    >
        <TextField
            label='Job Role'
            variant='filled'
            value={role}
            onChange={e => setRole( e.target.value )}
        />
        <div>
            <Typography>Job Description</Typography>
            <RTE
                value={description}
                onChange={val => setDescription( val )}
            />
        </div>
        <Skills
            label='Required Skills'
            skills={skills}
            setSkills={setSkills}
        />
    </Stack>
}

export default JobDescription