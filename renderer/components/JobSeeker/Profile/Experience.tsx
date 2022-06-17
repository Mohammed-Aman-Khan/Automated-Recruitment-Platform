import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useImmer } from 'use-immer'

const Experience = ( {
    experience,
    setExperience,
} ) => {

    const [ openDialog, setOpenDialog ] = useImmer( false )

    return <>
        <Paper
            variant='outlined'
            sx={{ borderRadius: '20px', padding: '20px' }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant='h6'
                >
                    Experience
                </Typography>
                <Button
                    variant='outlined'
                    onClick={() => setOpenDialog( true )}
                >
                    Add Experience
                </Button>
            </div>
            <br />
        </Paper>
        <Dialog
            open={openDialog}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle>
                Add Experience
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog( false )}
                >
                    Cancel
                </Button>
                <Button
                    variant='outlined'
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default Experience