import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PreviewIcon from '@mui/icons-material/Preview'
import EditIcon from '@mui/icons-material/Edit'

const QuestionCard = ( {
    question,
    onPreview,
} ) => {
    return <Card
    >
        <CardHeader
            title={<><Typography variant='button'>Topic - {question.topic}</Typography></>}
            subheader={<><Typography variant='overline'>Points - {question.points}</Typography></>}
            action={
                <IconButton
                    onClick={onPreview}
                >
                    <PreviewIcon />
                </IconButton>
            }
        />
        <CardContent
            sx={{
                height: '200px',
                boxShadow: 'inset 0px -50px 30px -20px rgba(0, 0, 0, 0.5)',
            }}
            dangerouslySetInnerHTML={{ __html: question.question }}
        />
        <CardActions>
            <IconButton>
                <EditIcon />
            </IconButton>
        </CardActions>
    </Card>
}

export default QuestionCard