import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ofvhylbfypwaqdwuictq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdmh5bGJmeXB3YXFkd3VpY3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUzNjU4ODcsImV4cCI6MTk3MDk0MTg4N30.HQd-seinCjRIbWkrwxsR421bc25NwMhqq0a2mKr7lIc'

const supabase = createClient( supabaseUrl, supabaseKey )

const bucket = supabase.storage.from( 'arp-resumes' )

export const uploadResume = async file => {
    const fileName = `${ Date.now() }.pdf`
    const { data, error } = await bucket.upload( fileName, file )
    if ( error ) throw error
    return {
        fileName
    }
}

export const getLink = fileKey => {
    const { data, error } = bucket.getPublicUrl( fileKey )
    if ( error ) throw error
    return data.publicURL
} 