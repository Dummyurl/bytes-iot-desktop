'use strict'

const {app, Menu, dialog, shell, BrowserWindow} = require('electron');
const path = require('path')
const url = require('url')

const appDetails = require('./package.json');
const wifi = require('./services/wifi');

let mainWindow
let dev = false
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    icon: __dirname+'../app/img/bytes-iot.ico',
    title: appDetails.productName
  });

  let indexPath

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  mainWindow.loadURL(indexPath)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  if (dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  const template = [
    {
      label: "&File",
      submenu: [
        {
          label: "Quit", 
          accelerator: "Command+Q", 
          click: app.quit
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    },
    {
      label: "&View",
      submenu: [
        {
          label: "Toggle Full Screen", 
          accelerator:"F11", 
          click: () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            let isFullScreen = focusedWindow.isFullScreen();
            focusedWindow.setFullScreen(!isFullScreen);
          }
        }
      ]
    },
    {
      label: "&Help",
      submenu: [
        {
          label: "Documentation", 
          click:  () => {
            shell.openExternal(appDetails.repository.docs);
          }
        },
        {
          label: "Report Issue", 
          click: () => {
            shell.openExternal(appDetails.bugs.url);
          }
        },
        {
          label: "About Bytes.io IoT", 
          click: () => {
            dialog.showMessageBox({title: "About Bytes.io IoT", type:"info", message: "A Bytes.io IoT desktop app to manage and monitor IoT devices. \nBytes R&D Copyright (c) 2018", buttons: ["Close"] });
          }
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));  
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
