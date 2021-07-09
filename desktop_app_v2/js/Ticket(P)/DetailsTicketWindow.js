const electron_detailsTicket = window.require("electron");
const ipcRender_detailsTicket = electron_detailsTicket.ipcRenderer;

const ip = ipcRender_detailsTicket.sendSync('send:ip', 'ping');
const authToken = ipcRender_detailsTicket.sendSync('send:authtoken', 'ping');
const ticketid = ipcRender_detailsTicket.sendSync('send:ticketid', 'ping');
console.log(ticketid);
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
            console.log(data);


            a = data.records;
            console.log(a[0].DocumentNo);

            document.getElementById('ndoc').value = a[0].DocumentNo;
            document.getElementById('bp').value = a[0].C_BPartner_ID.identifier;
            document.getElementById('priority').value = a[0].Priority.identifier;
            document.getElementById('priorityuser').value = a[0].PriorityUser.identifier;
            document.getElementById('scandenzaType').value = a[0].DueType.identifier;
            document.getElementById('requestType').value = a[0].R_RequestType_ID.identifier;
            document.getElementById('description').value = a[0].Description;
            document.getElementById('help').value = a[0].Help;
            document.getElementById('summary').value = a[0].Summary;



        })
        .catch(error => console.log(error))
}