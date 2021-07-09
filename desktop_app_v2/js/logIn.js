const electron = require('electron');

const {
    ipcRenderer
} = electron;


//Declare variable

var token1 = '';
let ip;
let user;
let pass;
let changeRole;



//Take event button
let btn = document.getElementById('btn_login_jslogic');
btn.addEventListener('click', authLogin);

//Controll if there are information in the cache
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

    //First login
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
            //Save the role in base 
            //If is the first login the stash is not set so you must change role
            if (stash.get('username') == undefined) {
                changeRole = true;
                //If you have save the credential you can change the role or take the role of last log-in
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


            //If the remember me is set, it storage in username,password,ip.  
            if (document.getElementById("input_rememberMe_jslogic").checked == true) {
                stash.set('username', user);
                stash.set('password', pass);
                stash.set('ip', ip);
            }
            //save the information of user on ipcmain
            ipcRenderer.send('save:user', user);
            ipcRenderer.send('save:clients', data.clients);
            token1 = data.token;
            ipcRenderer.send('save:token1', token1);
            ipcRenderer.send('save:ip', ip);
            //On base the input type changeRole,you redirect to page or create the token with information in the local storage 
            if (changeRole) {
                ipcRenderer.send('page:change', 100);
            } else {
                authToken();
            }
        })
        .catch(error => {
            alert("Username o password o ip sbagliati!");

        })





}