const electron = require('electron');
const {
    ipcRenderer
} = electron;
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const DocInvoice = ipcRenderer.sendSync('send:docN', 'ping');
var idInvoice;

LoadInvoiceDetails()

async function LoadInvoiceDetails() {
    await fetch(`http://` + ip + `/api/v1/models/c_invoice?$filter= DocumentNo eq '` + DocInvoice + `'`, {
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

            idInvoice = a[0].id;
            document.getElementById('org').value = a[0].AD_Org_ID != undefined ? a[0].AD_Org_ID.identifier : '';
            document.getElementById('BPLocation').value = a[0].C_BPartner_Location_ID != undefined ? a[0].C_BPartner_Location_ID.identifier : '';
            document.getElementById('Currency').value = a[0].C_Currency_ID != undefined ? a[0].C_Currency_ID.identifier : '';
            document.getElementById('DocType').value = a[0].C_DocType_ID != undefined ? a[0].C_DocType_ID.identifier : '';
            document.getElementById('PaymentTerm').value = a[0].C_PaymentTerm_ID != undefined ? a[0].C_PaymentTerm_ID.identifier : '';
            document.getElementById('CreatedBy').value = a[0].CreatedBy != undefined ? a[0].CreatedBy.identifier : '';
            document.getElementById('DocStatus').value = a[0].DocStatus != undefined ? a[0].DocStatus.identifier : '';
            document.getElementById('VATJournal').value = a[0].LIT_VATJournal_ID != undefined ? a[0].LIT_VATJournal_ID.identifier : '';
            document.getElementById('VATPeriod').value = a[0].LIT_VAT_Period_ID != undefined ? a[0].LIT_VAT_Period_ID.identifier : '';
            document.getElementById('PriceList').value = a[0].M_PriceList_ID != undefined ? a[0].M_PriceList_ID.identifier : '';
            document.getElementById('PaymentRule').value = a[0].PaymentRule != undefined ? a[0].PaymentRule.identifier : '';
            document.getElementById('Status').value = a[0].Status != undefined ? a[0].Status.identifier : '';
        });
    await getInvoiceLine();
}



function getInvoiceLine() {
    fetch(`http://` + ip + `/api/v1/models/c_invoiceline?$filter=C_Invoice_ID eq ` + idInvoice, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
                var a = data.records;
                console.log(a);
                var tbody;
                var totale = 0;
                a.forEach(element => {
                            tbody = document.getElementById("InvoceInlineBody");
                            var row = `<tr>
                                <td>${element.M_Product_ID != undefined?element.M_Product_ID.identifier:''}</td>
                                <td>${element.Description != undefined? 
                                        element.PriceEntered != undefined ?
                                            element.Description +`<br><span>${element.PriceEntered}€per prodotto<span>` : ''
                                        :''}</td>
                                <td>${element.QtyInvoiced != undefined ? element.QtyInvoiced : ''}</td>
                                <td>${element.LineTotalAmt != 0 ? element.LineTotalAmt : element.LineNetAmt}</td>
                                <td>${element.C_Tax_ID != undefined ?  element.C_Tax_ID.identifier : ''}</td>
                            </tr>
                `;
                if(element.LineTotalAmt != undefined && element.LineTotalAmt !=0)
                    totale += element.LineTotalAmt;
                else
                    totale+=element.LineNetAmt;
                console.log(row);
                tbody.innerHTML += row;
            });
            var endRow = `<tr>
                            <td colspan="3"></td>
                            <td style="border:3px solid green;" colspan="3">Totale:${totale}€</td>
                        </tr>`;
            tbody.innerHTML += endRow;


        });




}