const electron_2 = window.require("electron");
const ipcRender_2 = electron_2.ipcRenderer;
document.getElementById("span_usernmane_jslogic").innerHTML = ipcRender_2.sendSync('send:user');

//json che contine tutti i dati delle pagine
var JsonMenu = {
    "Menu": [{
            "menu": "CRM",
            "icon": ["fas", "fa-users"],
            "sottoMenu": [{
                    "nomeSottoMenu": "Leads",
                    "pathSottoMenu": "CRM/Leads.html"
                },
                {
                    "nomeSottoMenu": "Opportunità",
                    "pathSottoMenu": "CRM/Opportunita.html"
                },
                {
                    "nomeSottoMenu": "Bacheca",
                    "pathSottoMenu": "CRM/Bacheca.html"
                }
            ],
            "pathMenu": ""
        },
        {
            "menu": "Service(U)",
            "icon": ["fas", "fa-hands-helping"],
            "sottoMenu": [{
                    "nomeSottoMenu": "OrdiniLavoro",
                    "pathSottoMenu": "Service(U)/OrdiniLavoro.html"
                },
                {
                    "nomeSottoMenu": "Calendario",
                    "pathSottoMenu": "Service(U)/Calendario.html"
                },
                {
                    "nomeSottoMenu": "Anomalie",
                    "pathSottoMenu": "Service(U)/Anomalie.html"
                }
            ],
            "pathMenu": ""
        },
        {
            "menu": "Service(P)",
            "icon": ["fas", "fa-hands-helping"],
            "sottoMenu": [{
                    "nomeSottoMenu": "Anomalia",
                    "pathSottoMenu": "Service(P)/Anomalia.html"
                },
                {
                    "nomeSottoMenu": "Rich.Manutenzione",
                    "pathSottoMenu": "Service(P)/Rich.Manutenzione.html"
                }
            ],
            "pathMenu": ""
        },
        {
            "menu": "Fatture",
            "icon": ["fas", "fa-file-invoice-dollar"],
            "sottoMenu": [{
                    "nomeSottoMenu": "Acquisto",
                    "pathSottoMenu": "Fatture/Acquisto.html"
                },
                {
                    "nomeSottoMenu": "Vendita",
                    "pathSottoMenu": "Fatture/Vendita.html"
                }
            ],
            "pathMenu": ""
        },
        {
            "menu": "Ordini Di Vendita",
            "icon": ["fas", "fa-clipboard-list"],
            "sottoMenu": [{
                    "nomeSottoMenu": "VediODV",
                    "pathSottoMenu": "OrdiniDiVendita/VediODV.html"
                }

            ],
            "pathMenu": ""
        },
        {
            "menu": "Ticket(P)",
            "icon": ["fas", "fa-ticket-alt"],
            "sottoMenu": [{
                    "nomeSottoMenu": "Supporto",
                    "pathSottoMenu": "Ticket(P)/Supporto.html"
                },
                {
                    "nomeSottoMenu": "Ricerca Sessione",
                    "pathSottoMenu": "Ticket(P)/RicercaSessione.html"
                },
                {
                    "nomeSottoMenu": "Assegnazione Risorse",
                    "pathSottoMenu": "Ticket(P)/AssegnazioneRisorse.html"
                }

            ],
            "pathMenu": ""
        },
        {
            "menu": "Ticket(I)",
            "icon": ["fas", "fa-ticket-alt"],
            "sottoMenu": [{
                    "nomeSottoMenu": "Helpdesk",
                    "pathSottoMenu": "Ticket(I)/HelpDesk.html"
                },
                {
                    "nomeSottoMenu": "Dett. Ticket",
                    "pathSottoMenu": "Ticket(I)/Dett.Ticket.html"
                },
                {
                    "nomeSottoMenu": "Task",
                    "pathSottoMenu": "Ticket(I)/Task.html"
                },
                {
                    "nomeSottoMenu": "Da Schedulare",
                    "pathSottoMenu": "Ticket(I)/DaSchedulare.html"
                },
                {
                    "nomeSottoMenu": "Ore",
                    "pathSottoMenu": "Ticket(I)/Ore.html"
                }

            ],
            "pathMenu": ""
        },
        {
            "menu": "Conto Lavoro",
            "icon": ["fas", "fa-sign-out-alt"],
            "sottoMenu": [],
            "pathMenu": "ContoLavoro/ContoLavoro.html"
        },
        {
            "menu": "Acquisti",
            "icon": ["fas", "fa-shopping-cart"],
            "sottoMenu": [],
            "pathMenu": "Acquisti/Acquisti.html"
        },
        {
            "menu": "Task Ore",
            "icon": ["fas", "fa-clock"],
            "sottoMenu": [],
            "pathMenu": "Task-Ore/TaskOre.html"
        },
        {
            "menu": "Produzione",
            "icon": ["fas", "fa-industry"],
            "sottoMenu": [],
            "pathMenu": "Produzione/Produzione.html"
        },
        {
            "menu": "Logistica",
            "icon": ["fas", "fa-boxes"],
            "sottoMenu": [{
                    "nomeSottoMenu": "Prodotti/Giac.",
                    "pathSottoMenu": "Logistica/ProdottiGiacc.html"
                },
                {
                    "nomeSottoMenu": "Crea DDT CL",
                    "pathSottoMenu": "Logistica/CreaDDTcl.html"
                },
                {
                    "nomeSottoMenu": "Crea DDT",
                    "pathSottoMenu": "Logistica/CreaDDT.html"
                },
                {
                    "nomeSottoMenu": "Lista Viaggi",
                    "pathSottoMenu": "Logistica/ListaViaggi.html"
                }
            ],
            "pathMenu": ""
        }


    ]
}

CreateMenu();
PermessiMenu();

function logOut() {
    if (window.confirm("Se esci al prossimo Login dovrai reinserire nome utente e password, sicuro di voler uscire? ")) {
        stash.cut('username');
        stash.cut('password');
        stash.cut('ip');
        stash.cut('roleid');
        stash.cut('organizationid');
        stash.cut('clientid');
        stash.cut('warehouseid');
        stash.cut('language');
        ipcRender_2.send('page:change', 0);

    }
}

//Max permessi 7-7-3-3-1A-7-31-1-1-1-1-15
function PermessiMenu() {
    //Declare and set variable 
    const permission = ipcRender_2.sendSync('send:permission');
    const menu = document.getElementsByClassName("macrocategory-permission-menu");
    const array_permission = [];
    const array_permission_setting = [];
    var temp = "";
    var temp2 = "";
    //Prendo i permessi per ogni pagina
    for (let i = 0; i < permission.length; i++) {
        if (permission[i] != '-') {
            if (!isNaN(permission[i])) {
                temp = temp + permission[i];
            } else {
                temp2 = temp2 + permission[i];
            }
            if ((i + 1) == permission.length) {
                array_permission.push(temp);
                if (temp2 != "")
                    array_permission_setting.push(temp2);
                else
                    array_permission_setting.push(" ");
            }

        } else {
            if (temp != "") {
                array_permission.push(temp);
                temp = "";
                if (temp2 != "") {
                    array_permission_setting.push(temp2);
                    temp2 = "";
                } else {
                    array_permission_setting.push(" ");
                }
            }

        }
    }

    ipcRender_2.send('save:permission_settings', array_permission_setting);
    //Controll if the array of permission is set and if there are all permissions for menu
    if (array_permission != undefined && menu.length == array_permission.length) {
        //Cycle for each permission in array_permission
        for (let index = 0; index < menu.length; index++) {
            //If the permession is 0 set display menu none and also the sub_menu 
            if (array_permission[index] == 0) {
                menu[index].style.display = "none";
            } else {
                //Take the permission for the page
                var subMenu_categoryPermission = array_permission[index];
                //Take the sub_menu because you want to show some item menu   
                var sub_menu = menu[index].getElementsByClassName("category-permission-menu");
                //If the sub_menu < 1 it not has a sub menu
                if (sub_menu.length > 1) {
                    //I used the variable potenza to calculate all possible combination, in binary,  for a specific number.
                    //Example: if i have 3 page i have 2^3 possible combination (000,001,010,011,100,101,110,111)
                    var potenza = Math.pow(2, sub_menu.length);
                    //In subMenu_categoryPermission i have the permission for the page and i controll if is it smaller than potenza -1 
                    //Because if there is a permission bigger than number of pow i launch error to notice that there is an error with permission
                    if (subMenu_categoryPermission <= (potenza - 1) && subMenu_categoryPermission > -1) {
                        //Transform from decimal to binary 
                        subMenu_categoryPermission = (subMenu_categoryPermission >>> 0).toString(2);
                        //The utilities of this if and this while is thath i can add 0 if the binary not has a lenght equal the sub menu 
                        if (subMenu_categoryPermission.length < sub_menu.length) {

                            while (subMenu_categoryPermission.length < sub_menu.length) {
                                subMenu_categoryPermission = '0' + subMenu_categoryPermission;
                            }
                        }
                        //The last for is used to show or hide the sub menu on base the permssion  
                        for (let i = 0; i < subMenu_categoryPermission.length; i++) {
                            if (subMenu_categoryPermission[i] == 0) {
                                sub_menu[i].style.display = "none";
                            }

                        }
                    } else {
                        //If there is a problem with a sigle item of menu, this will be hiden
                        alert("Numero permesso troppo elevato per la pagina " + (index + 1));
                        menu[index].style.display = "none";
                    }
                }
            }
        }
    } else {
        //If there are problems the all menu is hide 
        alert("Problem with permession");
        for (let i = 0; i < menu.length; i++) {
            menu[i].style.display = "none";
        }
    }
}

/* Function to filter the table */
function filterFromInputToTable(nameInput, nameTable, indexTd) {
    var input, filter, table, tr, td, i, txtValue;
    //Take the input filter
    input = document.getElementById(nameInput);
    filter = input.value.toUpperCase();
    //Take table and rows
    table = document.getElementById(nameTable);
    tr = table.getElementsByTagName("tr");
    //Cycle to take each row of table 
    for (i = 0; i < tr.length; i++) {
        //Take the cell in position 0 because there is the value of document
        td = tr[i].getElementsByTagName("td")[indexTd];
        if (td) {
            //Take the value of td
            txtValue = td.textContent || td.innerText;
            //If the string in the filter is present in the td it return position start
            //Else return -1 because the string isn't prensent in the td  
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function OrderTable(nameTbodyTable, nCell) {
    var switching = true;
    var shouldSwitch;
    var x, y, index;
    table = document.getElementById(nameTbodyTable);

    while (switching) {
        switching = false;
        for (index = 0; index < table.rows.length - 1; index++) {
            shouldSwitch = false;
            x = table.rows[index].cells[nCell];
            y = table.rows[index + 1].cells[nCell];
            if (x.innerHTML < y.innerHTML) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            table.rows[index].parentNode.insertBefore(table.rows[index + 1], table.rows[index]);
            switching = true;
        }
    }
}


function CreateMenu() {

    var path = require('path');
    filename = path.basename(__filename);
    //prendo tutti gli oggetti contenuti in Menu e li metto in una variabile   
    var arrayMenu = JsonMenu.Menu;
    //prendo l'elemento nella pagina html con il tag "ul"
    var dynamicMenu = document.getElementById("dynamicMenu");

    //ciclo su ogni elemento di Menu
    arrayMenu.forEach(element => {
        //per ogni elemento di Menu creo un "li" e gli assegno una classe
        var liMenu = document.createElement("li");
        liMenu.classList.add("macrocategory-permission-menu");


        //creo elemento "i", assegno la classe e lo appendo all'elemento padre "span" 
        var iconMenu = document.createElement("i");
        iconMenu.classList.add(...element.icon);
        iconMenu.style.marginRight = "5px";

        //se la lunghezza del sottomenu non è zero allora esegui quello all'interno
        if (element.sottoMenu.length != 0) {
            //creo l'elemento "span" gli assegno una classe e lo appendo all'elemento padre "li"
            var spanMenu = document.createElement("span");
            spanMenu.classList.add("opener");
            liMenu.appendChild(spanMenu);
            spanMenu.appendChild(iconMenu);

            /*se index.html
                CRM/LEAds.html
             else
                ../CRM/Opportunità.html
            */

            spanMenu.innerHTML += element.menu;


            //creo un elemento "ul"
            var ulSottomenu = document.createElement("ul");
            //ciclo ogni elemento del sottomenù
            element.sottoMenu.forEach(element1 => {

                //creo elemento "li" gli aggiungo la classe
                var liSottomenu = document.createElement("li");
                liSottomenu.classList.add("category-permission-menu");

                //creo elemento "a" e gli inserisco la voce "nomeSottoMenu" e gli href
                var linkSottoMenu = document.createElement("a");
                linkSottoMenu.innerHTML = element1.nomeSottoMenu;
                if (filename != "index.html") {
                    var temp = "../" + element1.pathSottoMenu;
                    linkSottoMenu.href = temp;
                } else {
                    linkSottoMenu.href = element1.pathSottoMenu;
                }


                liSottomenu.appendChild(linkSottoMenu);
                ulSottomenu.appendChild(liSottomenu);
                liMenu.appendChild(ulSottomenu);
            });
        } else {
            var linkMenu = document.createElement("a");
            if (filename != "index.html") {
                var temp = "../" + element.pathMenu;
                linkMenu.href = temp;
            } else {
                linkMenu.href = element.pathMenu;
            }

            console.log(iconMenu);

            linkMenu.appendChild(iconMenu);
            linkMenu.innerHTML += element.menu;

            liMenu.appendChild(linkMenu);

        }


        dynamicMenu.appendChild(liMenu);
    });
}