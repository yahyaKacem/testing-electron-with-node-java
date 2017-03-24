(function(module) {
  'use strict';
  const
    path            = require('path'),
    rimraf          = require('rimraf'),
    appName         = 'testing-electron-with-node-java',
    filesToDelete   = [
      'yarn.lock',
      '.gitignore',
      'tslint.json',
      '.editorconfig',
      'forge.config.js'
    ];
  module.exports = {
    make_targets: {
      darwin: ['zip'],
      linux:  ['deb'],
      win32:  ['squirrel']
    },
    electronPackagerConfig: {
      prune:           true,
      overwrite:       true,
      electronVersion: '1.6.3',
      afterCopy:       [
        (buildPath, electronVersion, platform, arch, callback) => {
          filesToDelete.forEach((filePath) => rimraf.sync(path.join(buildPath, filePath)));
          callback();
        }
      ]
    },
    electronWinstallerConfig: {
      name: appName
    },
    electronInstallerDebian: {
      section:          'Network',
      categories:       ['Network'],
      lintianOverrides: ['changelog-file-missing-in-native-package'],
    },
    electronInstallerRedhat: {},
    github_repository: {
      owner: '',
      name: ''
    },
    windowsStoreConfig: {
      packageName: appName
    }
  };
}(module));
