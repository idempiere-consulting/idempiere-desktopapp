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
let clientsInfo; //JSON
let clientId;
let token1;
let docN;
let docID_ODV;
let userPermession;
let changeUserRole;
let roleId;
let organizationId;
let warehouseId;
let language;
let permission_settings = [];
let nameLead;
let ticketId;


//var internetConn = navigator.onLine();

app.on('ready', function() {
    // create new window

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        icon: path.join(__dirname, 'assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            backgroundColor: '#2e2c29',
        }
    });


    mainWindow.maximize();
    //load html file into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/logInPage/LogIn.html'),
        protocol: 'file:',
        slashes: true
    }));
    app.on('closed', function() {
        app.quit();
    });

    app.on('window-all-closed', () => {
        //app.quit();
    })

    //build menu from mainMenu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);

});
// Create a new window 
function createOrderLineWindow() {
    secondaryWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 1000,
        height: 700,
        icon: path.join(__dirname, 'assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            backgroundColor: '#2e2c29',
        }
    });

    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.show()
    })


    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/OrdiniDiVendita/ODV_AddOrderLine_SecondaryWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    secondaryWindow.on('close', function() {
        secondaryWindow = null;
        mainWindow.reload();
    });

}

// Create ODV 
function createODVWindow() {
    secondaryWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 1000,
        height: 400,
        icon: path.join(__dirname, 'assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            backgroundColor: '#2e2c29',
        }
    });

    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.show()
    })


    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/OrdiniDiVendita/CreaODV.html'),
        protocol: 'file:',
        slashes: true
    }));

    secondaryWindow.on('close', function() {
        secondaryWindow = null;
        mainWindow.reload();
    });

}



// Crate a new window 
function showODVDetailsWindow() {
    secondaryWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 1000,
        height: 700,
        icon: path.join(__dirname, 'assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            backgroundColor: '#2e2c29',
        }
    });

    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.show()
    })


    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/OrdiniDiVendita/ODV_DettaglioRow_SecondaryWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    secondaryWindow.on('close', function() {
        secondaryWindow = null;

    });

}

//Create ticketP
function createTicketP() {
    secondaryWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 1000,
        height: 500,
        icon: path.join(__dirname, 'assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            backgroundColor: '#2e2c29',
        }
    });

    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.show()
    })

    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/Ticket(P)/CreaTicket.html'),
        protocol: 'file:',
        slashes: true
    }));

    secondaryWindow.on('close', function() {
        secondaryWindow = null;
        mainWindow.reload();
    });

}


function DetailtsTicketWindow() {
    secondaryWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 1000,
        height: 500,
        icon: path.join(__dirname, 'assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            backgroundColor: '#2e2c29',
        }
    });

    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.show()
    })

    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/Ticket(P)/DetailsTicketWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    secondaryWindow.on('close', function() {
        secondaryWindow = null;
        mainWindow.reload();
    });

}

//LEADS DETALIS
function infoLeads() {
    secondaryWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: false,
        width: 1000,
        height: 700,
        icon: path.join(__dirname, 'assets/images/logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            backgroundColor: '#2e2c29',
        }
    });
    secondaryWindow.once('ready-to-show', () => {
        secondaryWindow.show()
    })
    secondaryWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/CRM/dettaglioLeads.html'),
        protocol: 'file:',
        slashes: true
    }));
    secondaryWindow.on('close', function() {
        secondaryWindow = null;

    });

}














/* Save the information from ipcRender  */

ipcMain.on('save:user', function(e, user) {
    userName = user;
});

ipcMain.on('save:clients', function(e, clients) {
    clientsInfo = clients;
});
ipcMain.on('save:clientId', function(e, clientid) {
    clientId = clientid;
    e.returnValue = 'test';
});

ipcMain.on('save:token1', function(e, Token1) {
    token1 = Token1;
});

ipcMain.on('save:ip', function(e, IP) {
    ip = IP;
});

ipcMain.on('save:changeRole', function(e, changerole) {
    changeUserRole = changerole;
});

ipcMain.on('save:roleid', function(e, roleid) {
    roleId = roleid;
});

ipcMain.on('save:organizationid', function(e, organizationid) {

    organizationId = organizationid;
});

ipcMain.on('save:warehouseid', function(e, warehouseid) {
    warehouseId = warehouseid;
});

ipcMain.on('save:roleid', function(e, Language) {
    language = Language;
});


ipcMain.on('save:authtoken', function(e, authtoken) {
    authToken = authtoken;
});

ipcMain.on('save:bpartner', function(e, bp) {
    userBPartner = bp;
});

ipcMain.on('save:docN', function(e, DOCN) {
    docN = DOCN;
});

ipcMain.on('save:docid:ODV', function(e, DOCID) {
    docID_ODV = DOCID;
});

ipcMain.on('save:permission', function(e, permission) {
    userPermession = permission;
    e.returnValue = userPermession;

});

ipcMain.on('save:permission_settings', function(e, permission_s) {
    permission_settings = permission_s;

});

ipcMain.on('save:nameLead', function(e, Name) {
    nameLead = Name;

});

ipcMain.on('save:ticketid', function(event, ticket) {
    ticketId = ticket;
});










ipcMain.on('send:user', function(event, arg) {
    event.returnValue = userName;
});

ipcMain.on('send:clients', function(event, arg) {
    event.returnValue = clientsInfo;
});
ipcMain.on('send:clientId', function(event, arg) {
    event.returnValue = clientId;
});

ipcMain.on('send:token1', function(event, arg) {
    event.returnValue = token1;
});

ipcMain.on('send:ip', function(event, arg) {
    event.returnValue = ip;
});
ipcMain.on('send:changeRole', function(event, arg) {
    event.returnValue = changeUserRole;
});

ipcMain.on('send:roleid', function(event, arg) {
    event.returnValue = roleId;
});

ipcMain.on('send:organizationid', function(event, arg) {
    event.returnValue = organizationId;
});

ipcMain.on('send:warehouseid', function(event, arg) {
    event.returnValue = warehouseId;
});

ipcMain.on('send:bp', function(event, arg) {
    event.returnValue = userBPartner;
});
ipcMain.on('send:language', function(event, arg) {
    event.returnValue = language;
});

ipcMain.on('send:authtoken', function(event, arg) {
    event.returnValue = authToken;
});


ipcMain.on('send:docN', function(event, arg) {
    event.returnValue = docN;
});

ipcMain.on('send:docid:ODV', function(event, arg) {
    event.returnValue = docID_ODV;
});

ipcMain.on('send:permission', function(event, arg) {
    event.returnValue = userPermession;
});

ipcMain.on('send:permission_settings', function(event, arg) {
    event.returnValue = permission_settings;
});

ipcMain.on('send:nameLead', function(event, arg) {
    event.returnValue = nameLead;
});

ipcMain.on('send:ticketid', function(event, arg) {
    event.returnValue = ticketId;
});
















/* Change the page on the screen  */

ipcMain.on('page:change', function(e, page) {
    switch (page) {
        case 0:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'src/logInPage/LogIn.html'),
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
                pathname: path.join(__dirname, 'src/index.html'),
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
                pathname: path.join(__dirname, 'src/logInPage/logIn2.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;
    }

});

ipcMain.on('page:ODV', function(e, page) {
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
        case 3:
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'src/OrdiniDiVendita/ODV_DettaglioODVWindow.html'),
                protocol: 'file:',
                slashes: true
            }));
            break;

    }

});





ipcMain.on('pageODV:orderLineWindow', function(e, arg) {
    createOrderLineWindow();
});

ipcMain.on('page:ODV:odv_details_window', function(e, arg) {
    showODVDetailsWindow();
});

ipcMain.on('page:ODV:odv_create_window', function(e, arg) {
    createODVWindow();
});

ipcMain.on('pageTicketP:TicketP_create_window', function(e, arg) {
    createTicketP();
});

ipcMain.on('pageTicketP:TicketP_details_window', function(e, arg) {
    DetailtsTicketWindow();
});

ipcMain.on('pageInfoLeads:Leads_info_window', function(e, arg) {
    infoLeads();
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