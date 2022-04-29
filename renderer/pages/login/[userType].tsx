import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useRef, useEffect } from 'react'
import { AUTH_EVENTS } from '../../util/events/auth'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../redux/AuthSlice'
import isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default () => {

    const router = useRouter()

    const { query, replace } = useRouter()
    const dispatch = useDispatch()
    const userType = query.userType ? String(query.userType).toUpperCase() : ''
    const emailRef = useRef()
    const passwordRef = useRef()

    const login = async e => {
        e.preventDefault()
        // try {
        //     const { status, error } = await AUTH_EVENTS.LOGIN({
        //         email: emailRef.current.value,
        //         passwsord: passwordRef.current.value,
        //         userType,
        //     })
        //     if (status) {
        //         dispatch(setAuth({
        //             email: emailRef.current.value,
        //             passwsord: passwordRef.current.value,
        //             userType,
        //         }))
        //         replace(userType === 'JOBSEEKER' ? '/jobseeker' : '/employer')
        //     }
        //     else alert(error)
        // }
        // catch (err) {
        //     console.log(err)
        // }
        router.replace('/' + String(query.userType))
    }

    useEffect(() => {
        if (Boolean(userType) && !isEqual(userType, 'JOBSEEKER') && !isEqual(userType, 'EMPLOYER')) {
            replace('/')
        }
    }, [ userType ])

    return <>
        <Grid
            container
            alignItems='center'
            justifyContent='center'
            style={{ height: '100%' }}
        >
            <Paper
                variant="outlined"
                style={{
                    minWidth: 350,
                    borderRadius: 20,
                    padding: 30,
                }}
            >
                <div style={{ width: '100%' }}>
                    <Typography variant="h3">
                        Login
                    </Typography>
                    <br /><br /><br />
                    <form onSubmit={login}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Email"
                            type="email"
                            ref={emailRef}
                        />
                        <br /><br />
                        <TextField
                            variant="standard"
                            fullWidth
                            label="Password"
                            type="password"
                            ref={passwordRef}
                        />
                        <br /><br />
                        <Button onClick={() => router.push('/register/' + String(query.userType))} variant="text" style={{ float:'right' }}>
                            Create Account
                        </Button>
                        <br /><br /><br />
                        <Button fullWidth color="primary" size="large" variant="contained" type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </Paper>
        </Grid>
        <div
        style={{ position:'absolute', top:10, left:10 }}
        >
            <IconButton size="small" color="default" onClick={() => router.back()}>
                <ArrowBackIcon />
            </IconButton>
        </div>
    </>
}