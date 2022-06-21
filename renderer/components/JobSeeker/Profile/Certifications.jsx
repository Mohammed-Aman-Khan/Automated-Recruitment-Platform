import { useImmer } from 'use-immer'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import capitalize from 'lodash/capitalize'
import cloneDeep from 'lodash/cloneDeep'
import Chip from '@mui/material/Chip'

const initialCertification = ''

const Qualification = ({
    certifications,
    setCertifications,
}) => {

    const [ newSkill, setNewSkill ] = useImmer(initialCertification)

    const addSkill = e => {
        e.preventDefault()

        if (!newSkill) {
            return
        }

        const newCertifications = newSkill.split(',').map(item => item.replace(/\s+/g, " ").trim().split(' ').map(capitalize).join(' '))

        setCertifications([ ...certifications, ...newCertifications ])
        setNewSkill(initialCertification)
    }

    const deleteCertification = index => {
        const newCertifications = cloneDeep(certifications)
        newCertifications.splice(index, 1)
        setCertifications(newCertifications)
    }

    return <>
        <Paper
            variant='outlined'
            sx={ { borderRadius: '20px', padding: '20px' } }
        >
            <Typography
                variant='h6'
            >
                Certifications
            </Typography>
            <br />
            <form
                onSubmit={ addSkill }
            >
                <TextField
                    fullWidth
                    label='Add New'
                    variant='standard'
                    value={ newSkill }
                    onChange={ e => setNewSkill(e.target.value) }
                    helperText='Add multiple Certifications by seperating them with a comma (,)'
                />
                <br /><br />
                <Button
                    variant='outlined'
                    type='submit'
                >
                    Add
                </Button>
            </form>
            <br /><br />
            {
                certifications?.map((skill, index) =>
                    <Chip
                        key={ skill }
                        sx={ {
                            margin: '5px',
                        } }
                        label={ skill }
                        onDelete={ () => deleteCertification(index) }
                    />
                )
            }
        </Paper>
    </>
}

export default Qualification