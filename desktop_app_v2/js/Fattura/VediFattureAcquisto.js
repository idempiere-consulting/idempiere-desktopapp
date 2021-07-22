const electron = require('electron');
const {
    ipcRenderer
} = electron;
//Take the information for the request api
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const clientid = ipcRenderer.sendSync('send:clientId', 'ping');

/* const addODV = document.getElementById('AddODV');
if (addODV != null) {
    addODV.addEventListener('click', openOdvWindow);
}
 */

getFattureAcquisto();



function getFattureAcquisto() {

    fetch(`http://` + ip + `/api/v1/models/c_invoice?$filter= AD_Client_ID eq ` + clientid + ` and IsSOTrx eq false`, {
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
            a = data['records'];

            var table;

            a.forEach((record) => {
                table = document.getElementById('fattureAcquistoBody');



                var row = `<tr class="dataRow">

            							<td>${record.DocumentNo == undefined? '' : record.DocumentNo}</td>
            							<td>${record.GrandTotal == undefined ? '' : record.C_Currency_ID == undefined? '': record.GrandTotal+" "+record.C_Currency_ID.identifier}</td>
            							<td>${record.SalesRep_ID == undefined ? '' : record.SalesRep_ID.identifier}</td>
            							<td>${record.DateInvoiced == undefined ? '': record.DateInvoiced}</td>
            							<td><a href="#" class="iconlink"><i class="fas fa-external-link-alt"></i></td>
                                        
            					  </tr>`;
                //Append to table
                console.log(table);
                table.innerHTML += row;
                var table = document.getElementById('myTable1');
            });

            var btns = document.querySelectorAll('.iconlink');
            Array.prototype.forEach.call(btns, function addClickListener(btn) {
                btn.addEventListener('click', function(event) {
                    console.log(event);
                    var doc = event.path[3].cells[0].innerHTML;

                    ipcRenderer.send('save:docN', doc);
                    ipcRenderer.send('pageCustomerInvoice:details');
                });
            });



            OrderTable("fattureAcquistoBody", 0);
            backgroundRowTable('fattureAcquistoBody');


        })
        .catch(error => console.log(error))
}

function openOdvWindow() {
    ipcRenderer.send('page:ODV:odv_create_window');
}