import { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export default () => {
    return (
        <Html>
            <Head>
            </Head>
            <body style={{ padding: 0, margin: 0 }}>
                <ThemeProvider
                    theme={createTheme({
                        palette: {
                            mode: 'dark',
                        }
                    })}
                >
                    <Main />
                </ThemeProvider>
                <NextScript />
            </body>
        </Html>
    )
}