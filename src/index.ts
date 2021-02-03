/* eslint-disable @typescript-eslint/no-unused-vars */
import { app, BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

const store = new Store({
  defaults: {
    workspaces: [],
    channels: [],
    memos: [],
  },
});
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    height: 600,
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('restore-workspaces-message', (event, arg) => {
  const workspaces = store.get('workspaces');
  event.sender.send('restore-workspaces-reply', workspaces);
});

ipcMain.on('restore-channels-message', (event, arg) => {
  const channels = store.get('channels');
  event.sender.send('restore-channels-reply', channels);
});

ipcMain.on('restore-memos-message', (event, arg) => {
  const memos = store.get('memos');
  event.sender.send('restore-memos-reply', memos);
});

ipcMain.on('restore-memoIds-message', (event, arg) => {
  const memoIds = store.get('memoIds');
  event.sender.send('restore-memoIds-reply', memoIds);
});

ipcMain.on('save-workspaces-message', (event, args) => {
  store.set('workspaces', args);
  event.sender.send('save-workspaces-reply', 'done');
});

ipcMain.on('save-channels-message', (event, args) => {
  store.set('channels', args);
  event.sender.send('save-channels-reply', 'done');
});

ipcMain.on('save-memos-message', (event, args) => {
  store.set('memos', args);
  event.sender.send('save-memos-reply', 'done');
});

ipcMain.on('save-memoIds-message', (event, args) => {
  store.set('memoIds', args);
  event.sender.send('save-memoIds-reply', 'done');
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
