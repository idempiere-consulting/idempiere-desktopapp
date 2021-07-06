const electron_2 = window.require("electron");
const ipcRender_2 = electron_2.ipcRenderer;

document.getElementById("span_usernmane_jslogic").innerHTML = ipcRender_2.sendSync('send:user');


function logOut() {
    if (window.confirm("Se esci al prossimo Login dovrai reinserire nome utente e password, sicuro di voler uscire? ")) {
        stash.cut('username');
        stash.cut('password');
        stash.cut('ip');
        stash.cut('roleid');
        stash.cut('organizationid');
        stash.cut('clientid');
        stash.cut('warehouseid');
        stash.cut('language');
        ipcRender_2.send('page:change', 0);

    }
}