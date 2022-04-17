import { Provider } from 'react-redux'
import Store from '../redux'

const MyApp = ({ Component, pageProps, router }) => {
    return <Provider store={Store}>
        <Component {...pageProps} />
    </Provider>
}

export default MyApp