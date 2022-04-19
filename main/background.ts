import * as mongoose from 'mongoose'
import { app, ipcMain, dialog } from 'electron'
import serve from 'electron-serve'
import createWindow from './create-window'
import { AUTH_EVENTS } from './events/auth'
import { JOBSEEKER_EVENTS } from './events/jobseeker'
import { EMPLOYER_EVENTS } from './events/employer'
import 'dotenv/config'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
    serve({ directory: 'app' })
} else {
    app.setPath('userData', `${ app.getPath('userData') } (development)`)
}

mongoose
    .connect(`${ process.env.DB_URL }`, { useNewUrlParser: true })
    .then(() => {
        (async () => {
            await app.whenReady()

            const mainWindow = createWindow('main', {
                width: 1000,
                height: 600,
            })

            if (isProd) {
                await mainWindow.loadURL('app://./')
            } else {
                const port = process.argv[ 2 ]
                await mainWindow.loadURL(`http://localhost:${ port }/`)
                mainWindow.webContents.openDevTools()
            }
        })()
    })
    .catch(err => {
        dialog.showErrorBox('Error', err.message)
    })

app.on('window-all-closed', () => {
    app.quit()
})

const ALL_EVENTS = [
    ...AUTH_EVENTS,
    ...JOBSEEKER_EVENTS,
    ...EMPLOYER_EVENTS,
]

ALL_EVENTS.forEach(({ name, callback }) => {
    ipcMain.handle(name, async (event, ...args) => {
        return await callback(...args)
    })
})