const electron_detailsTicket = window.require("electron");
const ipcRender_detailsTicket = electron_detailsTicket.ipcRenderer;

const ip = ipcRender_detailsTicket.sendSync('send:ip', 'ping');
const authToken = ipcRender_detailsTicket.sendSync('send:authtoken', 'ping');
const ticketid = ipcRender_detailsTicket.sendSync('send:ticketid', 'ping');
const btn = document.getElementById("updateLine");
btn.addEventListener('click', UpdateLine);
var id_salesrep;
var id_statusrequest;
getStatusRequest();


function getTicket() {

    fetch(`http://` + ip + `/api/v1/models/r_request?$filter=R_Request_ID eq ` + ticketid + ``, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {


            a = data.records;
            console.log(a);
            var numDoc = '';
            var businessPartner = '';
            var priority = '';
            var priorityUser = '';
            var dueType = '';
            var requestType = '';
            var description = '';
            var help = '';
            var summary = '';
            var status = '';

            if (a[0].DocumentNo == undefined) {
                numDoc = '';
            } else {
                numDoc = a[0].DocumentNo
            }

            if (a[0].C_BPartner_ID == undefined) {
                businessPartner = '';
            } else {
                businessPartner = a[0].C_BPartner_ID.identifier
            }

            if (a[0].Priority == undefined) {
                priority = '';
            } else {
                priority = a[0].Priority.identifier
            }

            if (a[0].PriorityUser == undefined) {
                priorityUser = '';
            } else {
                priorityUser = a[0].PriorityUser.identifier
            }

            if (a[0].DueType == undefined) {
                dueType = '';
            } else {
                dueType = a[0].DueType.identifier
            }

            if (a[0].R_RequestType_ID == undefined) {
                requestType = '';
            } else {
                requestType = a[0].R_RequestType_ID.identifier
            }

            if (a[0].Description == undefined) {
                description = '';
            } else {
                description = a[0].Description
            }

            if (a[0].Help == undefined) {
                help = '';
            } else {
                help = a[0].Help
            }

            if (a[0].Summary == undefined) {
                summary = '';
            } else {
                summary = a[0].Summary
            }
            if (a[0].R_Status_ID != undefined) {
                var select = document.getElementById("statusRequest");
                for (var i, j = 0; i = select.options[j]; j++) {
                    if (i.value == a[0].R_Status_ID.id) {
                        select.selectedIndex = j;
                        break;
                    }
                }
            }
            if (a[0].SalesRep_ID != undefined) {
                var select = document.getElementById("SalesRep");
                for (var i, j = 0; i = select.options[j]; j++) {
                    if (i.value == a[0].SalesRep_ID.id) {
                        select.selectedIndex = j;
                        break;
                    }
                }
            }

            document.getElementById('ndoc').value = numDoc;
            document.getElementById('bp').value = businessPartner;
            document.getElementById('priority').value = priority;
            document.getElementById('priorityuser').value = priorityUser;
            document.getElementById('scandenzaType').value = dueType;
            document.getElementById('requestType').value = requestType;
            document.getElementById('description').value = description;
            document.getElementById('help').value = help;
            document.getElementById('summary').value = summary;



        })
        .catch(error => console.log(error))
}

async function getStatusRequest() {
    await fetch('http://' + ip + '/api/v1/models/R_Status', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data);
        a = data.records;
        var select = document.getElementById("statusRequest");
        a.forEach(element => {
            var option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.Name;
            select.appendChild(option);
        });
        getSalesRep();
    })
}

async function getSalesRep() {

    var BPartnerId;

    await fetch(`http://` + ip + `/api/v1/models/AD_User?$filter=Name eq 'Da Assegnare'`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        //console.log(data);
        a = data.records;
        a.forEach(element => {
            BPartnerId = element.C_BPartner_ID.id;
        });

    });

    await fetch('http://' + ip + '/api/v1/models/AD_User?$filter=C_BPartner_ID eq ' + BPartnerId + '', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data);
        a = data.records;
        var select = document.getElementById("SalesRep");
        a.forEach(element => {
            var option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.Name;
            select.appendChild(option);
        });
        getTicket();
    })
}

var salesrep = document.getElementById("SalesRep");
var statusreq = document.getElementById("statusRequest");

salesrep.addEventListener('change', function(event) {

    id_salesrep = event.target.options[event.target.selectedIndex].value;

});

statusreq.addEventListener('change', function(event) {

    id_statusrequest = event.target.options[event.target.selectedIndex].value;

});

async function UpdateLine() {

    let bodydata;
    console.log(id_salesrep);
    console.log(id_statusrequest);

    bodydata = {
        "R_Status_ID": {
            "id": id_statusrequest
        },
        "SalesRep_ID": {
            "id": id_salesrep
        }
    };

    fetch('http://' + ip + '/api/v1/models/R_Request/' + ticketid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(bodydata)
        }).then(res => {
            return res.json()
        })
        .then(data => {
            if (data.status != undefined) {
                alert("Problema con la Richiesta")
            } else {
                alert("ticket aggiornato");
                var window = remoteWindows.getCurrentWindow();
                //window.close();
            }
        })
        .catch(error => console.log(error))


}