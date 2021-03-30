const electron = require('electron');
const url = require ('url');
const path = require ('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
//var internetConn = navigator.onLine();

app.on('ready', function(){
    // create new window
    mainWindow = new BrowserWindow({
        width:1000,
        height:700,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        }
    });
    //load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'loginWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    app.on('closed', function(){
        app.quit();
    });
    
    //build menu from mainMenu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
    
});

function viewCRMWindow(){
    
    //load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'CRMWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    

}

//carica la pagina mainWindow.html su schermo
function viewMainWindow(){
    
    //load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    
}

//carica la pagina selezionata su schermo
ipcMain.on('page:change', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'CRMWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'mainWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});



const mainMenuTemplate = [
    {
        label: 'View',
        submenu: [
            {
                label: 'CRM',
                click(){
                    viewCRMWindow();
                }
            },
            {
                label: 'Main',
                click(){
                    viewMainWindow();
                }
            },
            {
                label: 'Quit',
                accellerator: process.platform == 'darwin' ? 'Command+Q' : 'Control+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

const LoginMenuTemplate = [
    {
        label: 'App',
        submenu: [
            {
                label: 'Quit',
                accellerator: process.platform == 'darwin' ? 'Command+Q' : 'Control+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//if mac, add empty object to menu

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//add dev tools if not in production

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
                label: 'Toggle DevTools',
                accellerator: process.platform == 'darwin' ? 'Command+I' : 'Control+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
            
        ]
    });
}
