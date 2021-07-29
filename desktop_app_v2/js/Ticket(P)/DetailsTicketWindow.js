const electron_detailsTicket = window.require("electron");
const ipcRender_detailsTicket = electron_detailsTicket.ipcRenderer;

const ip = ipcRender_detailsTicket.sendSync('send:ip', 'ping');
const authToken = ipcRender_detailsTicket.sendSync('send:authtoken', 'ping');
const ticketid = ipcRender_detailsTicket.sendSync('send:ticketid', 'ping');
getTicket();

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
            var salesrep = '';

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

            if (a[0].R_Status_ID == undefined) {
                status = '';
            } else {
                var temp = a[0].R_Status_ID.identifier;
                var endIndex = temp.indexOf("_");
                status = temp.replace(temp.substring(0, endIndex + 1), "");
            }
            if (a[0].SalesRep_ID == undefined) {
                salesrep = '';
            } else {
                salesrep = a[0].SalesRep_ID.identifier
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
            document.getElementById('statusRequest').value = status;
            document.getElementById('SalesRep').value = salesrep;
            getLog();


        })
        .catch(error => console.log(error))
}

async function getLog() {
    await fetch('http://' + ip + '/api/v1/models/R_RequestUpdate?$filter=R_Request_ID eq ' + ticketid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            lenght_json = data["row-count"];
            var a = data.records;

            var containLog = document.getElementById("content-log-myDropdown");

            for (let index = lenght_json - 1; index >= 0; index--) {
                var container = document.createElement("div");
                container.classList.add("container");
                var p = document.createElement("p");
                p.innerHTML = a[index].CreatedBy.identifier;
                container.appendChild(p);
                p = document.createElement("p");
                p.innerHTML = a[index].Result;
                container.appendChild(p);
                p = document.createElement("p");
                p.classList.add("time-right");
                if (a[index].Updated != undefined)
                    p.innerHTML = a[index].Updated.replace("Z", "").replace("T", " ");

                container.appendChild(p);
                containLog.appendChild(container);
                if (index == 0) {
                    var container = document.getElementById("container-lastLog");
                    console.log(container);
                    container.innerHTML = a[index].CreatedBy.identifier;
                    container.innerHTML += '<br><br>';
                    container.innerHTML += a[index].Result;
                }
            }
        }).catch(error => console.log(error))
}