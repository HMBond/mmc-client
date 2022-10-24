const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    fullscreen: true,
  });

  win.loadURL(
    isDev ? process.env.CYPRESS_BASE_URL : `file://${path.join(__dirname, '../dist/index.html')}`
  );
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
