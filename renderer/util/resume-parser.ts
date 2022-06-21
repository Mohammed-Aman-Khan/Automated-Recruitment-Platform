import axios from 'axios'

export const parseResume = async link => {
    const response = await axios
        .get( 'https://api.apilayer.com/resume_parser/url?url=' + encodeURIComponent( link ), {
            headers: {
                apiKey: 'cH0Pt54o7hguvSLBhnwHMVutbDv67lqq',
            }
        } )
    return response.data
}