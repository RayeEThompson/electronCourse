const { app, BrowserWindow } = require("electron");

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 500,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev ? true : false,
  });
  /*
    There are two ways to load the index html file.
    1. loadURL
    2. loadFile
    **Load file is easier**
  */
  //mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createMainWindow);

//Quit when all windows are closed.
app.on("window-all-closed", () => {
  // MacOS stays active until user quits
  if (!isMac) {
    app.quit;
  }

  app.on("activate", () => {
    //MacOs re-create window when dock icon is clicks and no widows are open
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});
