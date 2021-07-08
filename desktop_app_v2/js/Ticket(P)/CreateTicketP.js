const electron_creaTicket = window.require("electron");
const ipcRender_CreaTicket = electron_creaTicket.ipcRenderer;

const ip2 = ipcRender_CreaTicket.sendSync('send:ip', 'ping');
const authToken2 = ipcRender_CreaTicket.sendSync('send:authtoken', 'ping');
const clientid2 = ipcRender_CreaTicket.sendSync('send:clientId', 'ping');

var array_blockedRequest = [];
var itemSelected;
var select_hour;


var ul;
var selectedDate;

const addTicketP = document.getElementById('addTicketP');
if (addTicketP) {
    addTicketP.addEventListener('click', openTicketPWindow);
}

const userBPartner4 = ipcRender_CreaTicket.sendSync('send:bp', 'ping');
const userName4 = ipcRender_CreaTicket.sendSync('send:user', 'ping');
if (document.getElementById("input_user") != null) {
    document.getElementById("input_user").value = userName4;
    document.getElementById("input_BusinessPartner").value = userBPartner4.identifier;
    document.getElementById('input_user').readOnly = true;
    document.getElementById('input_BusinessPartner').readOnly = true;
}

const select_reqType = document.getElementById('requestType');
const caseDiv = document.getElementById('caseRequest');

const button_SendTicket = document.getElementById('sendLine');
if (button_SendTicket != null) {
    button_SendTicket.addEventListener('click', sendDataTicket);
}


if (select_reqType != null) {
    select_reqType.addEventListener('change', function() {
        caseDiv.innerHTML = "";
        if (select_reqType.value == 'Anomalia') {
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
        if (select_reqType.value == 'Richiesta di formazione') {

            getRichiesteFormazione();

            console.log(array_blockedRequest);

            getSlotLiberi();









        }


        if (select_reqType.value == 'Nuova Richiesta Funzionalità/Sviluppo') {
            var text = `<label class="formLabel" for="explain">Spiega cosa vorresti che sia sviluppato su Idempiere</label>
                    <textarea id="explain" name="explain" placeholder="Scrivi qualcosa..." style="height:200px; width: 100%;"></textarea>`;

            caseDiv.innerHTML += text;
        }

        if (select_reqType.value == 'Altro') {
            var text = `<label class="formLabel" for="explain">Spiega il problema non classificabile dal Tipo Richiesta</label>
                    <textarea id="explain" name="explain" placeholder="Write something.." style="height:200px; width: 100%;"></textarea>`;

            caseDiv.innerHTML += text;
        }

    });
}



function sendDataTicket(e) {
    e.preventDefault();
    const UserName = document.getElementById('input_user').value;
    const BP = document.getElementById('input_BusinessPartner').value;
    const tipoDiRichiesta = select_reqType.value;
    const prio = document.getElementById('priority').value;
    const explain = document.getElementById('explain').value;
    const qtyHour = document.getElementById("qty-planned").value;
    let BodyData;



    switch (tipoDiRichiesta) {

        case "Anomalia":

            const doc = document.getElementById('Document').value;
            const explain2 = document.getElementById('explain2').value;
            const explain3 = document.getElementById('explain3').value;
            const explain4 = document.getElementById('explain4').value;
            BodyData = {
                "C_BPartner_ID": { "identifier": BP },
                "AD_User_ID": { "identifier": UserName },
                "AD_Client_ID": { "identifier": "DEMO" },
                "R_RequestType_ID": { "id": 1000000 },
                "Priority": { "id": prio },
                "SalesRep_ID": { "identifier": "DEMOAdmin" },
                "AD_Role_ID": { "id": 1000000 },
                "DueType": { "id": "5" },
                "AD_Org_ID": { "id": 0 },
                "ConfidentialTypeEntry": { "id": "C" },
                "ConfidentialType": { "id": "C" },
                "RequestAmt": 0,
                "Summary": explain,
                "Description": doc,
                "Name": explain2,
                "Help": explain3,
                "Name2": explain4
            };

            fetch('http://' + ip2 + '/api/v1/windows/request', {
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
                "C_BPartner_ID": { "identifier": BP },
                "AD_User_ID": { "identifier": UserName },
                "AD_Client_ID": { "identifier": "DEMO" },
                "R_RequestType_ID": { "id": 1000002 },
                "Priority": { "id": prio },
                "SalesRep_ID": { "identifier": "DEMOAdmin" },
                "AD_Role_ID": { "id": 1000000 },
                "DueType": { "id": "5" },
                "AD_Org_ID": { "id": 0 },
                "ConfidentialTypeEntry": { "id": "C" },
                "ConfidentialType": { "id": "C" },
                "RequestAmt": 0,
                "Summary": explain
            };

            fetch('http://' + ip2 + '/api/v1/windows/request', {
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
                "C_BPartner_ID": { "identifier": BP },
                "AD_User_ID": { "identifier": UserName },
                "AD_Client_ID": { "identifier": "DEMO" },
                "R_RequestType_ID": { "id": 1000003 },
                "Priority": { "id": prio },
                "SalesRep_ID": { "identifier": "DEMOAdmin" },
                "AD_Role_ID": { "id": 1000000 },
                "DueType": { "id": "5" },
                "AD_Org_ID": { "id": 0 },
                "ConfidentialTypeEntry": { "id": "C" },
                "ConfidentialType": { "id": "C" },
                "RequestAmt": 0,
                "Summary": explain
            };

            fetch('http://' + ip2 + '/api/v1/windows/request', {
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
                "C_BPartner_ID": { "identifier": BP },
                "AD_Client_ID": { "identifier": "DEMO" },
                "AD_User_ID": { "identifier": UserName },
                "AD_Org_ID": { "id": 1000000 },
                "S_Resource_ID": { "id": 1000001 },
                "Name": tipoDiRichiesta,
                "Description": explain,
                "AssignDateFrom": itemSelected,
                "Qty": qtyHour
            };

            fetch('http://' + ip2 + '/api/v1/windows/resource-assignment', {
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

function openTicketPWindow() {
    ipcRender_CreaTicket.send('pageTicketP:TicketP_create_window');
}



async function getRichiesteFormazione() {

    await fetch('http://' + ip2 + '/api/v1/windows/resource-assignment', {
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
            a = data['window-records'];
            a.forEach((record) => {
                array_blockedRequest.push(record);
            });



        })
        .catch(error => console.log(error))

}


async function getSlotLiberi() {
    await fetch('http://' + ip2 + '/api/v1/models/lit_resourcefreeslot_v', {
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
            select_hour = document.createElement("select");
            select_hour.setAttribute("id", "selectHour");

            var text = `<label class="formLabel" for="">Seleziona data e ora per la sessione<label><ul></ul>`;
            caseDiv.innerHTML += text;

            a.forEach((record) => {
                var guardia = true;
                var option = document.createElement("option");
                var date_slot = record.date_slot;
                if (date_slot.indexOf("16:") == -1) {

                    for (let index = 0; index < array_blockedRequest.length; index++) {
                        /* console.log(index + "____________________________")
                        console.log("slot libero?: " + date_slot);
                        console.log("DA " + array_blockedRequest[index].AssignDateFrom);
                        console.log("A: " + array_blockedRequest[index].AssignDateTo); 
                        console.log((date_slot < array_blockedRequest[index].AssignDateFrom || date_slot > array_blockedRequest[index].AssignDateTo));
                        */
                        if (!(date_slot < array_blockedRequest[index].AssignDateFrom || date_slot >= array_blockedRequest[index].AssignDateTo)) {
                            guardia = false
                            break;
                        }

                    }
                    if (guardia) {
                        option.value = date_slot;
                        var d = new Date(date_slot)
                        var M = d.getUTCMonth() + 1;
                        const itemText = d.getUTCFullYear() + '-' + M + '-' + d.getUTCDate() + '   Ore ' + d.getUTCHours() + ':00';
                        option.text = itemText;
                        select_hour.appendChild(option);
                    }
                }

            });

            caseDiv.appendChild(select_hour);
            text = `<label class="formLabel" for="hour">Quante ore?<label>`;
            caseDiv.innerHTML += text;
            var hour = `<input id="qty-planned" type="number" max=3 min=1 value=1>`;

            caseDiv.innerHTML += hour;
            text = `<label class="formLabel" for="explain">Cosa vorresti vedere in questa sessione?<label>
                <textarea id="explain" name="explain" placeholder="Scrivi qualcosa..." style="height:200px; width: 100%;"></textarea>`;
            caseDiv.innerHTML += text;

            select_hour = document.getElementById('selectHour');
            select_hour.onchange = function() {
                comboboxItemSelected();
            }





        })
        .catch(error => console.log(error))
}

function comboboxItemSelected() {
    itemSelected = document.getElementById('selectHour').value;
}