// import { createClient } from '@supabase/supabase-js'
// import { v4 as uuid } from 'uuid'

// const supabaseUrl = 'https://ofvhylbfypwaqdwuictq.supabase.co'
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdmh5bGJmeXB3YXFkd3VpY3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUzNjU4ODcsImV4cCI6MTk3MDk0MTg4N30.HQd-seinCjRIbWkrwxsR421bc25NwMhqq0a2mKr7lIc'

// const supabase = createClient( supabaseUrl, supabaseAnonKey )

// export const uploadResume = async file => {
//     const { data, error } = await supabase
//         .storage
//         .from( 'arp-resumes' )
//         .upload( `${ uuid() }.pdf`, file )
//     return { data, error }
// }