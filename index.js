const {app, BrowserWindow, Tray} = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow () {
  const {screen} = require("electron");

  const tray = new Tray(path.join(__dirname, "app", "icon.png"));

  tray.on("click", () => {
    if (!win.isFocused()) {
      win.show();
    } else {
      console.log("nah");
    }
  });

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
}



app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});