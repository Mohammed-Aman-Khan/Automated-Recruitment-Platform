import { useState, useCallback } from 'react'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Lottie from 'react-lottie'
import withStyles from '@mui/styles/withStyles'

const FullScreenGrid = withStyles({
    root: {
        height: '100vh',
        width: '100vw',
    }
})(Grid)

const SplashScreen = ({ loading = true }) => {
    const [ animationPlayed, setAnimationPlayed ] = useState(false)
    const handleAnimationFinish = useCallback(() => setAnimationPlayed(true), [])

    return <Dialog
        fullScreen
        sx={ { pointerEvents: 'none' } }
        open={ !(loading && animationPlayed) }
    >
        <FullScreenGrid
            container
            alignItems="center"
            justifyContent="center"
        >
            <Grid
                item container
            >
                <Lottie
                    options={ {
                        loop: true,
                        autoplay: true,
                        animationData: require('./splash-screen-lottie.json'),
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        },
                    } }
                    eventListeners={ [
                        {
                            eventName: 'complete',
                            callback: handleAnimationFinish,
                        },
                    ] }
                    height={ 250 }
                    width={ 250 }
                />
            </Grid>
        </FullScreenGrid>
    </Dialog>
}

export default SplashScreen