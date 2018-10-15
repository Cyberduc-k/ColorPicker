import { app, BrowserWindow, ipcMain, Tray } from "electron";
import { resolve } from "path";
import { format } from "url";

let win: BrowserWindow | null = null;
let dial: BrowserWindow | null = null;
let pick: BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow () {
    win = new BrowserWindow({
        width: 224,
        height: 131,
        resizable: false,
        frame: false,
        icon: resolve(__dirname, "../../assets/logo.png"),
        webPreferences: {
            experimentalFeatures: true
        }
    });

    win.loadURL(format({
        pathname: resolve(__dirname, "../../assets/index.html"),
        slashes: true,
        protocol: "file:"
    }));

    win.on("closed", () => {
        win = null;
        tray!.destroy();
        tray = null;
        
        if (dial != null) dial.close();
        if (pick != null) pick.close();
    });

    dial = new BrowserWindow({
        width: 400,
        height: 110,
        icon: resolve(__dirname, "../../assets/logo.png"),
        resizable: false,
        show: false,
        frame: false,
        modal: true,
        parent: win
    });

    dial.loadURL(format({
        pathname: resolve(__dirname, "../../assets/dial.html"),
        slashes: true,
        protocol: "file:"
    }));

    dial.on("closed", () => dial = null);

    pick = new BrowserWindow({
        frame: false,
        transparent: true,
        fullscreen: true,
        show: false,
        resizable: false,
        hasShadow: false
    });
    
    pick.loadURL(format({
        pathname: resolve(__dirname, "../../assets/picker.html"),
        slashes: true,
        protocol: "file:"
    }));

    pick.on("closed", () => pick = null);

    tray = new Tray(resolve(__dirname, "../../assets/logo.png"));
    tray.setTitle("Color Picker");
    tray.setToolTip("Color Picker\nDouble click to open.");
    tray.on("double-click", () => {
        win!.show();
    });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (win === null) createWindow(); });

ipcMain.on("openDialog", (sender: any, data: any) => {
    dial!.show();
    dial!.webContents.executeJavaScript(`setType('${JSON.stringify(data)}')`);
});

ipcMain.on("dialogResult", (sender: any, data: any) => {
    dial!.hide();

    win!.webContents.send("dialogResult", data);
});

ipcMain.on("toTray", () => {
    win!.hide();
});

ipcMain.on("openPick", () => {
    pick!.show();
});

ipcMain.on("closePick", (sender: any, data: any) => {
    pick!.hide();
    win!.webContents.send("finishedSampling", data);
});

ipcMain.on("sampleColor", (sender: any, data: any) => {
    win!.webContents.send("sampleColor", data);
});