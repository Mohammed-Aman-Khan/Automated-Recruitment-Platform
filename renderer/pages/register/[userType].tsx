import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { AUTH_EVENTS } from '../../util/events/auth'
import capitalize from 'lodash/capitalize'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Head from 'next/head'
import Stack from '@mui/material/Stack'
import { useImmer } from 'use-immer'
import { showError, showSuccess } from '../../util/alerts'

export default () => {

    const router = useRouter()
    const { query } = router
    const userType = query.userType ? String( query.userType ).toUpperCase() : ''
    const [ name, setName ] = useImmer( '' )
    const [ email, setEmail ] = useImmer( '' )
    const [ password, setPassword ] = useImmer( '' )
    const [ branch, setBranch ] = useImmer( '' )

    const register = async e => {
        e.preventDefault()

        if ( !name ) {
            showError( `${ userType === 'JOBSEEKER' ? '' : 'Company ' }Name required` )
            return
        }
        if ( !email ) {
            showError( `${ userType === 'JOBSEEKER' ? '' : 'Company ' }Email required` )
            return
        }
        if ( !password ) {
            showError( 'Password required' )
            return
        }

        try {
            const response = await AUTH_EVENTS.REGISTER( {
                email,
                password,
                userType,
                name,
                branch,
            } )

            if ( !response.status ) {
                showError( response.error )
            }
            else {
                showSuccess( 'Account created' )
                router.replace( '/login/' + userType.toLowerCase() )
            }
        }
        catch ( error ) {
            showError( error.message )
        }
    }

    return <>
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <IconButton size='small' color='default' onClick={() => router.back()}>
                <ArrowBackIcon />
            </IconButton>
        </div>
        <Head>
            <title> Create {capitalize( userType )} Account</title>
        </Head>
        <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={{ height: '100%' }}
        >
            <Paper
                variant='outlined'
                sx={{
                    minWidth: '350px',
                    borderRadius: '20px',
                    padding: '30px',
                }}
            >
                <div style={{ width: '100%' }}>
                    <Stack
                        direction='column'
                        gap={5}
                    >
                        <Typography variant='h4'>Create Account</Typography>
                        <form onSubmit={register}>
                            <Stack
                                direction='column'
                                gap={3}
                            >
                                <TextField
                                    variant='standard'
                                    fullWidth
                                    label={`${ userType === 'JOBSEEKER' ? '' : 'Company ' }Name`}
                                    value={name}
                                    onChange={e => setName( e.target.value )}
                                />
                                <TextField
                                    variant='standard'
                                    fullWidth
                                    label={`${ userType === 'JOBSEEKER' ? '' : 'Company ' }Email`}
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail( e.target.value )}
                                />
                                {
                                    userType === 'JOBSEEKER' &&
                                    <TextField
                                        variant='standard'
                                        fullWidth
                                        label='Company Branch'
                                        value={branch}
                                        onChange={e => setBranch( e.target.value )}
                                    />
                                }
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
                                        onClick={() => router.push( '/login/' + String( query.userType ) )}
                                        variant='text'
                                        sx={{ float: 'right' }}
                                    >
                                        Login
                                    </Button>
                                </div>
                                <Button
                                    fullWidth
                                    color='primary'
                                    size='large'
                                    variant='contained'
                                    type='submit'
                                >
                                    Create Account
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </div>
            </Paper>
        </Grid>
    </>
}
