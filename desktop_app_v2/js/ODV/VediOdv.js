const electron = require('electron');
const {
    ipcRenderer
} = electron;
//Take the information for the request api
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const clientid = ipcRenderer.sendSync('send:clientId', 'ping');

const addODV = document.getElementById('AddODV');
if (addODV != null) {
    addODV.addEventListener('click', openOdvWindow);
}


getODV();



//Take the sales order
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
            console.log(table);
            //Take each sales order
            a.forEach((record) => {
                table = document.getElementById('opportunityBody');

                var bPartner = '',
                    activity = '',
                    DocumentNo = '',
                    Description = '',
                    DateOrdered = '';
                //Controll if the attributes are not set
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
                //Insert the value of one sales order in a html row
                var row = `<tr class="dataRow">
							<td onkeyup='filterDoc()'>${DocumentNo}</td>
							<td onkeyup='filterClient()'>${bPartner['identifier']}</td>
							<td onkeyup='filterDesc()'>${Description}</td>
							<td onkeyup='filterAct()'>${activity}</td>
							<td onkeyup='filterDate()'>${DateOrdered}</td>
							<td><a href="#" id="iconLinkWebUrl"><i class="fas fa-external-link-alt"></i></td>
                            <td style="display:none">${record.id}</td>
					  </tr>`;
                //Append to table
                console.log(table);
                table.innerHTML += row;
                var table = document.getElementById('myTable1');
                //Cycle to create a event button. It is used to open the page DettaglioODV.html and save the current document that you want to inspect
                for (var i = 2; i < table.rows.length; i++) {
                    //infoTable used to take the cell where there is the name document and save it in the ipcMain
                    table.rows[i].cells[5].addEventListener('click', function(infoTable = table.row[i].cells[0].innerHTML) {
                        doc = infoTable.path[3].cells[0].innerHTML;
                        ipcRenderer.send('save:docN', doc);
                        ipcRenderer.send('page:ODV', 3);
                    });
                }





            });

            OrderTable("opportunityBody", 6);

            backgroundRowTable('opportunityBody');


        })
        .catch(error => console.log(error))
}

function openOdvWindow() {
    ipcRenderer.send('page:ODV:odv_create_window');
}