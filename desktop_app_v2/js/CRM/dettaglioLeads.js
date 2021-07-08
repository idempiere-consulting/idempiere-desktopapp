const electronLead = window.require("electron");
const ipcRenderLead = electronLead.ipcRenderer;

const authTokenLead = ipcRenderLead.sendSync('send:authtoken', 'ping');
const ipLead = ipcRenderLead.sendSync('send:ip', 'ping');
const NameLead = ipcRenderLead.sendSync('send:nameLead', 'ping');
console.log(NameLead);
LeadsDetails();

function LeadsDetails(){

    fetch(`http://` + ipLead + `/api/v1/models/AD_User?$filter=Name eq '` + NameLead + `'`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authTokenLead
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
        a = data.records;

        document.getElementById('name').value = a[0].Name;
        document.getElementById('description').value = a[0].Description;
        document.getElementById('phone').value = a[0].Phone;
        document.getElementById('phone2').value = a[0].Phone2;
        document.getElementById('email').value = a[0].EMail;
        document.getElementById('site').value = a[0].URL;
        document.getElementById('birth').value = a[0].Birthday;
        document.getElementById('nbp').value = a[0].BPName;
        document.getElementById('cmpg').value = a[0].C_Campaign_ID.identifier;
        document.getElementById('orgl').value = a[0].LeadSource.identifier;
        document.getElementById('rpstdv').value = a[0].SalesRep_ID.identifier;
        document.getElementById('leadstate').value = a[0].LeadStatus.identifier;

    })
    .catch(error => console.log(error))

}