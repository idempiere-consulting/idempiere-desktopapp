const electron = require('electron');
const {
    ipcRenderer
} = electron;
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const DocInvoice = ipcRenderer.sendSync('send:DocInvoice', 'ping');

console.log(DocInvoice);

LoadInvoiceDetails()

function LoadInvoiceDetails(){
    fetch(`http://` + ip + `/api/v1/models/c_invoice?$filter= DocumentNo eq '` + DocInvoice + `'`, {
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

            console.log(a);

            

            var org = '';
            var BPLocation = '';
            var Currency = '';
            var DocType = '';
            var PaymentTerm = '';
            var CreatedBy = '';
            var DocStatus = '';
            var VATJournal = '';
            var VATPeriod = '';
            var PriceList = '';
            var Paymentrule = '';
            var Status = '';

            if (a[0].AD_Org_ID != undefined){
                org = a[0].AD_Org_ID.identifier;
            }

            if ( a[0].C_BPartner_Location_ID != undefined){
                BPLocation =  a[0].C_BPartner_Location_ID.identifier;
            }

            if (a[0].C_Currency_ID != undefined){
                Currency = a[0].C_Currency_ID.identifier;
            }

            if ( a[0].C_DocType_ID != undefined){
                DocType =  a[0].C_DocType_ID.identifier;
            }

            if (a[0].C_PaymentTerm_ID != undefined){
                PaymentTerm = a[0].C_PaymentTerm_ID.identifier;
            }
            
            if (a[0].CreatedBy != undefined){
                CreatedBy = a[0].CreatedBy.identifier;
            }

            if (a[0].DocStatus != undefined){
                DocStatus = a[0].DocStatus.identifier;
            }

            if (a[0].LIT_VATJournal_ID != undefined){
                VATJournal = a[0].LIT_VATJournal_ID.identifier;
            }

            if (a[0].LIT_VAT_Period_ID != undefined){
                VATPeriod = a[0].LIT_VAT_Period_ID.identifier;
            }

            if (a[0].M_PriceList_ID != undefined){
                PriceList = a[0].M_PriceList_ID.identifier;
            }

             if (a[0].PaymentRule != undefined){
                Paymentrule = a[0].PaymentRule.identifier;
            } 
 
            if (a[0].Status != undefined){
                Status = a[0].Status.identifier;
            }

            console.log(Paymentrule);

            document.getElementById('org').value = org;
            document.getElementById('BPLocation').value = BPLocation;
            document.getElementById('Currency').value = Currency;
            document.getElementById('DocType').value = DocType;
            document.getElementById('PaymentTerm').value = PaymentTerm;
            document.getElementById('CreatedBy').value = CreatedBy;
            document.getElementById('DocStatus').value = DocStatus;
            document.getElementById('VATJournal').value = VATJournal;
            document.getElementById('VATPeriod').value = VATPeriod;
            document.getElementById('PriceList').value = PriceList;
            document.getElementById('PaymentRule').value = Paymentrule;
            document.getElementById('Status').value = Status;
        })

} 