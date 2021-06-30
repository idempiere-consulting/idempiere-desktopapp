const electron_login3 = window.require("electron");
const ipcRender_login3 = electron_login3.ipcRenderer;

const ip1 = ipcRender_login3.sendSync('send:ip', 'ping');
const authToken1 = ipcRender_login3.sendSync('send:authtoken', 'ping');
const clientid1 = ipcRender_login3.sendSync('send:clientId', 'ping');

const addODV = document.getElementById('AddODV');
if (addODV) {
    addODV.addEventListener('click', openOdvWindow);

} 


const button1 = document.getElementById('sendBtn'); console.log(button1 + 'ciao');
if(button1 != null){
    button1.addEventListener('click', SendODV);
}

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
                    console.log(data);
                    alert("Ordine di Vendita Salvato!");
                })
                .catch(error => console.log(error))
    
        }
    
    }



function openOdvWindow() {
    ipcRender_login3.send('page:ODV:odv_create_window');
}