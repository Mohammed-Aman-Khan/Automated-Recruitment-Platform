import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { AUTH_EVENTS } from '../../util/events/auth'
import { setAuth } from '../../redux/AuthSlice'
import isEqual from 'lodash/isEqual'
import capitalize from 'lodash/capitalize'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Head from 'next/head'
import { useImmer } from 'use-immer'
import { showError } from '../../util/alerts'
import Stack from '@mui/material/Stack'
import { useAppDispatch } from '../../hooks/util/redux'

export default () => {

    const router = useRouter()
    const { query } = router
    const dispatch = useAppDispatch()
    const userType = query.userType ? String( query.userType ).toUpperCase() : ''
    const [ email, setEmail ] = useImmer( '' )
    const [ password, setPassword ] = useImmer( '' )

    const login = async ( e ) => {
        e.preventDefault()

        if ( !email ) {
            showError( `${ userType === 'JOBSEEKER' ? '' : 'Company ' }Email required` )
            return
        }
        if ( !password ) {
            showError( 'Password required' )
            return
        }

        try {
            const response = await AUTH_EVENTS.LOGIN( {
                email,
                password,
                userType,
            } )

            if ( !response.status ) {
                showError( response.error )
            }
            else {
                dispatch( setAuth( { email, userType } ) )
                router.replace( '/' + userType.toLowerCase() )
            }
        }
        catch ( error ) {
            showError( error.message )
        }
    }

    useEffect( () => {
        if (
            Boolean( userType ) &&
            !isEqual( userType, 'JOBSEEKER' ) &&
            !isEqual( userType, 'EMPLOYER' )
        ) {
            router.replace( '/' )
        }
    }, [ userType ] )

    return <>
        <Head>
            <title>{capitalize( userType )} Login</title>
        </Head>
        <Grid
            container
            alignItems='center'
            justifyContent='center'
            style={{ height: '100%' }}
        >
            <Paper
                variant='outlined'
                style={{
                    minWidth: 350,
                    borderRadius: 20,
                    padding: 30,
                }}
            >
                <div style={{ width: '100%' }}>
                    <Stack
                        direction='column'
                        gap={5}
                    >
                        <Typography variant='h4'>Login</Typography>
                        <form onSubmit={login}>
                            <Stack
                                direction='column'
                                gap={3}
                            >
                                <TextField
                                    variant='standard'
                                    fullWidth
                                    label={`${ userType === 'JOBSEEKER' ? '' : 'Company ' }Email`}
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail( e.target.value )}
                                />
                                <TextField
                                    variant='standard'
                                    fullWidth
                                    label='Password'
                                    type='password'
                                    value={password}
                                    onChange={e => setPassword( e.target.value )}
                                />
                                <div>
                                    <Button
                                        onClick={() =>
                                            router.push( '/register/' + userType.toLowerCase() )
                                        }
                                        variant='text'
                                        style={{ float: 'right' }}
                                    >
                                        Create Account
                                    </Button>
                                </div>
                                <Button
                                    fullWidth
                                    color='primary'
                                    size='large'
                                    variant='contained'
                                    type='submit'
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </div>
            </Paper>
        </Grid>
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <IconButton size='small' color='default' onClick={() => router.back()}>
                <ArrowBackIcon />
            </IconButton>
        </div>
    </>
}
