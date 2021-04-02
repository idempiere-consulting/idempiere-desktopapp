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
            contextIsolation: false,
            backgroundColor: '#2e2c29',
        }
    });
    mainWindow.maximize();
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
            pathname: path.join(__dirname, 'CRM_LeadsWindow.html'),
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
        case 3:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ServiceU_OrdinidiLavoroWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 4:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Fatture_AcquistiWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 5:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ServiceP_AnomaliaWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 6:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketP_SupportoWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 7:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketI_HelpDeskWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 10:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Logistica_ProdottiWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});

ipcMain.on('page:CRM', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'CRM_LeadsWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'CRM_OpportunitàWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 3:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'CRM_BachecaWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 4:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'CRM_AppuntamentiWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});

ipcMain.on('page:ServiceU', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ServiceU_OrdinidiLavoroWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ServiceU_CalendarioWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 3:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ServiceU_AnomalieWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});

ipcMain.on('page:ServiceP', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ServiceP_AnomaliaWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'ServiceP_ManutenzioneWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});

ipcMain.on('page:TicketP', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketP_SupportoWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketP_SessioneWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});

ipcMain.on('page:TicketI', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketI_HelpDeskWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketI_DettaglioWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 3:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketI_TaskWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 4:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketI_ScheduleWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 5:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'TicketI_OreWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});

ipcMain.on('page:Fattura', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Fatture_AcquistiWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Fatture_VenditaWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
    }
        
});

ipcMain.on('page:Logistica', function(e, page){
    //console.log(page);
    switch(page){
        case 1:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Logistica_ProdottiWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Logistica_DDTCLWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 3:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Logistica_DDTWindow.html'),
            protocol: 'file:',
            slashes: true
            }));
            break;
        case 4:
            mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'Logistica_ViaggiWindow.html'),
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
