import { Provider, useDispatch } from 'react-redux'
import Store from '../redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import JobSeekerLayout from '../layouts/JobSeeker'
import EmployerLayout from '../layouts/Employer'
import CircularProgress from '@mui/material/CircularProgress'
import { Toaster } from 'react-hot-toast'
import { useImmer } from 'use-immer'
import { useEffect } from 'react'
import { setAuth } from '../redux/AuthSlice'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const EmptyLayout = ( { children } ) => <>{children}</>

const LayoutWrapper = ( { path = "", children } ) => {

    let Layout =
        path.startsWith( '/jobseeker' )
            ?
            JobSeekerLayout
            :
            path.startsWith( '/employer' )
                ?
                EmployerLayout
                :
                EmptyLayout

    return <Layout>
        {children}
    </Layout>

}

const UtilWrapper = ( { children } ) => {

    const dispatch = useDispatch()
    const [ stateLoaded, setStateLoaded ] = useImmer( false )

    useEffect( () => {
        if ( localStorage.auth ) {
            dispatch( setAuth( JSON.parse( localStorage.auth ) ) )
        }
        setStateLoaded( true )
    }, [] )

    return <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper elevation={0} square style={{ height: '100vh' }}>
                {
                    stateLoaded
                        ?
                        children
                        :
                        <Grid
                            container
                            justifyContent='center'
                            alignItems='center'
                            sx={{
                                height: '100%',
                            }}
                        >
                            <Grid
                                item
                            >
                                <CircularProgress sx={{ fontSize: '40px' }} />
                            </Grid>
                        </Grid>
                }
            </Paper>
        </LocalizationProvider>
        <Toaster
            toastOptions={{
                style: {
                    fontFamily: 'Comfortaa',
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            }}
        />
    </>
}

const ThemeWrapper = ( { children } ) => {
    return <ThemeProvider
        theme={createTheme( {
            palette: {
                mode: 'dark',
            },
            typography: {
                fontFamily: [ 'Comfortaa', 'cursive' ].join( ',' ),
            }
        } )}
    >
        {children}
    </ThemeProvider>
}

const ReduxWrapper = ( { children } ) => {
    return <Provider
        store={Store}
    >
        {children}
    </Provider>
}

const MyApp = ( { Component, pageProps, router } ) => {
    return <ReduxWrapper>
        <ThemeWrapper>
            <UtilWrapper>
                <LayoutWrapper path={router.pathname}>
                    <Component {...pageProps} />
                </LayoutWrapper>
            </UtilWrapper>
        </ThemeWrapper>
    </ReduxWrapper>
}

export default MyApp