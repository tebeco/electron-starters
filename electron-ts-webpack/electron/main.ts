import { app as electronApp, BrowserWindow } from 'electron';
import { join } from 'path';
import { format } from 'url';
import { platform } from 'os';
import { spawn, ChildProcess } from 'child_process';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the electronApp.
  mainWindow.loadURL(format({
    pathname: join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electronApp.on('ready', onElectronAppReady)

// Quit when all windows are closed.
electronApp.on('window-all-closed', function () {
  electronApp.quit();
})

electronApp.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let apiProcess: ChildProcess | null = null;

function onElectronAppReady() {
  //  run server
  if (mainWindow === null) {
    createWindow();
  }
}

// Kill process when electron exits
// Typings are fucking bugged
// process.on('exit', function () {
(process as NodeJS.EventEmitter).on('exit', function () {
  writeLog('exit');
  if (apiProcess !== null) {
    apiProcess.kill();
  }
});
