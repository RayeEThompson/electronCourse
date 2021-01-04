const { app, BrowserWindow, Menu } = require("electron");

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

//About Window
let aboutWindow;
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: "white",
  });
  aboutWindow.loadFile("./app/about.html");
}

app.on("ready", () => {
  createMainWindow();
  // create menu from template
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on("ready", () => (mainWindow = null));
});

/*
  To create a menu, it is an array of objects.
*/
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  //create Developer Menu in Dev Mode
  ...(isDev
    ? [
        {
          label: Developer,
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "seperator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
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
