const electron_main = window.require("electron");
const ipcRender_main = electron_main.ipcRenderer;

const authToken = ipcRender_main.sendSync('send:authtoken', 'ping');
const clientid = ipcRender_main.sendSync('send:clientId', 'ping');
const ip = ipcRender_main.sendSync('send:ip', 'ping');

const data = ipcRender_main.sendSync('send:Notifications', 'ping');

console.log(data);

var a = data.records;

a.forEach(record => {
    //var container = document.getElementById("containerTheme");
    var leads = document.getElementById("LEADS");
    var opportunita = document.getElementById("OPPORTUNITA");
    var workorder = document.getElementById("WORKORDER");
    var fdv = document.getElementById("FDV");
    var fda = document.getElementById("FDA");
    var odv = document.getElementById("ODV");
    var ticket = document.getElementById("TICKET");

    var card = document.createElement("div");
    card.classList.add("card");
    var container2 = document.createElement("div");
    container2.classList.add("container2");
    var b = document.createElement("b");
    var h4 = document.createElement("h4");
    var p = document.createElement("p");

    b.innerHTML = record.DocType + " - " + record.id;
    h4.appendChild(b);
    container2.appendChild(h4)
    p.innerHTML = record.SalesRep_ID.id;
    container2.appendChild(p);
    card.appendChild(container2);

    switch (record.DocType) {
        case "LEAD":
            leads.appendChild(card);
            break;
        case "OPPORTUNITA":
            opportunita.appendChild(card);
            break;
        case "WORKORDER":
            workorder.appendChild(card);
            break;
        case "FDV":
            fdv.appendChild(card);
            break;
        case "FDA":
            fda.appendChild(card);
            break;
        case "ODV":
            odv.appendChild(card);
            break;
        case "TICKET":
            ticket.appendChild(card);
            break;

    }
    //console.log();
    //container.appendChild(card);

});