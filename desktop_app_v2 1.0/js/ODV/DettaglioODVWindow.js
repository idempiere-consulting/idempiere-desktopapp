const electron = require('electron');
const {
    ipcRenderer
} = electron;

const ip = ipcRenderer.sendSync('send:ip', 'ping');
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const docN = ipcRenderer.sendSync('send:docN', 'ping');
getODV();

function getODV() {

    fetch(`http://` + ip + `/api/v1/models/c_order?$filter=DocumentNo eq '` + docN + `'`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {

            //var pData = JSON.parse(data)

            a = data.records;

            document.getElementById('ndoc').value = a[0].DocumentNo;
            document.getElementById('bp').value = a[0].C_BPartner_ID.identifier;
            document.getElementById('dateordered').value = a[0].DateOrdered;
            document.getElementById('datepromised').value = a[0].DatePromised;
            document.getElementById('doctype').value = a[0].C_DocTypeTarget_ID.identifier;
            document.getElementById('bill_bpartner').value = a[0].Bill_BPartner_ID.identifier;
            document.getElementById('delrule').value = a[0].DeliveryRule.identifier;
            document.getElementById('warehouse').value = a[0].M_Warehouse_ID.identifier;
            document.getElementById('deliverer').value = a[0].DeliveryViaRule.identifier;
            document.getElementById('delivercostrule').value = a[0].FreightCostRule.identifier;
            document.getElementById('totline').value = a[0].TotalLines;
            document.getElementById('tot').value = a[0].GrandTotal;

        })
        .catch(error => console.log(error))
}