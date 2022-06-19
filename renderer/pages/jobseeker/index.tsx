import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { showError } from '../../util/alerts'
import TextField from '@mui/material/TextField'
import { useImmer } from 'use-immer'
import Qualification from '../../components/JobSeeker/Profile/Qualification'
import Experience from '../../components/JobSeeker/Profile/Experience'
import Skills from '../../components/JobSeeker/Profile/Skills'
import Head from 'next/head'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { uploadResume, getLink } from '../../util/supabase'
import { parseResume } from '../../util/resume-parser'
import toast from 'react-hot-toast'

const Input = styled( 'input' )( {
    display: 'none',
} )

const GridField = ( {
    label,
    value,
    onChange
} ) => <Grid
    item
    xs={12} sm={12} md={6} lg={4} xl={4}
>
        <TextField
            fullWidth
            variant='standard'
            label={label}
            value={value}
            onChange={e => onChange( e.target.value )}
        />
    </Grid>

export default () => {

    const theme = useTheme()
    const [ data, setData ] = useImmer( {
        name: '',
        email: '',
        dateOfBirth: null,
        resumeLink: '',
        qualifications: [],
        experience: [],
        certifications: [],
        skills: [],
        currentlyEmployed: false,
        interests: [],
    } )
    const [ parsedData, setParsedData ] = useImmer( {} )

    const set = ( key, value ) => {
        setData( prev => {
            prev[ key ] = value
        } )
    }

    const uploadAndParseResume = async e => {

        const file = e.target.files[ 0 ]

        let loaderId = toast.loading( 'Loading...' )
        try {
            if ( file ) {
                if ( file.type === 'application/pdf' ) {
                    const { fileName } = await uploadResume( file )
                    const publicLink = getLink( fileName )
                    const parsedResume = await parseResume( publicLink )
                    console.log( parsedResume )
                }
                else {
                    showError( 'Invalid File' )
                }
            }
            toast.dismiss( loaderId )
        }
        catch ( error ) {
            toast.dismiss( loaderId )
            showError( error.message )
        }
    }

    return <>
        <Head>
            <title>
                My Profile
            </title>
        </Head>
        <Grid
            item
            xs={12}
        >
            <label htmlFor="contained-button-file">
                <Input onChange={uploadAndParseResume} accept="application/pdf" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span">
                    Upload Resume PDF
                </Button>
            </label>
            <label htmlFor="icon-button-file">
                <Input onChange={uploadAndParseResume} accept="application/pdf" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PictureAsPdfIcon />
                </IconButton>
            </label>
        </Grid>
        <GridField
            label='Name'
            value={data.name}
            onChange={val => set( 'name', val )}
        />
        <GridField
            label='Email'
            value={data.email}
            onChange={val => set( 'email', val )}
        />
        <Grid
            item
            xs={12} sm={12} md={6} lg={4} xl={4}
        >
            <DesktopDatePicker
                label='Date of Birth'
                inputFormat='dd-MM-yyyy'
                value={data.dateOfBirth}
                onChange={val => set( 'dateOfBirth', val )}
                renderInput={params => <TextField fullWidth variant='standard' {...params} />}
            />
        </Grid>
        <Grid
            item
            xs={12} sm={12} md={6} lg={6} xl={6}
        >
            <Qualification
                qualifications={data.qualifications}
                setQualifications={val => set( 'qualifications', val )}
            />
        </Grid>
        <Grid
            item
            xs={12} sm={12} md={6} lg={6} xl={6}
        >
            <Experience
                experience={data.experience}
                setExperience={val => set( 'experience', val )}
            />
        </Grid>
        <Grid
            item
            xs={12}
        >
            <Skills
                skills={data.skills}
                setSkills={val => set( 'skills', val )}
            />
        </Grid>
        <Grid item xs={12} />
        <Grid
            item
            xs={12}
        >
            <div
                style={{
                    float: 'right'
                }}
            >
                <Button
                    size='large'
                    variant='outlined'
                    color='primary'
                >
                    Cancel Changes
                </Button>
                &nbsp;
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                >
                    Save Changes
                </Button>
            </div>
        </Grid>
    </>
}