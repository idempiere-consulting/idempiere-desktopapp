const electron_login3 = window.require("electron");
const ipcRender_login3 = electron_login3.ipcRenderer;

const ip1 = ipcRender_login3.sendSync('send:ip', 'ping');
const authToken1 = ipcRender_login3.sendSync('send:authtoken', 'ping');
const clientid1 = ipcRender_login3.sendSync('send:clientId', 'ping');
var Partner = document.getElementById('partner');

if (Partner != null) {
    bpIdentifier = ipcRender_login3.sendSync('send:bp');
    Partner.value = bpIdentifier.identifier;
    Partner.readOnly = true;
}
const button1 = document.getElementById('sendBtn');
if (button1 != null) {
    button1.addEventListener('click', SendODV);
}

function SendODV(e) {
    e.preventDefault();


    Partner = document.getElementById('partner').value;
    const Lname = document.getElementById('lname').value;

    if (Lname == '') {
        alert("Inserisci il tipo di Documento");
    } else {

        BodyData = {
            "C_BPartner_ID": {
                "identifier": Partner
            },
            /*"DeliveryRule" : {"identifier" : Rule},
            "PriorityRule" : {"identifier" : Priority},
            "DeliveryViaRule" : {"identifier" : Shipping},
            "FreightCostRule" : {"identifier" : RulesT},
            "InvoiceRule" : {"id" : RulesF},
            "C_Currency_ID" : {"identifier" : Valute},
            "SalesRep_ID" : {"identifier" : RappV},
            "PaymentRule" : {"identifier" : PayM},
            "C_PaymentTerm_ID" : {"identifier" : PayD},*/
            "C_DocTypeTarget_ID": {
                "id": Lname
            },
            "IsSOTrx": true
            /*"DateOrdered" : {"identifier" : dataOrder},
            "DatePromised" : {"identifier" : dataDelivery},*/
        }



        fetch(`http://` + ip1 + `/api/v1/models/c_order?$filter= AD_Client_ID eq ` + clientid1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken1
                },
                body: JSON.stringify(BodyData)
            }).then(res => {
                return res.json()
            })
            .then(data => {
                if (data.status == undefined)
                    alert("Ordine di Vendita Salvato!");
                else
                    alert("Inserimento non riuscito");
            })
            .catch(error => console.log(error))

    }

}