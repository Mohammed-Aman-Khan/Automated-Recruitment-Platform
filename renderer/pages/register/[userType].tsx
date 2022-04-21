import Fab from '@mui/material/Fab'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

export default () => {

    const router = useRouter()

    return <>
    <div
        style={{ position:'absolute', top:10, left:10 }}
        >
            <Fab size="small" color="default" onClick={() => router.back()}>
                <ArrowBackIcon />
            </Fab>
        </div>
    </>
}