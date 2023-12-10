const electron = require("electron");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let childWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  console.log(__dirname);
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}

function createChildWindow(){
  childWindow=new BrowserWindow({
    width:750,
    height:550,
    parent:mainWindow,
    webPreferences: { nodeIntegration: true, contextIsolation: false },

  });
  childWindow.loadFile(path.join(__dirname,'child.html'));

  childWindow.on('closed',function(){
    childWindow=null;
  });
}

app.on('ready',()=>{
  createWindow();

  ipcMain.on('create-child-window',createChildWindow);
});

app.on('window-all-closed',function(){
  if(process.platform !=='darwin') app.quit();
});

app.on('activate',function(){
  if(mainWindow===null) createWindow();
});