const electron_main = window.require("electron");
const ipcRender_main = electron_main.ipcRenderer;

const authToken = ipcRender_main.sendSync('send:authtoken', 'ping');
const clientid = ipcRender_main.sendSync('send:clientId', 'ping');
const ip = ipcRender_main.sendSync('send:ip', 'ping');
const orgId = ipcRender_main.sendSync('send:organizationid');
const data = ipcRender_main.sendSync('send:Notifications', 'ping');
const userid = ipcRender_main.sendSync('send:userId', 'ping');

var readall = document.getElementById("READALL");
readall.addEventListener('click', ReadAll);
var bodyData;
var a = data.records;
var countLead = 0,
    countOpp = 0,
    countWo = 0,
    countFdv = 0,
    countFda = 0,
    countOdv = 0,
    countTicket = 0;
a.forEach(record => {
    //var container = document.getElementById("containerTheme");
    var leads = document.getElementById("LEADS");
    var opportunita = document.getElementById("OPPORTUNITA");
    var workorder = document.getElementById("WORKORDER");
    var fdv = document.getElementById("FDV");
    var fda = document.getElementById("FDA");
    var odv = document.getElementById("ODV");
    var ticket = document.getElementById("TICKET");

    var card = document.createElement("div");
    card.classList.add("card");
    var container2 = document.createElement("div");
    container2.classList.add("container2");
    var b = document.createElement("b");
    var h4 = document.createElement("h4");
    var p = document.createElement("p");

    b.innerHTML = record.DocType;
    h4.appendChild(b);
    container2.appendChild(h4)
    p.innerHTML = record.record_name;
    p.id = record.id;
    container2.appendChild(p);
    card.appendChild(container2);

    switch (record.DocType) {
        case "LEAD":
            card.id = "LeadCard";
            leads.appendChild(card);
            countLead++;
            break;
        case "OPPORTUNITY":
            card.id = "OppCard";
            opportunita.appendChild(card);
            countOpp++;
            break;
        case "WORKORDER":
            card.id = "WoCard";
            workorder.appendChild(card);
            countWo++;
            break;
        case "FDV":
            card.id = "FdvCard";
            fdv.appendChild(card);
            countFdv++;
            break;
        case "FDA":
            card.id = "FdaCard";
            fda.appendChild(card);
            countFda++;
            break;
        case "ODV":
            card.id = "OdvCard";
            odv.appendChild(card);
            countOdv;
            break;
        case "TICKET":
            card.id = "TicketCard";
            ticket.appendChild(card);
            countTicket++;
            break;

    }
    //console.log();
    //container.appendChild(card);

});



if (countLead == 0) {
    document.getElementById("LEADS").style.display = "none";
}

if (countOpp == 0) {
    document.getElementById("OPPORTUNITA").style.display = "none";
}

if (countWo == 0) {
    document.getElementById("ORDINIDILAVORO").style.display = "none";
}

if (countFdv == 0) {
    document.getElementById("FDV").style.display = "none";
}

if (countFda == 0) {
    document.getElementById("FDA").style.display = "none";
}

if (countOdv == 0) {
    document.getElementById("ODV").style.display = "none";
}

if (countTicket == 0) {
    document.getElementById("TICKET").style.display = "none";
}


var leadcards = document.querySelectorAll('#LeadCard');
var oppcards = document.querySelectorAll('#OppCard');
var wocards = document.querySelectorAll('#WoCard');
var fdvcards = document.querySelectorAll('#FdvCard');
var fdacards = document.querySelectorAll('#FdaCard');
var odvcards = document.querySelectorAll('#OdvCard');
var ticketcards = document.querySelectorAll('#TicketCard');

checkIfAny();

Array.prototype.forEach.call(leadcards, function addClickListener(leadcard) {
    leadcard.addEventListener('click', function (event) {
        //console.log(event);
        var text;
        var paths = event.path;
        var id;
        paths.forEach(element => {

            if (element.className == "card") {
                element.style.display = "none"
            }

            if (element.className == "container2") {
                //var text = element.childNodes[1].innerHTML;
                text = element.childNodes[1].innerHTML;
                id = element.childNodes[1].id;
            }

        });

        ipcRender_main.send('save:nameLead', text);
        ipcRender_main.send('pageInfoLeads:Leads_info_window');

        bodyData = {
            "AD_Client_ID": {
                "id": clientid
            },
            "AD_Org_ID": {
                "id": orgId
            },
            "AD_User_ID": {
                "id": userid
            },
            "DocTypeName": "LEAD",
            "Record_ID": {
                "id": id
            },
            "AD_Table_ID": "642"

        }
        console.log(bodyData);

        sendIsRead();
        checkIfAny();
    });
});

Array.prototype.forEach.call(oppcards, function addClickListener(oppcard) {
    oppcard.addEventListener('click', function (event) {
        //var text = event.path[0].childNodes[0].innerText;
        var text;
        var paths = event.path;
        var id;
        paths.forEach(element => {

            if (element.className == "card") {
                element.style.display = "none"
            }

            if (element.className == "container2") {
                //var text = element.childNodes[1].innerHTML;
                text = element.childNodes[1].innerHTML;
                id = element.childNodes[1].id;
            }

        });

        bodyData = {
            "AD_Client_ID": {
                "id": clientid
            },
            "AD_Org_ID": {
                "id": orgId
            },
            "AD_User_ID": {
                "id": userid
            },
            "DocTypeName": "OPPORTUNITY",
            "Record_ID": {
                "id": id
            },
            "AD_Table_ID": "642"

        }
        console.log(bodyData);

        sendIsRead();
        checkIfAny();
    });
});

Array.prototype.forEach.call(wocards, function addClickListener(wocard) {
    wocard.addEventListener('click', function (event) {
        var text;
        var paths = event.path;
        var id;
        paths.forEach(element => {

            if (element.className == "card") {
                element.style.display = "none"
            }

            if (element.className == "container2") {
                //var text = element.childNodes[1].innerHTML;
                text = element.childNodes[1].innerHTML;
                id = element.childNodes[1].id;
            }

        });

    });
});

Array.prototype.forEach.call(fdvcards, function addClickListener(fdvcard) {
    fdvcard.addEventListener('click', function (event) {

        var text;
        var paths = event.path;
        var id;
        paths.forEach(element => {

            if (element.className == "card") {
                element.style.display = "none"
            }

            if (element.className == "container2") {
                //var text = element.childNodes[1].innerHTML;
                text = element.childNodes[1].innerHTML;
                id = element.childNodes[1].id;
            }

        });

        ipcRender_main.send('save:invoiceId', text);
        ipcRender_main.send('pageDetailsInvoice:invoice_details_window');

        bodyData = {
            "AD_Client_ID": {
                "id": clientid
            },
            "AD_Org_ID": {
                "id": orgId
            },
            "AD_User_ID": {
                "id": userid
            },
            "DocTypeName": "FDV",
            "Record_ID": {
                "id": id
            },
            "AD_Table_ID": "642"

        }
        console.log(bodyData);

        sendIsRead();
        checkIfAny();
    });
});

Array.prototype.forEach.call(fdacards, function addClickListener(fdacard) {
    fdacard.addEventListener('click', function (event) {
        var text;
        var paths = event.path;
        var id;
        paths.forEach(element => {

            if (element.className == "card") {
                element.style.display = "none"
            }

            if (element.className == "container2") {
                //var text = element.childNodes[1].innerHTML;
                text = element.childNodes[1].innerHTML;
                id = element.childNodes[1].id;
            }

        });
        ipcRender_main.send('save:docN', text);
        ipcRender_main.send('pageCustomerInvoice:details');

        bodyData = {
            "AD_Client_ID": {
                "id": clientid
            },
            "AD_Org_ID": {
                "id": orgId
            },
            "AD_User_ID": {
                "id": userid
            },
            "DocTypeName": "FDA",
            "Record_ID": {
                "id": id
            },
            "AD_Table_ID": "642"

        }
        console.log(bodyData);

        sendIsRead();
        checkIfAny();
    });
});

Array.prototype.forEach.call(odvcards, function addClickListener(odvcard) {
    odvcard.addEventListener('click', function (event) {


        var text;
        var paths = event.path;
        var id;
        paths.forEach(element => {

            if (element.className == "card") {
                element.style.display = "none"
            }

            if (element.className == "container2") {
                //var text = element.childNodes[1].innerHTML;
                text = element.childNodes[1].innerHTML;
                id = element.childNodes[1].id;
            }

        });

        //console.log(text);
        ipcRender_main.send('save:docN', text);
        ipcRender_main.send('page:ODV', 3);

        bodyData = {
            "AD_Client_ID": {
                "id": clientid
            },
            "AD_Org_ID": {
                "id": orgId
            },
            "AD_User_ID": {
                "id": userid
            },
            "DocTypeName": "ODV",
            "Record_ID": {
                "id": id
            },
            "AD_Table_ID": "642"

        }
        console.log(bodyData);

        sendIsRead();
        checkIfAny();
    });
});

Array.prototype.forEach.call(ticketcards, function addClickListener(ticketcard) {
    ticketcard.addEventListener('click', function (event) {
        var text;
        var paths = event.path;
        var id;
        paths.forEach(element => {

            if (element.className == "card") {
                element.style.display = "none"
            }

            if (element.className == "container2") {

                text = element.childNodes[1].innerHTML;
                id = element.childNodes[1].id;
            }

        });
        console.log(text)
        ipcRender_main.send('save:ticketid', text);
        ipcRender_main.send('pageTicketI:TicketI_details_window');

        bodyData = {
            "AD_Client_ID": {
                "id": clientid
            },
            "AD_Org_ID": {
                "id": orgId
            },
            "AD_User_ID": {
                "id": userid
            },
            "DocTypeName": "TICKET",
            "Record_ID": {
                "id": id
            },
            "AD_Table_ID": "642"

        }
        console.log(bodyData);

        sendIsRead();
        checkIfAny();
    });
});


async function sendIsRead() {

    fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(bodyData)
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))

}

async function ReadAll() {
    if (countTicket != 0) {
        console.log(ticketcards);
        ticketcards.forEach(card => {
            let id = card.childNodes[0].childNodes[1].id;

            let body = {
                "AD_Client_ID": {
                    "id": clientid
                },
                "AD_Org_ID": {
                    "id": orgId
                },
                "AD_User_ID": {
                    "id": userid
                },
                "DocTypeName": "TICKET",
                "Record_ID": {
                    "id": id
                },
                "AD_Table_ID": "642"
            }


            fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))

            card.style.display = "none";

        });
        document.getElementById("TICKET").style.display = "none";
    }

    if (countOpp != 0) {
        //console.log(ticketcards);
        leadcards.forEach(card => {
            let id = card.childNodes[0].childNodes[1].id;

            let body = {
                "AD_Client_ID": {
                    "id": clientid
                },
                "AD_Org_ID": {
                    "id": orgId
                },
                "AD_User_ID": {
                    "id": userid
                },
                "DocTypeName": "OPPORTUNITA",
                "Record_ID": {
                    "id": id
                },
                "AD_Table_ID": "642"
            }


            fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))

            card.style.display = "none";

        });
        document.getElementById("OPPORTUNITA").style.display = "none";
    }

    if (countWo != 0) {
        //console.log(ticketcards);
        wocards.forEach(card => {
            let id = card.childNodes[0].childNodes[1].id;

            let body = {
                "AD_Client_ID": {
                    "id": clientid
                },
                "AD_Org_ID": {
                    "id": orgId
                },
                "AD_User_ID": {
                    "id": userid
                },
                "DocTypeName": "WORKORDER",
                "Record_ID": {
                    "id": id
                },
                "AD_Table_ID": "642"
            }


            fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))

            card.style.display = "none";

        });
        document.getElementById("WORKORDER").style.display = "none";
    }

    if (countFdv != 0) {
        //console.log(ticketcards);
        fdvcards.forEach(card => {
            let id = card.childNodes[0].childNodes[1].id;

            let body = {
                "AD_Client_ID": {
                    "id": clientid
                },
                "AD_Org_ID": {
                    "id": orgId
                },
                "AD_User_ID": {
                    "id": userid
                },
                "DocTypeName": "FDV",
                "Record_ID": {
                    "id": id
                },
                "AD_Table_ID": "642"
            }


            fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))

            card.style.display = "none";

        });
        document.getElementById("FDV").style.display = "none";
    }

    if (countFda != 0) {
        //console.log(ticketcards);
        fdacards.forEach(card => {
            let id = card.childNodes[0].childNodes[1].id;

            let body = {
                "AD_Client_ID": {
                    "id": clientid
                },
                "AD_Org_ID": {
                    "id": orgId
                },
                "AD_User_ID": {
                    "id": userid
                },
                "DocTypeName": "FDA",
                "Record_ID": {
                    "id": id
                },
                "AD_Table_ID": "642"
            }


            fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))

            card.style.display = "none";

        });
        document.getElementById("FDA").style.display = "none";
    }

    if (countOdv != 0) {
        //console.log(ticketcards);
        odvcards.forEach(card => {
            let id = card.childNodes[0].childNodes[1].id;
            let body = {
                "AD_Client_ID": {
                    "id": clientid
                },
                "AD_Org_ID": {
                    "id": orgId
                },
                "AD_User_ID": {
                    "id": userid
                },
                "DocTypeName": "ODV",
                "Record_ID": {
                    "id": id
                },
                "AD_Table_ID": "642"
            }


            fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))

            card.style.display = "none";

        });
        document.getElementById("ODV").style.display = "none";
    }

    if (countLead != 0) {
        //console.log(ticketcards);
        leadcards.forEach(card => {
            let id = card.childNodes[0].childNodes[1].id;

            let body = {
                "AD_Client_ID": {
                    "id": clientid
                },
                "AD_Org_ID": {
                    "id": orgId
                },
                "AD_User_ID": {
                    "id": userid
                },
                "DocTypeName": "LEAD",
                "Record_ID": {
                    "id": id
                },
                "AD_Table_ID": "642"
            }


            fetch('http://' + ip + '/api/v1/models/lit_mobile_isread?client=' + clientid, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.log(error))

            card.style.display = "none";

        });
        document.getElementById("LEAD").style.display = "none";
    }
    document.getElementById("NOTHING").style.display = "inline";
    document.getElementById("READALL").style.display = "none";

}

function checkIfAny() {

    leadcards = document.querySelectorAll('#LeadCard');
    oppcards = document.querySelectorAll('#OppCard');
    wocards = document.querySelectorAll('#WoCard');
    fdvcards = document.querySelectorAll('#FdvCard');
    fdacards = document.querySelectorAll('#FdaCard');
    odvcards = document.querySelectorAll('#OdvCard');
    ticketcards = document.querySelectorAll('#TicketCard');
    //console.log(ticketcards);

    if (((ticketcards == undefined || ticketcards.length == 0) && (leadcards == undefined || leadcards.length == 0) && (oppcards == undefined || oppcards.length == 0) && (wocards == undefined || wocards.length == 0) && (fdvcards == undefined || fdvcards.length == 0) && (fdacards == undefined || fdacards.length == 0) && (odvcards == undefined || odvcards.length == 0))) {
        document.getElementById("NOTHING").style.display = "inline";
        document.getElementById("READALL").style.display = "none";

    } else {
        var flag = 0;
        if (document.getElementById("TICKET").style.display != "none") {

            ticketcards.forEach(element => {
                //console.log("kiao");
                if (element.style.display != "none") {
                    console.log("ticket");
                    flag = 1;
                }
            });

            if (flag == 0) {
                document.getElementById("TICKET").style.display = "none";
            }

        }

        if (document.getElementById("LEADS").style.display != "none") {

            leadcards.forEach(element => {
                //console.log("kiao");
                if (element.style.display != "none") {
                    console.log("lead");
                    flag = 1;
                }
            });

            if (flag == 0) {
                document.getElementById("LEADS").style.display = "none";
            }

        }

        if (document.getElementById("OPPORTUNITA").style.display != "none") {

            oppcards.forEach(element => {
                //console.log("kiao");
                if (element.style.display != "none") {
                    console.log("opportunità");
                    flag = 1;
                }
            });

            if (flag == 0) {
                document.getElementById("OPPORTUNITA").style.display = "none";
            }

        }

        if (document.getElementById("ORDINIDILAVORO").style.display != "none") {

            wocards.forEach(element => {
                //console.log("kiao");
                if (element.style.display != "none") {
                    console.log("workorder");
                    flag = 1;
                }
            });

            if (flag == 0) {
                document.getElementById("WORKORDER").style.display = "none";
            }

        }

        if (document.getElementById("FDA").style.display != "none") {

            fdacards.forEach(element => {
                //console.log("kiao");
                if (element.style.display != "none") {
                    console.log("fda");
                    flag = 1;
                }
            });

            if (flag == 0) {
                document.getElementById("FDA").style.display = "none";
            }

        }

        if (document.getElementById("FDV").style.display != "none") {

            fdvcards.forEach(element => {
                //console.log("kiao");
                if (element.style.display != "none") {
                    console.log("fdv");
                    flag = 1;
                }
            });

            if (flag == 0) {
                document.getElementById("FDV").style.display = "none";
            }

        }

        if (document.getElementById("ODV").style.display != "none") {

            odvcards.forEach(element => {
                //console.log("kiao");
                if (element.style.display != "none") {
                    console.log("odv");
                    flag = 1;
                }
            });

            if (flag == 0) {
                document.getElementById("ODV").style.display = "none";
            }

        }

        if (flag == 0) {
            document.getElementById("NOTHING").style.display = "inline";
            document.getElementById("READALL").style.display = "none";
        }
    }



}