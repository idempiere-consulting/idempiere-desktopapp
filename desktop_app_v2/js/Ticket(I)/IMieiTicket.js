const electron = require('electron');
const {
    ipcRenderer
} = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const userBPartner = ipcRenderer.sendSync('send:bp', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const userName = ipcRenderer.sendSync('send:user', 'ping');


//Evento per aprie finestra di inserimento
const addTicketP = document.getElementById('addTicketP');
if (addTicketP) {
    addTicketP.addEventListener('click', openTicketPWindow);
}

function openTicketPWindow() {
    ipcRenderer.send('pageTicketP:TicketP_create_window');
}





getStatusRequest();
getTickets();

function getTickets() {

    fetch('http://' + ip + '/api/v1/windows/request', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            //console.log(data);
            //var pData = JSON.parse(data)
            a = data['window-records'];
            a.forEach((record) => {
                var table = document.getElementById('ticketBody');
                var bp = record.C_BPartner_ID;
                var user = record.AD_User_ID;
                var req = record.R_RequestType_ID;
                var prio = record.Priority;
                var endIndex = record.R_Status_ID.identifier.indexOf("_");
                var status = record.R_Status_ID.identifier.replace(record.R_Status_ID.identifier.substring(0, endIndex + 1), "");
                var row = `
                <tr class="dataRow"> 
                    <td>${record.DocumentNo}</td>
                    <td>${bp['identifier']}</td>
                    <td>${user['identifier']}</td>
                    <td>${req['identifier']}</td>
                    <td>${prio['identifier']}</td>
                    <td>${record.Summary}</td>
                    <td>${record.Created.slice(0,10)}</td>
                    <td>${status}</td>
                    <td>${record.SalesRep_ID.identifier}</td>
                    <td><a href="#" class="iconLinkWebUrl"><i class="fas fa-external-link-alt"></i></td>
                    <td style="display:none" >${record.id}</td>
                </tr>`;
                if (record.SalesRep_ID.identifier == userName) {
                    table.innerHTML += row;
                }

            });
            //
            var btns = document.querySelectorAll('.iconLinkWebUrl');
            Array.prototype.forEach.call(btns, function addClickListener(btn) {
                btn.addEventListener('click', function(event) {
                    var ticketId = event.path[3].cells[10].innerHTML;
                    ipcRenderer.send('save:ticketid', ticketId);
                    ipcRenderer.send('pageTicketI:TicketI_details_window');
                });
            });


            OrderTable("ticketBody", 10);
            backgroundRowTable('ticketBody');

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
        //console.log(data);
        a = data.records;
        var select = document.getElementById("myInputStatus");
        a.forEach(element => {
            var option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.Name;
            select.appendChild(option);
        });

        document.getElementById("myInputStatus").addEventListener('change', function(event) {
            id_reqType = event.target.options[event.target.selectedIndex].dataset.id;
        });
        getSalesRep();
    })
}

async function getSalesRep() {
    console.log("kiao");
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
        console.log(data);
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
        console.log(data);
        a = data.records;
        var select = document.getElementById("myInputResource");
        a.forEach(element => {
            var option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.Name;
            select.appendChild(option);
        });
    })
}


var select_status = document.getElementById("myInputStatus");
select_status.addEventListener('change', function(event) {
    var itemStatus = event.target.options[event.target.selectedIndex].text;
    filterFromSelectToTable(itemStatus, "myTable", 6);
});

var select_resource = document.getElementById("myInputResource");
select_resource.addEventListener('change', function(event) {
    var itemResource = event.target.options[event.target.selectedIndex].text;
    filterFromSelectToTable(itemResource, "myTable", 7);
});




//test jquery filter
$(".filter").click(function() {
    var filter = this.value;
    if (filter == "All")
        $("tr.dataRow").css("visibility", "visible");
    else $("tr.dataRow").css("visibility", "collapse");
    var matchFound = false;
    $("tr.dataRow").find("td").each(function() {
        $this = $(this);
        if (!matchFound) {
            if ($this.html() == filter) {
                $this.parent().css("visibility", "visible");
            }
        }
    });
});