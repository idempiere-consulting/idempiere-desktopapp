const electron4 = window.require("electron");
const ipcRender4 = electron4.ipcRenderer;

const ip2 = ipcRender4.sendSync('send:ip', 'ping');
const authToken2 = ipcRender4.sendSync('send:authtoken', 'ping');
const clientid2 = ipcRender4.sendSync('send:clientId', 'ping');

var ul;
var selectedDate;

const addTicketP = document.getElementById('addTicketP');
if (addTicketP) {
    addTicketP.addEventListener('click', openTicketPWindow);

} 

const userBPartner4 = ipcRender4.sendSync('send:bp', 'ping');
const userName4 = ipcRender4.sendSync('send:user', 'ping');

if (document.getElementById("fname") != null) {
document.getElementById("fname").value = userName4;
document.getElementById("lname").value = userBPartner4.identifier;
document.getElementById('fname').readOnly = true;
document.getElementById('lname').readOnly = true;
}


console.log(userBPartner4);

const reqSel = document.getElementById('requestType');
const caseDiv = document.getElementById('caseRequest');

const button2 = document.getElementById('sendLine'); 
if(button2 != null){
    button2.addEventListener('click', sendDataTicket);
}

if (reqSel !=null) {
    reqSel.addEventListener('change', function(){
        caseDiv.innerHTML = "";
        if(reqSel.value == 'Anomalia'){
            var text = `<label class="formLabel" for="explain">Descrivi il problema</label>
                        <textarea id="explain" name="explain" placeholder="Es: Utilizzando il processo XDF20 volevo creare la fattura " style="height:200px; width: 100%;"></textarea>`;
            
            caseDiv.innerHTML += text;
            
            text = `<label class="formLabel" for="Document">N° Documento</label>
                    <input type="text" id="Document" name="Document" placeholder="">`
            
            caseDiv.innerHTML += text;
            
            text = `<label class="formLabel" for="explain2">Dettaglio errore a video</label>
                    <textarea id="explain2" name="explain2" placeholder="Es: Nessuno/Documento non trovato" style="height:200px; width: 100%;"></textarea>`;
            caseDiv.innerHTML += text;
            
            text = `<label class="formLabel" for="explain3">Azione che si stava facendo</label>
                    <textarea id="explain3" name="explain3" placeholder="Es: Creazione fattura processo XDF20" style="height:200px; width: 100%;"></textarea>`;
            caseDiv.innerHTML += text;
            
            text = `<label class="formLabel" for="explain4">E' urgente/bloccante?</label>
                    <textarea id="explain4" name="explain4" placeholder="Es: Non è bloccante dovrei fare la fattura entro qualche giorno" style="height:200px; width: 100%;"></textarea>`;
            caseDiv.innerHTML += text;
            
        }
        if(reqSel.value == 'Richiesta di formazione'){
            
            fetch('http://173.249.60.71:3580/api/v1/models/lit_resourcefreeslot_v' ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken2
            }
        }).then(res => {
            return res.json()
            })
            .then(data => {
                console.log(data);
                
                a = data['records']
                
                var text = `<label class="formLabel" for="">Seleziona data e ora per la sessione<label><ul></ul>`;
                caseDiv.innerHTML += text;
                ul = document.querySelector('ul');
                
                a.forEach((record) => {
                
                    const li = document.createElement('li');
                    
                    li.setAttribute("data-value", record.date_slot);
                    var d = new Date(record.date_slot)
                    var M = d.getUTCMonth()+1;
                    const itemText = document.createTextNode(' '+d.getUTCFullYear()+'-'+M+'-'+d.getUTCDate()+'   Ore '+d.getUTCHours()+':00');
                    li.appendChild(itemText);
                    ul.appendChild(li);
                
                });
                //console.log("qwerty");
                
                
                text = `<label class="formLabel" for="explain">Cosa vorresti vedere in questa sessione?<label>
                        <textarea id="explain" name="explain" placeholder="Scrivi qualcosa..." style="height:200px; width: 100%;"></textarea>`;
            
                caseDiv.innerHTML += text;
                
                ul = document.querySelector('ul');
                ul.addEventListener("click", selectItem);
                
                
            })
            .catch(error => console.log(error))
    
        }
        
        
        if(reqSel.value == 'Nuova Richiesta Funzionalità/Sviluppo'){
            var text = `<label class="formLabel" for="explain">Spiega cosa vorresti che sia sviluppato su Idempiere</label>
                        <textarea id="explain" name="explain" placeholder="Scrivi qualcosa..." style="height:200px; width: 100%;"></textarea>`;
            
            caseDiv.innerHTML += text;
        }
        
        if(reqSel.value == 'Altro'){
            var text = `<label class="formLabel" for="explain">Spiega il problema non classificabile dal Tipo Richiesta</label>
                        <textarea id="explain" name="explain" placeholder="Write something.." style="height:200px; width: 100%;"></textarea>`;
            
            caseDiv.innerHTML += text;
        }
        
    });
    
}


function sendDataTicket(e){
    e.preventDefault();
    const UserName = document.getElementById('fname').value;
    const BP = document.getElementById('lname').value;
    const Request = reqSel.value;
    const prio = document.getElementById('priority').value;
    const explain = document.getElementById('explain').value;
    let BodyData;
    
    switch (Request){
        
        case "Anomalia":
        
            const doc = document.getElementById('Document').value;
            const explain2 = document.getElementById('explain2').value;
            const explain3 = document.getElementById('explain3').value;
            const explain4 = document.getElementById('explain4').value;
            BodyData = {
                            "C_BPartner_ID" : { "identifier": BP },
                            "AD_User_ID" : { "identifier": UserName },
                            "AD_Client_ID" : { "identifier": "DEMO" },
                            "R_RequestType_ID" : { "id": 1000000 },
                            "Priority" : { "id": prio },
                            "SalesRep_ID": { "identifier": "DEMOAdmin"},
                            "AD_Role_ID": {"id": 1000000 },
                            "DueType" : { "id": "5" },
                            "AD_Org_ID" : { "id": 0 },
                            "ConfidentialTypeEntry" : {"id" : "C" },
                            "ConfidentialType" : { "id" : "C" },
                            "RequestAmt": 0,
                            "Summary" : explain,
                            "Description" : doc,
                            "Name" : explain2,
                            "Help" : explain3,
                            "Name2" : explain4
                        };
                        
            fetch('http://'+ip2+'/api/v1/windows/request' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken2
            },
            body: JSON.stringify(BodyData)
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                alert("Ticket inviato!");
            })
            .catch(error => console.log(error))
            
            break;
        case "Altro":
        
            BodyData = {
                            "C_BPartner_ID" : { "identifier": BP },
                            "AD_User_ID" : { "identifier": UserName },
                            "AD_Client_ID" : { "identifier": "DEMO" },
                            "R_RequestType_ID" : { "id": 1000002 },
                            "Priority" : { "id": prio },
                            "SalesRep_ID": { "identifier": "DEMOAdmin"},
                            "AD_Role_ID": {"id": 1000000 },
                            "DueType" : { "id": "5" },
                            "AD_Org_ID" : { "id": 0 },
                            "ConfidentialTypeEntry" : {"id" : "C" },
                            "ConfidentialType" : { "id" : "C" },
                            "RequestAmt": 0,
                            "Summary" : explain
                        };
                        
            fetch('http://'+ip2+'/api/v1/windows/request' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken2
            },
            body: JSON.stringify(BodyData)
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                alert("Ticket inviato!");
            })
            .catch(error => console.log(error))
            
            break;
        case "Nuova Richiesta Funzionalità/Sviluppo":
        
            BodyData = {
                            "C_BPartner_ID" : { "identifier": BP },
                            "AD_User_ID" : { "identifier": UserName },
                            "AD_Client_ID" : { "identifier": "DEMO" },
                            "R_RequestType_ID" : { "id": 1000003 },
                            "Priority" : { "id": prio },
                            "SalesRep_ID": { "identifier": "DEMOAdmin"},
                            "AD_Role_ID": {"id": 1000000 },
                            "DueType" : { "id": "5" },
                            "AD_Org_ID" : { "id": 0 },
                            "ConfidentialTypeEntry" : {"id" : "C" },
                            "ConfidentialType" : { "id" : "C" },
                            "RequestAmt": 0,
                            "Summary" : explain
                        };
                        
            fetch('http://'+ip2+'/api/v1/windows/request' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken2
            },
            body: JSON.stringify(BodyData)
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                alert("Ticket inviato!");
            })
            .catch(error => console.log(error))
            
            break;
        case "Richiesta di formazione":
        
            BodyData = {
                            "C_BPartner_ID" : { "identifier": BP },
                            "AD_Client_ID" : { "identifier": "DEMO" },
                            "AD_User_ID": {"identifier": UserName},
                            "AD_Org_ID" : { "id": 1000000 },
                            "S_Resource_ID": {"id": 1000001},
                            "Name" : Request,
                            "Description": explain,
                            "AssignDateFrom" : selectedDate,
                            "PlannedQty": 1
                        };
        
            fetch('http://'+ip2+'/api/v1/windows/resource-assignment' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken2
            },
            body: JSON.stringify(BodyData)
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                alert("Richiesta inviata");
            })
            .catch(error => console.log(error))
    }  
}

function selectItem(e){
    selectedDate = e.target.getAttribute("data-value");
    
    var listitems = document.getElementsByTagName("li");
    
    for (var i = 0; i < listitems.length; i++)
    {
        if (listitems[i].className == "setTextColorSkyblue")
        {
            listitems[i].className = "setTextColorWhite";
            break;
        }
    } 
    e.target.className = "setTextColorSkyblue";
    console.log(selectedDate);
}

function openTicketPWindow() {
    ipcRender4.send('pageTicketP:TicketP_create_window');
}