# idempiere-desktopapp

## Installazione:

mkdir folder

npm init

npm install --save electron

## Dentro package.json

"scripts": {
    "start": "electron ."
  },
  
## Script di creazione dell'eseguibile:

### Linux

electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds

### Windows

electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"

### Mac OS

electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
