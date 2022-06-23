import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { showError } from '../../util/alerts'
import TextField from '@mui/material/TextField'
import { useImmer } from 'use-immer'
import Qualifications from '../../components/JobSeeker/Profile/Qualifications'
import Experience from '../../components/JobSeeker/Profile/Experience'
import Skills from '../../components/Shared/Skills'
import Certifications from '../../components/JobSeeker/Profile/Certifications'
import Head from 'next/head'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { uploadResume, getLink } from '../../util/supabase'
import { parseResume } from '../../util/resume-parser'
import toast from 'react-hot-toast'
import capitalize from 'lodash/capitalize'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import useRequests from '../../hooks/JobSeeker/useRequests'

const Input = styled( 'input' )( {
    display: 'none',
} )

const GridField = ( {
    label = '',
    value = '',
    onChange = val => { },
    disabled = false,
} ) => <Grid
    item
    xs={12} sm={12} md={6} lg={6} xl={6}
>
        <TextField
            fullWidth
            variant='standard'
            label={label}
            value={value}
            onChange={e => onChange( e.target.value )}
            disabled={disabled}
        />
    </Grid>

const initialState = {
    name: '',
    email: '',
    resumeLink: '',
    qualifications: [],
    experience: [],
    certifications: [],
    skills: [],
}

export default () => {

    const myDetails = useSelector( state => state.myDetails )
    const {
        getMyDetails,
        saveMyDetails,
    } = useRequests()
    const [ data, setData ] = useImmer( initialState )

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
                    set( 'resumeLink', publicLink )
                    const parsedResume = await parseResume( publicLink )
                    set( 'name', parsedResume.name )
                    // set( 'email', parsedResume.email )
                    set(
                        'qualifications',
                        parsedResume.education.map( education => {
                            const modified = {
                                level: '',
                                yearOfCompletion: '',
                                institution: '',
                            }
                            modified.institution = education.name
                            modified.yearOfCompletion = education.dates.toString()

                            return modified
                        } )
                    )
                    set(
                        'experience',
                        parsedResume.experience.map( experience => {
                            const modified = {
                                startDate: '',
                                endDate: '',
                                organization: '',
                                role: '',
                                description: '',
                            }
                            modified.role = experience.title
                            modified.organization = experience.organization
                            modified.startDate = experience.dates.toString()

                            return modified
                        } )
                    )
                    set(
                        'skills',
                        parsedResume.skills.map( skill =>
                            skill.replace( /\s+/g, " " ).trim().split( ' ' ).map( capitalize ).join( ' ' )
                        )
                    )
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

    const saveChanges = () => {
        saveMyDetails( data )
    }

    useEffect( getMyDetails, [] )
    useEffect( () => setData( myDetails ), [ myDetails ] )


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
            value={data?.name}
            onChange={val => set( 'name', val )}
        />
        <GridField
            label='Email'
            value={data?.email}
            disabled
        />
        <Grid
            item
            xs={12}
        >
            <Qualifications
                qualifications={data?.qualifications}
                setQualifications={val => set( 'qualifications', val )}
            />
        </Grid>
        <Grid
            item
            xs={12}
        >
            <Experience
                experience={data?.experience}
                setExperience={val => set( 'experience', val )}
            />
        </Grid>
        <Grid
            item
            xs={12}
        >
            <Skills
                skills={data?.skills}
                setSkills={val => set( 'skills', val )}
            />
        </Grid>
        <Grid
            item
            xs={12}
        >
            <Certifications
                certifications={data?.certifications}
                setCertifications={val => set( 'certifications', val )}
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
                    disabled={isEqual( cloneDeep( myDetails ), data )}
                    onClick={() => setData( myDetails )}
                >
                    Cancel Changes
                </Button>
                &nbsp;
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    disabled={isEqual( cloneDeep( myDetails ), data )}
                    onClick={saveChanges}
                >
                    Save Changes
                </Button>
            </div>
        </Grid>
    </>
}