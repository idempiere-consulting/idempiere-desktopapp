const electron = require('electron');
const { ipcRenderer } = electron;

const ip = ipcRenderer.sendSync('send:ip', 'ping');
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const docN = ipcRenderer.sendSync('send:docN', 'ping');



function getDetailsLeads() {


    fetch('http://' + ip + '/api/v1/windows/lead', {
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

            document.getElementById('companylead').value = a[0].DocumentNo;
            document.getElementById('organizationlead').value = a[0].C_BPartner_ID.identifier;
            document.getElementById('keysearchlead').value = a[0].DateOrdered;
            document.getElementById('namelead').value = a[0].DatePromised;
            document.getElementById('descriptionlead').value = a[0].C_DocTypeTarget_ID.identifier;
            document.getElementById('phonelead').value = a[0].Bill_BPartner_ID.identifier;
            document.getElementById('phonelead2').value = a[0].DeliveryRule.identifier;
            document.getElementById('emaillead').value = a[0].M_Warehouse_ID.identifier;
            document.getElementById('webaddresslead').value = a[0].DeliveryViaRule.identifier;
            document.getElementById('bornlead').value = a[0].FreightCostRule.identifier;
            document.getElementById('bpnamelead').value = a[0].TotalLines;
            document.getElementById('campagnalead').value = a[0].GrandTotal;
            document.getElementById('salesreplead').value = a[0].GrandTotal;
            document.getElementById('originlead').value = a[0].GrandTotal;
            document.getElementById('leadstatus').value = a[0].GrandTotal;


        })
        .catch(error => console.log(error))



};