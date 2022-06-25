import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const Job = ({
    job,
    setCurrent
}) => {
    return <Card
        variant='outlined'
        sx={ {
            padding: '20px',
        } }
    >
        <Typography
            variant='h6'
        >
            { job.role }
        </Typography>
        <br />
        <Button
            sx={ {
                float: 'right'
            } }
            onClick={ () => setCurrent(job) }
        >
            View Details
        </Button>
    </Card>
}

export default Job