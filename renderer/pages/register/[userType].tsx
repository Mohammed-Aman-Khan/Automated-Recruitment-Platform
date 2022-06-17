import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

export default () => {

    const router = useRouter()

    return <>
        <div
            style={{ position: 'absolute', top: 10, left: 10 }}
        >
            <IconButton size="small" color="default" onClick={() => router.back()}>
                <ArrowBackIcon />
            </IconButton>
        </div>
    </>
}