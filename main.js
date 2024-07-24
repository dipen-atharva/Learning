const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");
const fs = require('fs')
const os = require('os')
const sudoPrompt = require('sudo-prompt');

let mainWindow;
let server;

// proceed to register our application to handle all "electron-ac://" protocols.
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("electron-ac", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient("electron-ac");
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    contextIsolation: true,
    // enableRemoteModule: false,
    nodeIntegration: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("welcome.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// application handle an event in which an external protocol is clicked
// Windows and Linux
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      const url = commandLine.pop().slice(0, -1);
      const token = url.slice("electron-ac://name=".length);
      mainWindow.webContents.send("name", token);
    }
  });
}

// MacOS
app.on("open-url", (event, url) => {
  console.log(url);
});

app.whenReady().then(async () => {
  createWindow();
  sudoPrompt.exec(`node ${path.join(process.resourcesPath, 'bin','script')}`, { name: 'AcDesktop' },
    async function (error, stdout, stderr) {
      if (error) {
        if (os.platform() === 'linux' && error.message === 'User did not grant permission.') app.quit();
        else throw error
      };
      console.log(stdout)
      // fs.writeFileSync('./info.json', stdout, 'utf8')
    }
  );
  mainWindow.webContents.send("name", "prince");
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    // Close Express server when Electron app is closed
    if (server) {
      server.close();
    }
    app.quit();
  }
});

ipcMain.on("open", () => {
  // Open external URL hosted by Express server
  shell.openExternal(`http://localhost:3005/login.html`);
});
