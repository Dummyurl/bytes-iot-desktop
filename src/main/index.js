'use strict'

const {app, Menu, dialog, shell, BrowserWindow} = require('electron');
import * as path from 'path'
import { format as formatUrl } from 'url'

const appDetails = require('../../package.json');

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1400,
    height: 800,
    icon: __dirname+'/app/img/bytes-iot.ico',
    title: appDetails.productName
  });

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  //Set native menubar
  var template = [
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

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
