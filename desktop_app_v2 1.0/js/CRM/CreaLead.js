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


//Contenitore sinitro del html
var itemSelectedLeadStatus, itemSelectedLeadSource, itemSelectedCampaign;
var selectSourceLead = document.getElementById("select_sourceLead");
var selectStatusLead = document.getElementById('select_statusLead');
var selectCampaign = document.getElementById("select_campaign");


async function getSourceLead() {
    await fetch('http://' + ip + '/api/v1/models/AD_Ref_list?$filter=AD_Reference_ID eq 53415', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }

        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            a = data.records;
            //Source Lead
            /*Stessa operazioni di sopra solo per l'orgine del lead*/
            var option = document.createElement('option');

            a.forEach(element => {
                var option = document.createElement('option');
                option.value = element.Value;
                option.innerHTML = element.Name;
                //console.log(option);
                selectSourceLead.appendChild(option);
                //console.log(element.Value);
            });
        })
        .catch(error => console.log(error))

}




async function getStatusLead() {
    await fetch('http://' + ip + '/api/v1/models/AD_Ref_list?$filter=AD_Reference_ID eq 53416', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }

        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            a = data.records;
            //Source Lead
            /*Stessa operazioni di sopra solo per l'orgine del lead*/
            //Foreach per aggiungere le option al select,mettendo le varie infomazioni prese dal json
            a.forEach(element => {
                var option = document.createElement('option');
                option.value = element.Value;
                option.innerHTML = element.Name;
                selectStatusLead.appendChild(option);
            });
        })
        .catch(error => console.log(error))

}

async function getCampaign() {
    await fetch('http://' + ip + '/api/v1/models/C_Campaign', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }

        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            a = data.records;
            a.forEach(element => {
                var option = document.createElement('option');
                option.value = element.id;
                option.innerHTML = element.Name;
                selectCampaign.appendChild(option);
            });


        })
        .catch(error => console.log(error))
}

async function getBusinessPartner() {
    await fetch('http://' + ip + '/api/v1/models/C_BPartner', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }

        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            a = data.records;


            var container = document.getElementById("input_BPName");
            var dataList = document.createElement("datalist");
            dataList.id = "list_bp";

            a.forEach(element => {
                var option = document.createElement('option');
                option.value = element.Name;
                dataList.appendChild(option);
            });

            container.appendChild(dataList);
        })
        .catch(error => console.log(error))
}











getSourceLead();
getStatusLead();
getCampaign();
getBusinessPartner();


//Dare al buttone evento aggiuntaLead
var sendLead = document.getElementById("sendLead");
if (sendLead != null)
    sendLead.addEventListener('click', addLead);





selectSourceLead.onchange = function() {
    itemSelectedLeadSource = document.getElementById("select_sourceLead").value;
    console.log(itemSelectedLeadSource);
}

selectStatusLead.onchange = function() {
    itemSelectedLeadStatus = document.getElementById("select_statusLead").value;
    console.log(itemSelectedLeadStatus);
}

selectCampaign.onchange = function() {
    itemSelectedCampaign = document.getElementById("select_campaign").value;
    console.log(itemSelectedCampaign);
}








async function addLead(event) {
    event.preventDefault();
    var email = document.getElementById("input_email").value;
    var phone = document.getElementById("input_phone").value;
    var bithday = document.getElementById("input_birthday").value;
    var name = document.getElementById("input_name").value;
    var description = document.getElementById("description").value;
    var url = document.getElementById("input_url").value;
    var bp_name = document.getElementById("input_BPName").value;

    var bodyData = {
        "AD_Client_ID": {
            "id": clientid
        },
        "AD_Org_ID": {
            "id": orgId
        },
        "C_BPartner_ID": {
            "identifier": bp_name
        },
        "C_Campaign_ID": {
            "id": itemSelectedCampaign
        },
        "LeadStatus": {
            "id": itemSelectedLeadStatus
        },
        "LeadSource": {
            "id": itemSelectedLeadSource
        },
        "EMail": email,
        "Phone": phone,
        "Birthday": bithday,
        "Description": description,
        "URL": url,
        "IsActive": true,
        "IsVendorLead": false,
        "Name": name,
        "IsSalesLead": true
    };

    console.log(bodyData);


    fetch('http://' + ip + '/api/v1/models/ad_user?client=' + clientid, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(bodyData)
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
}