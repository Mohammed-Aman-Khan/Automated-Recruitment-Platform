import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const Skills = ( {
    label = 'Skills',
    skills = [],
    transparent = true,
} ) => {

    return <Paper
        variant='outlined'
        sx={{ borderRadius: '20px', padding: '20px', ...( transparent ? { backgroundColor: 'transparent' } : {} ) }}
    >
        <Typography
            variant='h6'
        >
            {label}
        </Typography>
        <br />
        {
            skills?.map( ( skill, index ) =>
                <Chip
                    key={skill}
                    sx={{
                        margin: '5px',
                    }}
                    label={skill}
                />
            )
        }
    </Paper>
}

const JobOpening = ( {
    job,
} ) => {

    const router = useRouter()

    return <Paper
        sx={{
            padding: '20px',
            borderRadius: '10px'
        }}
    >
        <Typography
            variant='h5'
        >
            {job.role}
        </Typography>
        <br />
        <Divider />
        <br />
        <Typography
            variant='body1'
            dangerouslySetInnerHTML={{ __html: job.description }}
        />
        <br />
        <Skills
            skills={job.requiredSkills}
            label='Required Skills'
        />
        <br />
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Typography>
                <em>Applications :</em> {job.appliedCandidates.length}
            </Typography>
            <Typography>
                <em>Interviews Completed :</em> {job.interviewsCompleted.length}
            </Typography>
        </div>
        <br />
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}
        >
            <Button
                variant='contained'
                disableElevation
                onClick={() => {
                    router.push(
                        '/employer/job/' + job._id,
                    )
                }}
            >
                View Details
            </Button>
        </div>
    </Paper>
}

export default JobOpening