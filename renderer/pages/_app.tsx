import { Provider } from 'react-redux'
import Store from '../redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import JobSeekerLayout from '../layouts/JobSeeker'
import EmployerLayout from '../layouts/Employer'

const EmptyLayout = ({children}) => <>{children}</>

const LayoutWrapper = ({ path = "", children }) => {

    let Layout =
    path.startsWith('/jobseeker') ?
    JobSeekerLayout :
    path.startsWith('/employer') ?
    EmployerLayout :
    EmptyLayout                
    
    return <Layout>
        { children }
    </Layout>

}

const MyApp = ({ Component, pageProps, router }) => {

    return <Provider store={Store}>
        <ThemeProvider
            theme={createTheme({
                palette: {
                    mode: 'dark',
                },
                typography: {
                    fontFamily: [ 'Comfortaa', 'cursive' ].join(','),
                }
            })}
        >
            <Paper elevation={0} square style={{ height: '100vh' }}>
                <LayoutWrapper path={router.pathname}>
                    <Component {...pageProps} />
                </LayoutWrapper>
            </Paper>
        </ThemeProvider>
    </Provider>
}

export default MyApp