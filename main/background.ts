import * as mongoose from 'mongoose'
import { app, ipcMain, dialog } from 'electron'
import serve from 'electron-serve'
import createWindow from './create-window'
import { AUTH_EVENTS } from './events/auth'
import { JOBSEEKER_EVENTS } from './events/jobseeker'
import { EMPLOYER_EVENTS } from './events/employer'
import 'dotenv/config'
import checkInternetConnected from 'check-internet-connected'

const isProd: boolean = process.env.NODE_ENV === 'production'

if ( isProd ) {
    serve( { directory: 'app' } )
} else {
    app.setPath( 'userData', `${ app.getPath( 'userData' ) } (development)` )
}

checkInternetConnected()
    .then( result => {
        mongoose
            .connect( `mongodb+srv://electron-app:electron-app@arp-cluster.89m0r.mongodb.net/arp?retryWrites=true&w=majority`, { useNewUrlParser: true } )
            .then( () => {
                ( async () => {
                    await app.whenReady()

                    const mainWindow = createWindow( 'main', {
                        width: 1000,
                        height: 600,
                    } )

                    if ( isProd ) {
                        await mainWindow.loadURL( 'app://./' )
                    } else {
                        const port = process.argv[ 2 ]
                        await mainWindow.loadURL( `http://localhost:${ port }/` )
                    }
                } )()
            } )
            .catch( err => {
                dialog.showErrorBox( 'Error', err.message )
                app.quit()
                process.exit()
            } )

        app.on( 'window-all-closed', () => {
            app.quit()
        } )

        const ALL_EVENTS = [
            ...AUTH_EVENTS,
            ...JOBSEEKER_EVENTS,
            ...EMPLOYER_EVENTS,
        ]

        ALL_EVENTS.forEach( ( { name, callback } ) => {
            ipcMain.handle( name, async ( event, ...args ) => {
                return JSON.stringify( await callback( ...args ) )
            } )
        } )
    } )
    .catch( err => {
        dialog.showErrorBox( 'Network Error', 'Couldn\'t connect.\nPlease check your network connection.' )
        app.quit()
        process.exit()
    } )