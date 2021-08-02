const electron = require('electron');
const {
    ipcRenderer
} = electron;
//Prese le informazioni dal ipcmain
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const clientid = ipcRenderer.sendSync('send:clientId', 'ping');

const addODV = document.getElementById('AddODV');
if (addODV != null) {
    addODV.addEventListener('click', openOdvWindow);
}


getODV();



//Prendere gli ordini di vendita
function getODV() {
    //and DocStatus eq 'IP' Per gli odv in corso
    fetch(`http://` + ip + `/api/v1/models/c_order?$filter= AD_Client_ID eq ` + clientid + ` and IsSOTrx eq true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {

            a = data['records'];
            var table;
            a.forEach((record) => {
                table = document.getElementById('opportunityBody');

                var bPartner = '',
                    activity = '',
                    DocumentNo = '',
                    Description = '',
                    DateOrdered = '';
                //Controllo se le varie informazioni sono prensenti altrimenti non stampa nulla
                if (record.C_BPartner_ID != undefined)
                    bPartner = record.C_BPartner_ID;

                if (record.DocumentNo != undefined)
                    DocumentNo = record.DocumentNo;

                if (record.Description != undefined)
                    Description = record.Description;

                if (record.DateOrdered != undefined)
                    DateOrdered = record.DateOrdered;

                if (record.C_Activity_ID != undefined) {
                    activity = record.C_Activity_ID.identifier;
                }
                //Inserimento di una riga contenente le informazioni di un ODV
                var row = `<tr class="dataRow">
							<td onkeyup='filterDoc()'>${DocumentNo}</td>
							<td onkeyup='filterClient()'>${bPartner['identifier']}</td>
							<td onkeyup='filterDesc()'>${Description}</td>
							<td onkeyup='filterAct()'>${activity}</td>
							<td onkeyup='filterDate()'>${DateOrdered}</td>
							<td><a href="#" class="iconLinkWebUrl"><i class="fas fa-external-link-alt"></i></td>
                            <td style="display:none">${record.id}</td>
					  </tr>`;
                table.innerHTML += row;




            });

            var btns = document.querySelectorAll('.iconLinkWebUrl');
            Array.prototype.forEach.call(btns, function addClickListener(btn) {
                btn.addEventListener('click', function (event) {
                    var doc = event.path[3].cells[0].innerHTML;
                    ipcRenderer.send('save:docN', doc);
                    ipcRenderer.send('page:ODV', 3);
                });
            });



            OrderTable("opportunityBody", 6);

            backgroundRowTable('opportunityBody');


        })
        .catch(error => console.log(error))
}

function openOdvWindow() {
    ipcRenderer.send('page:ODV:odv_create_window');
}