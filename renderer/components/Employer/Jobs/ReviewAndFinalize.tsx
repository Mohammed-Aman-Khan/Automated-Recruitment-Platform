import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'

const getValue = value => {
    switch ( value ) {
        case 1:
            return 'Beginner'
        case 2:
            return 'Intermediate'
        case 3:
            return 'Expert'
    }
}

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

const ReviewAndFinalize = ( {
    role,
    description,
    skills,
    interviewRounds,
} ) => {
    return <Stack
        direction='column'
        gap={5}
    >
        <div>
            <Typography
                variant='button'
            >
                Job Role
            </Typography>
            <br />
            <Typography>
                {role}
            </Typography>
        </div>
        <div>
            <Typography
                variant='button'
            >
                Job Description
            </Typography>
            <br />
            <Typography
                dangerouslySetInnerHTML={{
                    __html: description
                }}
            />
        </div>
        <Skills
            skills={skills}
            label='Required Skills'
        />
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
                                    <Typography
                                        variant='h6'
                                    >
                                        Round {roundIndex + 1} - <em>{name}</em>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid
                                        container
                                        spacing={5}
                                    >
                                        {
                                            questionsConfiguration?.map( ( {
                                                skill,
                                                level,
                                            }, configurationIndex ) =>
                                                <Grid
                                                    item
                                                    key={configurationIndex}
                                                    xs={12} sm={6} md={4} lg={3} xl={3}
                                                >
                                                    <Typography>
                                                        Skill - <strong><em>{skill}</em></strong>
                                                    </Typography>
                                                    <br />
                                                    <Typography>
                                                        Required Level - <strong><em>{getValue( level )}</em></strong>
                                                    </Typography>
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )
                    :
                    <></>
            }
        </div>
    </Stack>
}

export default ReviewAndFinalize