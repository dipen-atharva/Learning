const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  electron: () => process.versions.electron,
  chrome: () => process.versions.chrome,
  node: () => process.versions.node,
  os: () => process.platform,
});

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
  },
  name: (callback) =>
    ipcRenderer.on("name", (_event, value) => callback(value)),
});
