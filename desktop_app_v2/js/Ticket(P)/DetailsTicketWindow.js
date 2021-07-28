const electron_detailsTicket = window.require("electron");
const ipcRender_detailsTicket = electron_detailsTicket.ipcRenderer;

const ip = ipcRender_detailsTicket.sendSync('send:ip', 'ping');
const authToken = ipcRender_detailsTicket.sendSync('send:authtoken', 'ping');
const ticketid = ipcRender_detailsTicket.sendSync('send:ticketid', 'ping');
getTicket();

function getTicket() {

    fetch(`http://` + ip + `/api/v1/models/r_request?$filter=DocumentNo eq '` + ticketid + `'`, {
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

            if (a[0].R_Status_ID == undefined) {
                status = '';
            } else {
                var temp = a[0].R_Status_ID.identifier;
                var endIndex = temp.indexOf("_");
                status = temp.replace(temp.substring(0, endIndex + 1), "");
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



        })
        .catch(error => console.log(error))
}