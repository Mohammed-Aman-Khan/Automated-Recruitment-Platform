import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { showError } from '../../util/alerts'
import TextField from '@mui/material/TextField'
import { useImmer } from 'use-immer'
import Qualification from '../../components/JobSeeker/Profile/Qualification'
import Experience from '../../components/JobSeeker/Profile/Experience'
import Head from 'next/head'

const GridField = ( {
    label,
    value,
    onChange
} ) => <Grid
    item
    xs={12} sm={6} md={6} lg={4} xl={4}
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

    // const acceptedFiles = [ 'application/pdf' ]
    const theme = useTheme()
    const [ data, setData ] = useImmer( {
        name: '',
        email: '',
        dateOfBirth: '',
        resumeLink: '',
        qualifications: [],
        experience: [],
        certifications: [],
        skills: [],
        currentlyEmployed: false,
        interests: [],
    } )

    const set = ( key, value ) => {
        setData( prev => {
            prev[ key ] = value
        } )
    }

    const editData = () => { }

    return <>
        <Head>
            <title>
                My Profile
            </title>
        </Head>
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
        <GridField
            label='Date of Birth (DD-MM-YYYY)'
            value={data.dateOfBirth}
            onChange={val => set( 'dateOfBirth', val )}
        />
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
    </>
}