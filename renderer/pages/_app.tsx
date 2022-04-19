import { Provider } from 'react-redux'
import Store from '../redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

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
                <Component {...pageProps} />
            </Paper>
        </ThemeProvider>
    </Provider>
}

export default MyApp