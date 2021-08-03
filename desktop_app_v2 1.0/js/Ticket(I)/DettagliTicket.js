const electron_detailsTicket = window.require("electron");
const ipcRender_detailsTicket = electron_detailsTicket.ipcRenderer;

const ip = ipcRender_detailsTicket.sendSync('send:ip', 'ping');
const authToken = ipcRender_detailsTicket.sendSync('send:authtoken', 'ping');
const ticketid = ipcRender_detailsTicket.sendSync('send:ticketid', 'ping');
const btn = document.getElementById("updateLine");
btn.addEventListener('click', UpdateLine);
var id_salesrep;
var id_statusrequest;
var imgId;
getStatusRequest();


function getTicket() {
    fetch(`http://` + ip + `/api/v1/models/r_request?$filter=R_Request_ID eq ` + ticketid + ``, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {


            a = data.records;
            console.log(a);
            var numDoc = '';
            var businessPartner = '';
            var priority = '';
            var priorityUser = '';
            var dueType = '';
            var requestType = '';
            var description = '';
            var help = '';
            var summary = '';
            var status = '';
            var dateNextAction = '';
            var user = '';

            if (a[0].DocumentNo == undefined) {
                numDoc = '';
            } else {
                numDoc = a[0].DocumentNo
            }

            if (a[0].C_BPartner_ID == undefined) {
                businessPartner = '';
            } else {
                businessPartner = a[0].C_BPartner_ID.identifier
            }

            if (a[0].Priority == undefined) {
                priority = '';
            } else {
                priority = a[0].Priority.identifier
            }

            if (a[0].PriorityUser == undefined) {
                priorityUser = '';
            } else {
                priorityUser = a[0].PriorityUser.identifier
            }

            if (a[0].DueType == undefined) {
                dueType = '';
            } else {
                dueType = a[0].DueType.identifier
            }

            if (a[0].R_RequestType_ID == undefined) {
                requestType = '';
            } else {
                requestType = a[0].R_RequestType_ID.identifier
            }

            if (a[0].Description == undefined) {
                description = '';
            } else {
                description = a[0].Description
            }

            if (a[0].Help == undefined) {
                help = '';
            } else {
                help = a[0].Help
            }

            if (a[0].Summary == undefined) {
                summary = '';
            } else {
                summary = a[0].Summary
            }
            if (a[0].R_Status_ID != undefined) {
                var select = document.getElementById("statusRequest");
                for (var i, j = 0; i = select.options[j]; j++) {
                    if (i.value == a[0].R_Status_ID.id) {
                        select.selectedIndex = j;
                        break;
                    }
                }
            }
            if (a[0].SalesRep_ID != undefined) {
                var select = document.getElementById("SalesRep");
                for (var i, j = 0; i = select.options[j]; j++) {
                    if (i.value == a[0].SalesRep_ID.id) {
                        select.selectedIndex = j;
                        break;
                    }
                }
            }


            if (a[0].AD_User_ID != undefined) {
                user = a[0].AD_User_ID.identifier;
            }

            if (a[0].DateNextAction != undefined) {
                dateNextAction = a[0].DateNextAction.replace('Z', '').replace('T', ' ');
            }

            if (a[0].AD_Image_ID != undefined) {
                imgId = a[0].AD_Image_ID.id;
                getImageTicket();
                //console.log("trovato immagine");
            } else {
                document.getElementById("imgdiv").style.display = "none";
            }

            document.getElementById('ndoc').value = numDoc;
            document.getElementById('bp').value = businessPartner;
            document.getElementById('priority').value = priority;
            document.getElementById('priorityuser').value = priorityUser;
            document.getElementById('scandenzaType').value = dueType;
            document.getElementById('requestType').value = requestType;
            document.getElementById('description').value = description;
            document.getElementById('help').value = help;
            document.getElementById('summary').value = summary;
            document.getElementById('input_date').value = dateNextAction;
            document.getElementById('user').value = user;


            getLog();



        })
        .catch(error => console.log(error))
}

async function getStatusRequest() {
    await fetch('http://' + ip + '/api/v1/models/R_Status', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        a = data.records;
        var select = document.getElementById("statusRequest");
        a.forEach(element => {
            var option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.Name;
            select.appendChild(option);
        });
        getSalesRep();
    })
}

async function getImageTicket() {
    await fetch('http://' + ip + '/api/v1/models/AD_Image/' + imgId + '', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        //console.log(data)
        //console.log(data.BinaryData);
        var imgdiv = document.getElementById("img");
        imgdiv.src = "data:image/png;base64," + data.BinaryData;
    })
}

async function getSalesRep() {

    var BPartnerId;

    await fetch(`http://` + ip + `/api/v1/models/AD_User?$filter=Name eq 'Da Assegnare'`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        a = data.records;
        a.forEach(element => {
            BPartnerId = element.C_BPartner_ID.id;
        });

    });

    await fetch('http://' + ip + '/api/v1/models/AD_User?$filter=C_BPartner_ID eq ' + BPartnerId + '', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        a = data.records;
        var select = document.getElementById("SalesRep");
        a.forEach(element => {
            var option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.Name;
            select.appendChild(option);
        });
        getTicket();
    })
}

var salesrep = document.getElementById("SalesRep");
var statusreq = document.getElementById("statusRequest");

salesrep.addEventListener('change', function (event) {

    id_salesrep = event.target.options[event.target.selectedIndex].value;

});

statusreq.addEventListener('change', function (event) {

    id_statusrequest = event.target.options[event.target.selectedIndex].value;
    console.log(id_statusrequest);

});

async function UpdateLine() {
    if (document.getElementById("input_dateNext").value == "") {
        var now = new Date();

        var dateNextAction = "" + now.toISOString();
    } else {
        var time = document.getElementById("input_timeNext").value;
        var date = document.getElementById("input_dateNext").value;
        var dateNextAction = date + "T" + time + ":00" + "Z";
    }

    if (document.getElementById("input_textArea").value == "") {
        var result = "-";
    } else {
        var result = document.getElementById("input_textArea").value;
    }
    if (document.getElementById("input_qty").value == "") {
        var qtySpent = "0";
    } else {
        var qtySpent = document.getElementById("input_qty").value;
    }

    let bodydata;


    if (id_salesrep == undefined && id_statusrequest == undefined) {
        bodydata = {
            "DateLastAction": dateNextAction,
            "Result": result,
            "QtySpent": qtySpent
        };
    }
    if (id_statusrequest == undefined && id_salesrep != undefined) {
        bodydata = {
            "SalesRep_ID": {
                "id": id_salesrep
            },
            "DateLastAction": dateNextAction,
            "Result": result,
            "QtySpent": qtySpent
        };
    }
    if (id_salesrep == undefined && id_statusrequest != undefined) {
        bodydata = {
            "R_Status_ID": {
                "id": id_statusrequest
            },
            "DateLastAction": dateNextAction,
            "Result": result,
            "QtySpent": qtySpent
        };
    }

    if (id_salesrep != undefined && id_statusrequest != undefined) {
        bodydata = {
            "R_Status_ID": {
                "id": id_statusrequest
            },
            "SalesRep_ID": {
                "id": id_salesrep
            },
            "DateLastAction": dateNextAction,
            "Result": result,
            "QtySpent": qtySpent
        };
    }







    console.log(ticketid);
    console.log(bodydata);

    fetch('http://' + ip + '/api/v1/windows/request/' + ticketid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(bodydata)
        }).then(res => {
            return res.json()
        })
        .then(data => {
            if (data.status != undefined) {
                alert("Problema con la Richiesta")
            } else {
                alert("ticket aggiornato");
                var window = remoteWindows.getCurrentWindow();
                //window.close();
            }
        })
        .catch(error => console.log(error))


}

async function getLog() {
    await fetch('http://' + ip + '/api/v1/models/R_RequestUpdate?$filter=R_Request_ID eq ' + ticketid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            lenght_json = data["row-count"];
            var a = data.records;

            var containLog = document.getElementById("content-log-myDropdown");

            for (let index = lenght_json - 1; index >= 0; index--) {
                var container = document.createElement("div");
                container.classList.add("container");
                var p = document.createElement("p");
                p.innerHTML = a[index].CreatedBy.identifier;
                container.appendChild(p);
                p = document.createElement("p");
                p.innerHTML = a[index].Result;
                container.appendChild(p);
                p = document.createElement("p");
                p.classList.add("time-right");
                if (a[index].Updated != undefined)
                    p.innerHTML = a[index].Updated.replace("Z", "").replace("T", " ");

                container.appendChild(p);
                containLog.appendChild(container);
                if (index == lenght_json - 1) {
                    var container = document.getElementById("container-lastLog");
                    container.innerHTML = a[index].CreatedBy.identifier;
                    container.innerHTML += '<br><br>';
                    container.innerHTML += a[index].Result;
                }
            }
        }).catch(error => console.log(error))
}