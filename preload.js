const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
    get: (url) => ipcRenderer.invoke('api-get', url),
});