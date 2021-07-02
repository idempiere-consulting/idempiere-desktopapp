const electron = require('electron');
const {
    ipcRenderer
} = electron;
//Take the information for the request api
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const clientid = ipcRenderer.sendSync('send:clientId', 'ping');

getODV();

//Take the sales order
function getODV() {
    //and DocStatus eq 'IP' Per gli odv in corso
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

            a = data['records'];
            //Take each sales order
            a.forEach((record) => {
                var table = document.getElementById('opportunityBody');
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
							<td><a href="#" id="iconLinkWebUrl"><i class="fas fa-2x fa-info-circle"></i></td>
					  </tr>`;
                //Append to table
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


        })
        .catch(error => console.log(error))
}
/* Function to filter the table */
function filterDoc() {
    var input, filter, table, tr, td, i, txtValue;
    //Take the input filter
    input = document.getElementById("myInputDoc");
    filter = input.value.toUpperCase();
    //Take table and rows
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");
    //Cycle to take each row of table 
    for (i = 0; i < tr.length; i++) {
        //Take the cell in position 0 because there is the value of document
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            //Take the value of td
            txtValue = td.textContent || td.innerText;
            //If the string in the filter is present in the td it return position start
            //Else return -1 because the string isn't prensent in the td  
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