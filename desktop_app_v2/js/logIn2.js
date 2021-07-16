const electron_login2 = window.require("electron");
const ipcRender_login2 = electron_login2.ipcRenderer;

//Declare and set attribute
var roleId, organizationId, warehouseId, language;
ip = ipcRender_login2.sendSync('send:ip');
token1 = ipcRender_login2.sendSync('send:token1');
var token;

//Second authentication
async function authRoles() {
    clientId = ipcRender_login2.sendSync('send:clientId');
    if (clientId != undefined) {
        await fetch('http://' + ip + '/api/v1/auth/roles?client=' + clientId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token1
                }
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                var selectRole = document.getElementById("selectRole");
                var roles = data.roles;
                for (var i = 0; i < roles.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = roles[i].id;
                    opt.innerHTML = roles[i].name;
                    selectRole.appendChild(opt);

                }
                selectRole.onchange = function() {
                    roleId = this.options[this.selectedIndex].getAttribute("value");
                    stash.set('roleid', roleId);
                    authOrganization();
                };




            })
            .catch(error => console.log('ERROR login role'))
    }

}

async function authOrganization() {
    if (roleId != undefined) {
        await fetch('http://' + ip + '/api/v1/auth/organizations?client=' + clientId + '&role=' + roleId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token1
                }
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                var selectOrg = document.getElementById("selectOrg");
                var orgs = data.organizations;
                for (var i = 0; i < orgs.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = orgs[i].id;
                    opt.innerHTML = orgs[i].name;
                    selectOrg.appendChild(opt);
                }

                selectOrg.onchange = function() {
                    organizationId = this.options[this.selectedIndex].getAttribute("value");
                    stash.set('organizationid', organizationId);
                    authWarehouse();
                };




            })
            .catch(error => console.log('ERROR login organizations'))
    }


}

async function authWarehouse() {
    if (organizationId != undefined) {
        await fetch('http://' + ip + '/api/v1/auth/warehouses?client=' + clientId + '&role=' + roleId + '&organization=' +
                organizationId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token1
                    }
                }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                var selectWarehouse = document.getElementById("selectWarehouse");
                var wh = data.warehouses;
                for (var i = 0; i < wh.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = wh[i].id;
                    opt.innerHTML = wh[i].name;
                    selectWarehouse.appendChild(opt);
                }

                selectWarehouse.onchange = function() {
                    warehouseId = this.options[this.selectedIndex].getAttribute("value");
                    stash.set('warehouseid', warehouseId);
                    authLanguage();
                };



            })
            .catch(error => console.log('ERROR login warehouse'))
    }

}

async function authLanguage() {
    if (warehouseId != undefined) {
        await fetch('http://' + ip + '/api/v1/auth/language?client=' + clientId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token1
                }
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);

                var selectLang = document.getElementById("selectLang");
                language = data.AD_Language;
                stash.set('language', language);




            })
            .catch(error => console.log('ERROR login language'))
    }


}

async function authToken(e) {
    if (e != " ") {
        e.preventDefault();
    }

    if (stash.get('clientid') != undefined) {
        clientId = stash.get('clientid');
        ipcRender_login2.send('save:clientId', clientId);
        if (stash.get('roleid') != undefined) {
            roleId = stash.get('roleid');
            if (stash.get('organizationid') != undefined) {
                organizationId = stash.get('organizationid');
                if (stash.get('warehouseid') != undefined) {
                    warehouseId = stash.get('warehouseid');
                    if (stash.get('language') != undefined) {
                        language = stash.get('language');
                    }
                }
            }
        }
    }

    if (language != undefined) {
        await fetch('http://' + ip + '/api/v1/auth/tokens', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token1
                },
                body: JSON.stringify({
                    clientId: clientId,
                    roleId: roleId,
                    organizationId: organizationId,
                    warehouseId: warehouseId,
                    language: language
                })
            }).then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                token = data.token;
                console.log(token);
                if (token != undefined) {

                    ipcRender_login2.send('save:authtoken', token);
                    ipcRender_login2.send('save:language', language);
                    ipcRender_login2.send('save:organizationid', organizationId);
                    ipcRender_login2.send('save:roleid', roleId);
                    ipcRender_login2.send('save:warehouseid', warehouseId);


                    getUserData();

                }
            })
            .catch(error => {
                console.log('ERROR login auth');

            });
    }



}



async function getUserData() {

    if (token != undefined) {
        const userName = ipcRender_login2.sendSync('send:user', 'ping');
        console.log(userName);

        await fetch(`http://` + ip + `/api/v1/models/ad_user?$filter= AD_Client_ID eq ` + clientId + ` and Name eq  '` +
                userName + `'`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res => {

                return res.json()
            })
            .then(data => {
                console.log(data);
                a = data['records'];
                a.forEach((record) => {
                    ipcRender_login2.sendSync('save:permission', record.lit_mobilerole);
                    ipcRenderer.send('save:bpartner', record.C_BPartner_ID);
                });
                const page = 2;
                ipcRender_login2.send('page:change', page);


            })
            .catch(error => console.log(error))
    }
}