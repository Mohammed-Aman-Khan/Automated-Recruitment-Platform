import { ThemeProvider, createTheme } from "@mui/material"
import SplashScreen from "./pages/SplashScreen"

const App = () => {
    return <>
        <ThemeProvider
            theme={ createTheme({
                palette: {
                    mode: 'dark',
                    background: {
                        default: '#000000',
                        paper: '#000000',
                    }
                },
            }) }
        >
            <SplashScreen />
        </ThemeProvider>
    </>
}

export default App