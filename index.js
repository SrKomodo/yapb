const {app, BrowserWindow, Tray, Menu} = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow () {
  const {screen} = require("electron");

  win = new BrowserWindow({
    x: screen.getPrimaryDisplay().workArea.width - 400,
    y: screen.getPrimaryDisplay().workArea.height - 200,
    width: 400, height: 200,
    resizable: false,
    movable: false,
    show: false,
    transparent: true,
    frame: false,
    backgroundColor: "#ee232323"
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, "app", "index.html"),
    protocol: "file:",
    slashes: true,
  }));

  win.on("blur", () => {
    win.hide();
  });

  win.on("closed", () => {
    win = null;
  });

  const tray = new Tray(path.join(__dirname, "app", "icon.png"));

  const contextMenu = Menu.buildFromTemplate([
    {label: "Close", type: "normal", click: () => {app.quit();}}
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Yet Another Procastination Blocker");

  tray.on("click", () => {
    win.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});