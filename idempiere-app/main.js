const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let authToken;
let mainWindow;
let secondaryWindow;
let userName;
let userBPartner;
let userClient;
let userOrg;
let HDRes;
let ip;
let clientId; //JSON
let token1;
let docN;
let warehouseId;
let docID_ODV;
let userPermissions;
//var internetConn = navigator.onLine();

app.on('ready', function() {
    // create new window
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
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
    app.on('closed', function() {
        app.quit();
    });

    //build menu from mainMenu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);

});

function viewCRMWindow() {

    //load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'CRMWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

}

//carica la pagina mainWindow.html su schermo
function viewMainWindow() {

    //load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

}

function createODV_Detail_SecondaryWindow() {
    secondaryWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundColor: '#2e2c29',
        }
    });

    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'ODV_DettaglioRow_SecondaryWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    secondaryWindow.on('close', function() {
        secondaryWindow = null;
    });

}

function createODV_SendRowLine_SecondaryWindow() {
    secondaryWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundColor: '#2e2c29',
        }
    });

    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'ODV_SendRowLine_SecondaryWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    secondaryWindow.on('close', function() {
        secondaryWindow = null;
    });

}

ipcMain.on('save:token', function(e, token) {
    authToken = token;
    //console.log(authToken);
    //console.log('1223');
});

ipcMain.on('delete:token', function(e) {
    authToken = '';
    //console.log(authToken);
    //console.log('1223');
});

ipcMain.on('save:user', function(e, user) {
    userName = user;
    //console.log(authToken);
    //console.log('1223');
});

ipcMain.on('save:bpartner', function(e, bp) {
    userBPartner = bp;
    //console.log('1223');
});

ipcMain.on('save:client', function(e, client) {
    userClient = client;
    console.log(userClient);
});

ipcMain.on('save:org', function(e, org) {
    userOrg = org;
    console.log(userOrg);
});

ipcMain.on('save:hdres', function(e, hdres) {
    HDRes = hdres;
    //console.log('1223');
});

ipcMain.on('save:permission', function(e, permission) {
    userPermissions = permission;
    //console.log('1223');
});

ipcMain.on('save:ip', function(e, IP) {
    ip = IP;
    //console.log('1223');
});

ipcMain.on('save:clientid', function(e, clientid) {
    clientId = clientid;
    //console.log('1223');
});

ipcMain.on('save:token1', function(e, Token1) {
    token1 = Token1;
    //console.log('1223');
});

ipcMain.on('save:docN', function(e, DOCN) {
    docN = DOCN;
    //console.log(docN);
});

ipcMain.on('save:docid:ODV', function(e, DOCID) {
    docID_ODV = DOCID;
    //console.log(docN);
});

ipcMain.on('save:warehouse', function(e, warehouse) {
    warehouseId = warehouse;
    console.log(warehouseId);
});

ipcMain.on('ODV:detailwindow', function(e, token) {
    createODV_Detail_SecondaryWindow();
});

ipcMain.on('ODV:sendrowlinewindow', function(e, token) {
    createODV_SendRowLine_SecondaryWindow();
});

//carica la pagina selezionata su schermo
ipcMain.on('page:change', function(e, page) {
    //console.log(page);
    switch (page) {
        case 0:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'loginWindow.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;
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
        case 8:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'ODV_VediODVWindow.html'),
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
        case 100:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'login2Window.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;
    }

});

ipcMain.on('send:token', function(event, arg) {
    //console.log(arg);  
    event.returnValue = authToken;
});

ipcMain.on('send:user', function(event, arg) {
    //console.log(arg);  
    event.returnValue = userName;
});

ipcMain.on('send:bp', function(event, arg) {
    //console.log(arg);  
    event.returnValue = userBPartner;
});

ipcMain.on('send:client', function(event, arg) {
    //console.log(arg);  
    event.returnValue = userClient;
    console.log(userClient);
});

ipcMain.on('send:org', function(event, arg) {
    //console.log(arg);  
    event.returnValue = userOrg;
    console.log(userOrg);
});

ipcMain.on('send:hdres', function(event, arg) {
    //console.log(arg);  
    event.returnValue = HDRes;
});

ipcMain.on('send:ip', function(event, arg) {
    //console.log(arg);  
    event.returnValue = ip;
});

ipcMain.on('send:clientid', function(event, arg) {
    //console.log(arg);  
    event.returnValue = clientId;
});

ipcMain.on('send:permission', function(event, arg) {
    //console.log(arg);  
    event.returnValue = userPermissions;
});

ipcMain.on('send:token1', function(event, arg) {
    //console.log(arg);  
    event.returnValue = token1;
});

ipcMain.on('send:docN', function(event, arg) {
    //console.log(arg);  
    event.returnValue = docN;
});

ipcMain.on('send:warehouse', function(event, arg) {
    //console.log(arg);  
    event.returnValue = warehouseId;
});

ipcMain.on('send:docid:ODV', function(event, arg) {
    //console.log(arg);  
    event.returnValue = docID_ODV;
});




ipcMain.on('page:CRM', function(e, page) {
    //console.log(page);
    switch (page) {
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

ipcMain.on('page:ServiceU', function(e, page) {
    //console.log(page);
    switch (page) {
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

ipcMain.on('page:ServiceP', function(e, page) {
    //console.log(page);
    switch (page) {
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

ipcMain.on('page:ODV', function(e, page) {
    console.log(page);
    switch (page) {
        case 1:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'ODV_VediODVWindow.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;
        case 2:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'ODV_CreaODVWindow.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;
    }

});

ipcMain.on('page:TicketP', function(e, page) {
    //console.log(page);
    switch (page) {
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
        case 3:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'TicketP_TicketWindow.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;
    }

});

ipcMain.on('page:TicketI', function(e, page) {
    //console.log(page);
    switch (page) {
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

ipcMain.on('page:ODV', function(e, page) {
    //console.log(page);
    switch (page) {
        case 1:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'ODV_VediODVWindow.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;
    }

});

ipcMain.on('page:Fattura', function(e, page) {
    //console.log(page);
    switch (page) {
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

ipcMain.on('page:Logistica', function(e, page) {
    //console.log(page);
    switch (page) {
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



const mainMenuTemplate = [{
    label: 'View',
    submenu: [{
            label: 'CRM',
            click() {
                viewCRMWindow();
            }
        },
        {
            label: 'Main',
            click() {
                viewMainWindow();
            }
        },
        {
            label: 'Quit',
            accellerator: process.platform == 'darwin' ? 'Command+Q' : 'Control+Q',
            click() {
                app.quit();
            }
        }
    ]
}];

const LoginMenuTemplate = [{
    label: 'App',
    submenu: [{
        label: 'Quit',
        accellerator: process.platform == 'darwin' ? 'Command+Q' : 'Control+Q',
        click() {
            app.quit();
        }
    }]
}];

//if mac, add empty object to menu

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

//add dev tools if not in production

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
                label: 'Toggle DevTools',
                accellerator: process.platform == 'darwin' ? 'Command+I' : 'Control+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }

        ]
    });
}