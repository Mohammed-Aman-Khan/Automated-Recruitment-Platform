import { useImmer } from 'use-immer'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import useRequests from '../../../hooks/Employer/useRequests'

const AddQuestion = () => {

    const { addQuestion } = useRequests()
    const [ openDialog, setOpenDialog ] = useImmer( false )
    const [ newQuestion, setNewQuestion ] = useImmer( {
        employerEmail: '',
        type: '',
        topic: '',
        question: '',
        answer: '',
        points: null,
        timeLimit: null,
    } )

    const addNewQuestion = () => {
        addQuestion( newQuestion )
    }

    return <>
        <Button
            size='large'
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog( true )}
        >
            Add New Question
        </Button>
        <Dialog
            open={openDialog}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle>
                New Question
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialog( false )}
                >
                    Cancel
                </Button>
                <Button
                    variant='outlined'
                    onClick={addNewQuestion}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default AddQuestion