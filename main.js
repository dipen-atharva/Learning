const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");

let mainWindow;

// proceed to register our application to handle all "electron-ac://" protocols.
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("elctronac", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient("elctronac");
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
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
      const token = url.slice("elctronac://name=".length);
      mainWindow.webContents.send("name", token);
    }
  });
}

// MacOS
app.on("open-url", (event, url) => {
  console.log(url);
});

app.whenReady().then(() => {
  createWindow();
  mainWindow.webContents.send("name", "prince");
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("open", () => {
  shell.openExternal("http://ac.atharvasystem.com/");
  // mainWindow.loadFile("welcome.html");
});
