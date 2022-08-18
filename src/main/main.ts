import {app, BrowserWindow, ipcMain, protocol, session} from "electron";
import {normalize} from "path";

import {loadImages} from "./images/images";

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit();
}

const isDevelopment = process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 1000,
        width: 1280,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            webSecurity: !isDevelopment
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                // "Content-Security-Policy": [
                // "style-src-attr 'self'",
                // "script-src 'self' chrome-extension://hmaebnndhhjkacnkmodhhhgoelakoiii/main.html",
                // "script-src-elem 'self'",
                // "img-src 'self'",
                // "default-src 'none'",
                // ]
            }
        });
    });
});

protocol.registerSchemesAsPrivileged([
    {scheme: "media", privileges: {bypassCSP: true}},
]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    if (!isDevelopment) {
        return;
    }
    const installExtension = await import("electron-devtools-installer");
    const {REACT_DEVELOPER_TOOLS} = installExtension;

    installExtension.default(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));

    protocol.registerFileProtocol("media", (request, callback) => {
        console.log(request.url);
        const url = decodeURIComponent(request.url.substring("media://".length));
        console.log(url);
        callback({path: normalize(`${__dirname}/${url}`)});
    });

    ipcMain.handle("quit", app.quit);
    ipcMain.handle("loadImages", loadImages);

    await createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", async () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on("exit", () => app.quit());
