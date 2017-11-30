import { app, BrowserWindow, Tray, Menu } from "electron";
import * as path from "path";
import { initialize } from "./scheduler";
const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow : BrowserWindow|null;

function createMainWindow() {
  const { screen } = require("electron");

  const window = new BrowserWindow({
    x: screen.getPrimaryDisplay().workArea.width - 400,
    y: screen.getPrimaryDisplay().workArea.height - 200,
    width: 400, height: 200,
    resizable: false,
    movable: false,
    show: true,
    transparent: true,
    frame: false,
    backgroundColor: "#ee232323"
  });

  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`;

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  window.loadURL(url);

  window.on("blur", () => {
    window.hide();
  });

  window.on("closed", () => {
    mainWindow = null;
  });

  const tray = new Tray(path.join(__dirname,"icon.png"));

  const contextMenu = Menu.buildFromTemplate([
    { label: "Close", type: "normal", click: () => { app.quit(); } }
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Yet Another Procastination Blocker");

  tray.on("click", () => {
    window.show();
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) mainWindow = createMainWindow();
});

app.on("ready", () => {
  mainWindow = createMainWindow();
  initialize();
});
