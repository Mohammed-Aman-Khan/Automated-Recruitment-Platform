import toast from 'react-hot-toast'

export const showError = msg => toast.error( msg, {
    style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    }
} )

export const showSuccess = msg => toast.success( msg, {
    style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    }
} )