const electron = require('electron');
const {
    ipcRenderer
} = electron;
//Take the information for the request api
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const clientid = ipcRenderer.sendSync('send:clientId', 'ping');

/* const addODV = document.getElementById('SHOWdetailsInvoice');
if (addODV != null) {
    addODV.addEventListener('click', openinvoiceWindow);
} */


GetFattureVendita()


function GetFattureVendita() {
    fetch(`http://` + ip + `/api/v1/models/c_invoice?$filter= AD_Client_ID eq ` + clientid + ` and IsSOTrx eq true`, {
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
            console.log(a);
            var es;
            a.DocumentNo == undefined ? es = '' : a.DocumentNo;
            var table;
            //Take each sales order
            a.forEach((record) => {
                table = document.getElementById('fattureBody');

                var GrandTotal = '',
                    DocumentNo = '',
                    SalesRep_ID = '';
                DateInvoiced = '';
                //Controll if the attributes are not set

                if (record.DocumentNo != undefined) {
                    DocumentNo = record.DocumentNo;
                }

                if (record.GrandTotal != undefined) {
                    GrandTotal = record.GrandTotal;
                }

                if (record.SalesRep_ID != undefined) {
                    SalesRep_ID = record.SalesRep_ID.identifier;
                }

                if (record.DateInvoiced != undefined) {
                    DateInvoiced = record.DateInvoiced;
                }
                //Insert the value of one sales order in a html row
                var row = `<tr class="dataRow">
							<td >${DocumentNo}</td>
							<td>${GrandTotal}</td>
                            <td>${SalesRep_ID}</td>
							<td>${DateInvoiced}</td>
							<td><a href="#" class="iconLinkWebUrl"><i class="fas fa-2x fa-info-circle"></i></td>
                            <td style="display:none">${record.id}</td>
					  </tr>`;
                //Append to table
                console.log(table);
                table.innerHTML += row;
                var btns = document.querySelectorAll('.iconLinkWebUrl');
                Array.prototype.forEach.call(btns, function addClickListener(btn) {
                    btn.addEventListener('click', function(event) {
                        var invoiceID = event.path[3].cells[0].innerHTML;
                        ipcRenderer.send('save:invoiceId', invoiceID);
                        ipcRenderer.send('pageDetailsInvoice:invoice_details_window');
                    });
                });


            });

            OrderTable("fattureBody", 5);

            backgroundRowTable('fattureBody');


        })
        .catch(error => console.log(error))
}

/* function openinvoiceWindow() {
    ipcRenderer.send('page:ODV:odv_create_window');
} */