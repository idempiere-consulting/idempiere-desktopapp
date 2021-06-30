const electron = require('electron');
const {
    ipcRenderer
} = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const clientid = ipcRenderer.sendSync('send:clientId', 'ping');
getODV();

console.log(clientid, authToken, ip);

function getODV() {

    fetch(`http://` + ip + `/api/v1/models/c_order?$filter= AD_Client_ID eq ` + clientid + ` and IsSOTrx eq true `, {
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

            a = data['records'];
            console.log(a);
            a.forEach((record) => {
                var table = document.getElementById('opportunityBody');
                var bPartner = '',
                    activity = '',
                    DocumentNo = '',
                    Description = '',
                    DateOrdered = '';

                if (record.C_BPartner_ID != undefined)
                    bPartner = record.C_BPartner_ID;
                if (record.DocumentNo != undefined)
                    DocumentNo = record.DocumentNo;
                if (record.Description != undefined)
                    Description = record.Description;
                if (record.DateOrdered != undefined)
                    DateOrdered = record.DateOrdered;

                if (record.C_Activity_ID == undefined) {
                    activity = '';
                } else {
                    activity = record.C_Activity_ID.identifier;
                }

                var row = `<tr class="dataRow">
							<td onkeyup='filterDoc()'>${DocumentNo}</td>
							<td onkeyup='filterClient()'>${bPartner['identifier']}</td>
							<td onkeyup='filterDesc()'>${Description}</td>
							<td onkeyup='filterAct()'>${activity}</td>
							<td onkeyup='filterDate()'>${DateOrdered}</td>
							<td><a href="#" id="iconLinkWebUrl"><i class="fas fa-2x fa-info-circle"></i></td>
					  </tr>`;

                table.innerHTML += row;
                var table = document.getElementById('myTable1');
                for (var i = 2; i < table.rows.length; i++) {
                    console.log(table.rows.length);
                    table.rows[i].cells[5].addEventListener('click', function(infoTable = table.row[i].cells[0].innerHTML) {
                        doc = infoTable.path[3].cells[0].innerHTML;
                        ipcRenderer.send('save:docN', doc);
                        ipcRenderer.send('page:ODV', 3);
                    });
                }
            });


        })
        .catch(error => console.log(error))
}

function filterDoc() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputDoc");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;  console.log(txtValue + filter);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterClient() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputClient");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterDesc() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputDescription");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterAct() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputRes");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterDate() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputDate");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}