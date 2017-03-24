(function (require, console) {
  'use strict';
  let win;

  const
    { app, Menu, shell, nativeImage, BrowserWindow } = require('electron'),
    shouldQuit   = app.makeSingleInstance((commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (win) {
        if (win.isMinimized()) {
          win.restore();
        }
        win.focus();
      } else {
        createMainWindow();
      }
    });
  if (shouldQuit) {
    app.quit();
  }

  function createMainMenu() {
    const template = [
      {label: 'File', submenu: [{role: 'quit'}]},
      {
        label: 'Edit',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteandmatchstyle'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {role: 'window', submenu: [{role: 'minimize'}, {role: 'close'}]},
      {role: 'help', submenu: [{label: 'Learn More', click () {shell.openExternal(config.appUrl)}}]}
    ];
    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          {role: 'about'},
          {type: 'separator'},
          {role: 'services', submenu: []},
          {type: 'separator'},
          {role: 'hide'},
          {role: 'hideothers'},
          {role: 'unhide'},
          {type: 'separator'},
          {role: 'quit'}
        ]
      });
      // Edit menu.
      template[1].submenu.push(
        {type: 'separator'},
        {label: 'Speech', submenu: [{role: 'startspeaking'}, {role: 'stopspeaking'}]}
      );
      // Window menu.
      template[3].submenu = [
        {label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close'},
        {label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize'},
        {label: 'Zoom', role: 'zoom'},
        {type: 'separator'},
        {label: 'Bring All to Front', role: 'front'}
      ];
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }

  function createMainWindow () {
    win = new BrowserWindow();
    win.loadURL('http://google.com');
    win.on('ready-to-show', () => win.show());
    win.on('closed', () => win = null);
    win.on('did-fail-load', (e) => console.log('did-fail-load', e));
  }

  app.once('ready', () => {
    createMainMenu();
    createMainWindow();
  });

  app.on('activate', () => {
    if (!win) {
      createMainWindow();
    }
  });
}(require, console));
