const electron_creaLead = window.require("electron");
const ipcRender_Lead = electron_creaLead.ipcRenderer;

//Preso informazioni dal ipcMain
ip = ipcRender_Lead.sendSync('send:ip', 'ping');
authToken = ipcRender_Lead.sendSync('send:authtoken', 'ping');
const clientid = ipcRender_Lead.sendSync('send:clientId', 'ping');
const userBPartner = ipcRender_Lead.sendSync('send:bp', 'ping');
const userName = ipcRender_Lead.sendSync('send:user', 'ping');
const orgId = ipcRender_Lead.sendSync('send:organizationid');
const bp = ipcRender_Lead.sendSync('send:bp');
console.log(bp);
//Json per fare ivari select dello stato del lead e dell'origine del lead
//Metodo per fare in modo che in futuro si interroghi l'api
var objStatusLead = {
    "StatusLead": [{
            "value": "C",
            "name": "Converted"
        },
        {
            "value": "E",
            "name": "Expired"
        },
        {
            "value": "N",
            "name": "New"
        },
        {
            "value": "R",
            "name": "Recycled"
        },
        {
            "value": "W",
            "name": "Working"
        }
    ]

};
var objSourceLead = {
    "SourceLead": [{
            "value": "CC",
            "name": "Cold Call"
        },
        {
            "value": "CN",
            "name": "Conference"
        },
        {
            "value": "EL",
            "name": "Email"
        },
        {
            "value": "EM",
            "name": "Employee"
        },
        {
            "value": "EC",
            "name": "Existing Customer"
        },
        {
            "value": "PT",
            "name": "Partner"
        },
        {
            "value": "TS",
            "name": "Trade Show"
        },
        {
            "value": "WS",
            "name": "Web Site"
        },
        {
            "value": "WM",
            "name": "Word of Mouth"
        }
    ]
};
//Contenitore sinitro del html
var containerDiv = document.getElementById("div_toAddTwoSelect");
var label, itemSelectedLeadStatus, itemSelectedLeadSource;





//Status Lead
//Creazione select dello stato del lead con le rispettive proprietà
var selectStatusLead = document.createElement('select');
selectStatusLead.id = "select_statusLead";
selectStatusLead.name = "statusLead";

//Foreach per aggiungere le option al select,mettendo le varie infomazioni prese dal json
objStatusLead.StatusLead.forEach(element => {
    var option = document.createElement('option');
    option.value = element.value;
    option.innerHTML = element.name;
    selectStatusLead.appendChild(option);
});
//Label per lo stato del lead con le rispettive proprietà
label = document.createElement('label');
label.innerHTML = "Stato Lead";
label.classList.add("formLabel");
label.htmlFor = "label_statusLead";

//Append al div principale
containerDiv.appendChild(label);
itemSelectedLeadStatus = selectStatusLead[0].value;
containerDiv.appendChild(selectStatusLead);



//Source Lead
/*Stessa operazioni di sopra solo per l'orgine del lead*/
var selectSourceLead = document.createElement('select');
selectSourceLead.id = "select_sourceLead";
selectSourceLead.name = "sourceLead";

objSourceLead.SourceLead.forEach(element => {
    var option = document.createElement('option');
    option.value = element.value;
    option.innerHTML = element.name;
    selectSourceLead.appendChild(option);
});
label = document.createElement('label');
label.innerHTML = "Sorgente Lead";
label.classList.add("formLabel");
label.htmlFor = "label_sourceLead";

containerDiv.appendChild(label);
itemSelectedLeadSource = selectSourceLead[0].value;
containerDiv.appendChild(selectSourceLead);


//Dare al buttone evento aggiuntaLead
var sendLead = document.getElementById("sendLead");
if (sendLead != null)
    sendLead.addEventListener('click', addLead);





selectSourceLead.onchange = function() {
    itemSelectedLeadSource = document.getElementById("select_sourceLead").value
}

selectStatusLead.onchange = function() {
    itemSelectedLeadStatus = document.getElementById("select_statusLead").value
}




async function getCampaign() {
    await fetch('http:')
}



async function addLead() {

    var value = document.getElementById("input_chiaveRicerca").innerHTML;
    var email = document.getElementById("input_email").innerHTML;
    var phone = document.getElementById("input_phone").innerHTML;
    var phone2 = document.getElementById("input_phone2").innerHTML;
    var bithday = document.getElementById("input_birthday").innerHTML;
    var name = document.getElementById("input_name").innerHTML;
    var surname = document.getElementById("input_surname").innerHTML;
    var description = document.getElementById("textarea_description").innerHTML;
    var url = document.getElementById("input_url");


    var bodyData = {
        "AD_Client_ID": {
            "id": clientid
        },
        "AD_Org_ID": {
            "id": orgId
        },
        "Value": value,
        "C_BPartner_ID": {
            "id": bp.id
        },
        "C_Campaing_id": {
            "id": 1000001
        },
        "LeadStatus": {
            "identifier": itemSelectedLeadStatus
        },
        "LeadSource": {
            "identifier": itemSelectedLeadSource
        },
        "email": email,
        "phone": phone,
        "phone2": phone2,
        "birthday": bithday,
        "Name": name,
        "surname": surname,
        "Description": description,
        "url": url,
        "IsActive": true,
        "IsSalesLead": true,
        "IsVendorLead": false
    };



    fetch('http://' + ip + '/api/v1/windows/lead', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }

    })

}