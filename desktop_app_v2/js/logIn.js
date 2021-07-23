const electron = require('electron');

const {
    ipcRenderer
} = electron;



//Dichirazione variabili

var token1 = '';
let ip;
let user;
let pass;
let changeRole;



//Evento bottone
let btn = document.getElementById('btn_login_jslogic');
btn.addEventListener('click', authLogin);
document.getElementById("input_username_jslogic").focus();
//controllo se nel localStorage sono prensenti infomazioni
if (stash.get('username') != undefined) {
    document.getElementById("input_username_jslogic").value = stash.get('username');
    document.getElementById("input_rememberMe_jslogic").checked = true;

}
if (stash.get('password') != undefined) {
    document.getElementById("input_password_jslogic").value = stash.get('password');
}

if (stash.get('ip') != undefined) {
    document.getElementById("input_ip_jslogic").value = stash.get('ip');
}




function authLogin(e) {

    e.preventDefault();
    user = document.getElementById('input_username_jslogic').value;
    pass = document.getElementById('input_password_jslogic').value;
    ip = document.getElementById('input_ip_jslogic').value;

    //terzo login 'http://173.249.60.71:3580/api/v1/auth/organizations?client='+data.roles[0].id'&role='+data.roles[0].name
    //secondo login http://173.249.60.71:3580/api/v1/auth/roles?client='+data.clients[0].id  
    //primo login http://173.249.60.71:3580/api/v1/auth/tokens

    //Primo login
    fetch('http://' + ip + '/api/v1/auth/tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: user,
                password: pass
            })
        }).then(res => {
            return res.json()
        })
        .then(data => {
            //Salvataggio ruolo
            //Se lo stash non è settato significa che il ruolo deve essere ancora settato
            if (stash.get('username') == undefined) {
                changeRole = true;
                //Se le credenziali sono salvate, l'utente può cambiare ruolo oppure prendere quello precedente
            } else if (document.getElementById("changeRole").checked == true) {
                changeRole = true;
                stash.cut('cliendid');
                stash.cut('roleid');
                stash.cut('organizationid');
                stash.cut('warehouseid');
                stash.cut('language');
            } else if (user != stash.get('username')) {
                stash.cut('cliendid');
                stash.cut('roleid');
                stash.cut('organizationid');
                stash.cut('warehouseid');
                stash.cut('language');
                changeRole = true;
            } else {
                changeRole = false;
            }


            //Se il ricordami è settato allora salva password,username,ip
            if (document.getElementById("input_rememberMe_jslogic").checked == true) {
                stash.set('username', user);
                stash.set('password', pass);
                stash.set('ip', ip);
            }
            //Salvataggio informazioni utente nel ipcmain
            ipcRenderer.send('save:user', user);
            ipcRenderer.send('save:clients', data.clients);
            token1 = data.token;
            ipcRenderer.send('save:token1', token1);
            ipcRenderer.send('save:ip', ip);
            //In base all'input type del cambio ruolo, verrà carica la pagina di cambio ruolo
            if (changeRole) {
                ipcRenderer.send('page:change', 100);
            } else {
                authToken(" ");
            }
        })
        .catch(error => {
            alert("Username o password o ip sbagliati!");

        })





}