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
    console.log(idInvoice)
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
            /*    a.forEach(element => {

               }); */



        });




}