const electron_2 = window.require("electron");
const ipcRender_2 = electron_2.ipcRenderer;
var path = require('path');
var filename = path.basename(__filename);
var base64Image;

document.getElementById("span_usernmane_jslogic").innerHTML = ipcRender_2.sendSync('send:user');
if (filename == "index.html")
    base64Image = ipcRender_2.sendSync('send:imageBase64');
else
    base64Image = ipcRender_2.sendSync('send:imageBase64', '../');

var img = document.getElementsByClassName("img-profile");
img[0].src = base64Image;






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
    //Controllo se l'array of permission è settato e se ci sono tutti i permessi per il menu altrimenti mando un alert di problema
    if (array_permission != undefined && menu.length == array_permission.length) {
        //Ciclo per ogni permesso in array_permission
        for (let index = 0; index < menu.length; index++) {
            //Se il permesso è 0 viene settato il display del menu come none e quindi anche del sotto menu 
            if (array_permission[index] == 0) {
                menu[index].style.display = "none";
            } else {
                //Prende il permesso per ogni pagina
                var subMenu_categoryPermission = array_permission[index];
                var sub_menu = menu[index].getElementsByClassName("category-permission-menu");
                //Se il sotto menu è < 1 significa che non ha il sotto menu
                if (sub_menu.length > 1) {
                    //Ho usato la variabile potenza per calcolare tutte le possibili combinazioni, in bianrio, per il permesso corrente.
                    //Esempio: se abbiamo 3 pagine si hanno 2^3 possibili combinazioni(000,001,010,011,100,101,110,111) e quindi la possibilità di mostrare la prima pagina e non l'ultima(101) ecc.
                    var potenza = Math.pow(2, sub_menu.length);
                    //Nella variabile subMenu_categoryPermission abbiamo i permessi per la pagine e controlliamo se quest'ultima è minore di potenza -1  
                    //Perchè se c'è un permesso maggiore rispetto alla potenza, significa che il permesso è sbaglaito per quella pagina
                    if (subMenu_categoryPermission <= (potenza - 1) && subMenu_categoryPermission > -1) {
                        //Transformiamo da decimale a binario 
                        subMenu_categoryPermission = (subMenu_categoryPermission >>> 0).toString(2);
                        //Questo if serve per aggiungere zeri fino il numero binario non abbia una lunghezza pari al numero di pagine. 
                        if (subMenu_categoryPermission.length < sub_menu.length) {

                            while (subMenu_categoryPermission.length < sub_menu.length) {
                                subMenu_categoryPermission = '0' + subMenu_categoryPermission;
                            }
                        }
                        //L'ultimo for è usato per mostrare o nascondere le pagine del sotto menu in base al permesso  
                        for (let i = 0; i < subMenu_categoryPermission.length; i++) {
                            if (subMenu_categoryPermission[i] == 0) {
                                sub_menu[i].style.display = "none";
                            }

                        }
                    } else {
                        // Se ci sono problemi con un singolo elemento del menu, quest'ultimo verrà nascosto
                        alert("Numero permesso troppo elevato per la pagina " + (index + 1));
                        menu[index].style.display = "none";
                    }
                }
            }
        }
    } else {
        //Se ci sono problemi con il menu,quest'ultimo verrà completamente nascosto 
        alert("Problem with permession");
        for (let i = 0; i < menu.length; i++) {
            menu[i].style.display = "none";
        }
    }
}

/* Function to filter the table */
function filterFromInputToTable(nameInput, nameTable, indexTd) {
    var input, filter, table, tr, td, i, txtValue;
    //Preso gli input type
    input = document.getElementById(nameInput);
    filter = input.value.toUpperCase();
    //Preo la tabella e le righe
    table = document.getElementById(nameTable);
    tr = table.getElementsByTagName("tr");
    //Ciclo per prendere ogni riga della tabella 
    for (i = 0; i < tr.length; i++) {
        //Predere la cella in posizione indexTd in modo da ottere la cella prestabilità
        td = tr[i].getElementsByTagName("td")[indexTd];
        if (td) {
            //Prendere il valore del td
            txtValue = td.textContent || td.innerText;
            //Se la stringa nel filtro è prensete nel td ritornerà la posizione si partenza di quest'ultima
            //Altrimenti se ritorna -1 significa che non è presente e nasconderà quella determinata cella  
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

                /*se il nome del file è diverso da "index.html" allora aggiungi ../ al "pathSottoMenu"
                  altrimenti prendi direttamente il "pathSottoMenu"
                */
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
            //creo l'elemento "a"
            var linkMenu = document.createElement("a");

            if (filename != "index.html") {
                var temp = "../" + element.pathMenu;
                linkMenu.href = temp;
            } else {
                linkMenu.href = element.pathMenu;
            }


            linkMenu.appendChild(iconMenu);
            linkMenu.innerHTML += element.menu;

            liMenu.appendChild(linkMenu);

        }


        dynamicMenu.appendChild(liMenu);
    });
}