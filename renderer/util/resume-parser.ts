import axios from 'axios'

export const parseResume = async link => {
    const response = await axios
        .get( 'https://api.apilayer.com/resume_parser/url?url=' + encodeURIComponent( link ), {
            headers: {
                apiKey: 'Lrq8vQ457YP3cl5h3ZxCJ07g5ChQkKfF',
            }
        } )
    return response.data
}