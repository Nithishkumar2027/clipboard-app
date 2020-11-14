const { app, BrowserWindow, Tray } = require('electron')
const path = require('path')

let tray = null

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        },
        icon: './icon/icon.ico'
    })
    mainWindow.hide()
    tray = new Tray('./icon/icon.ico')

    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    })
    mainWindow.on('show', () => {
        let winBounds = mainWindow.getBounds();
        let trayBounds = tray.getBounds();
        // Calculating app window coords
        let x = Math.round(trayBounds.x + (trayBounds.width / 2) - (winBounds.width / 2));
        let y = Math.round(trayBounds.y / 2.5);
        mainWindow.setPosition(x, y)
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
