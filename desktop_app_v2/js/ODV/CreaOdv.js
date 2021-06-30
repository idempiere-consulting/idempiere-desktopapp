const electron = require('electron');
const { ipcRenderer } = electron;

const ip = ipcRenderer.sendSync('send:ip', 'ping');
const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const clientid = ipcRenderer.sendSync('send:clientId', 'ping');


const button = document.getElementById('sendBtn');
button.addEventListener('click', SendODV);


/*const Rule = document.getElementById('rule').value;
const Priority = document.getElementById('priority').value;
const Shipping = document.getElementById('shipping').value;
const RulesT = document.getElementById('rulesT').value;
const RulesF = document.getElementById('rulesF').value;
const dataOrder = document.getElementById('data1').value;
const dataDelivery = document.getElementById('data2').value;
const Valute = document.getElementById('valute').value;
const RappV = document.getElementById('rappV').value;
const PayM = document.getElementById('payM').value;
const PayD = document.getElementById('payD').value;*/


function SendODV(e) {
e.preventDefault();
    

const Partner = document.getElementById('partner').value; 
const Lname = document.getElementById('lname').value; console.log(Partner + Lname)

    if (Partner == '') {
        return alert("Inserisci il Business Partner");
    } 
    else if (Lname == '') {
        alert("Inserisci il tipo di Documento");
    } 
    else if (Partner && Lname == '') {
        alert("Inserisci il Business Partner e il tipo di Documento");
    }
    else{

        BodyData = {
            "C_BPartner_ID": { "identifier": Partner },
            /*"DeliveryRule" : {"identifier" : Rule},
            "PriorityRule" : {"identifier" : Priority},
            "DeliveryViaRule" : {"identifier" : Shipping},
            "FreightCostRule" : {"identifier" : RulesT},
            "InvoiceRule" : {"id" : RulesF},
            "C_Currency_ID" : {"identifier" : Valute},
            "SalesRep_ID" : {"identifier" : RappV},
            "PaymentRule" : {"identifier" : PayM},
            "C_PaymentTerm_ID" : {"identifier" : PayD},*/
            "C_DocTypeTarget_ID": { "id": Lname },
            "IsSOTrx": true
            /*"DateOrdered" : {"identifier" : dataOrder},
            "DatePromised" : {"identifier" : dataDelivery},*/
        }
        
        
    
        fetch(`http://` + ip + `/api/v1/models/c_order?$filter= AD_Client_ID eq ` + clientid, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(BodyData)
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                alert("Ordine di Vendita Salvato!");
            })
            .catch(error => console.log(error))

    }

}