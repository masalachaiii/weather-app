const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const https = require("https");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 550,
        height: 630,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.removeMenu();
    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();
});

// 🔥 Add this:
ipcMain.handle("api-get", async (event, url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    reject(e);
                }
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
});
