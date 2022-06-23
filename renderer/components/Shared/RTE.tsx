import { createTheme, ThemeProvider, Paper } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RTE = ( {
    value = '',
    onChange = val => { },
} ) => {
    return <ThemeProvider
        theme={
            createTheme( {
                palette: {
                    mode: 'light',
                },
            } )
        }
    >
        <Paper square elevation={0}>
            <ReactQuill
                theme="snow"
                placeholder='Start typing...'
                preserveWhitespace
                value={value}
                onChange={onChange}
                modules={{
                    toolbar: [
                        [ { 'header': [ 1, 2, 3, 4, 5, 6 ] } ],
                        [ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
                        [ { 'script': 'sub' }, { 'script': 'super' }, { 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' } ],
                        [ 'link', 'image', 'code-block', ],
                        [ 'clean' ]
                    ],
                }}
                formats={[
                    'header',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'code-block',
                ]}
            />
        </Paper>
    </ThemeProvider>
}

export default RTE