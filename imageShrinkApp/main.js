const { app, BrowserWindow, Menu, globalShortcut } = require("electron");

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
    backgroundColor: "white",
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

app.on("ready", () => {
  createMainWindow();
  // create menu from template
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  // create global shortcuts
  globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () =>
    mainWindow.toggleDevTools()
  );

  mainWindow.on("ready", () => (mainWindow = null));
});

/*
  To create a menu, it is an array of objects.
*/
const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+W",
        click: () => app.quit(),
      },
    ],
  },
];

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
