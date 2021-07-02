const electron = require('electron');
const { ipcRenderer } = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const userBPartner = ipcRenderer.sendSync('send:bp', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
//console.log(userBPartner);
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
            console.log(data);

            //var pData = JSON.parse(data)

            a = data['window-records'];
            //console.log(a);
            a.forEach((record) => {
                var table = document.getElementById('leadBody');
                var bp = record.C_BPartner_ID;
                var user = record.AD_User_ID;
                var req = record.R_RequestType_ID;
                var prio = record.Priority;
                var row = `
                <tr class="dataRow"> 
                    <td>${bp['identifier']}</td>
                    <td>${user['identifier']}</td>
                    <td>${req['identifier']}</td>
                    <td>${prio['identifier']}</td>
                    <td>${record.Summary}</td>
                    <td>${record.Created.slice(0,10)}</td>
                    <td><a href="#" id="iconLinkWebUrl"><i class="fas fa-external-link-alt"></i></td>
                </tr>`;
                if (userBPartner == bp['identifier']) {
                    table.innerHTML += row;
                }
            });
        })
        .catch(error => console.log(error))
}


$("input[type=radio]").change(function() {
    var filter = this.value;
    if (filter == "All")
        $("tr.dataRow").css("visibility", "visible");
    else $("tr.dataRow").css("visibility", "collapse");
    var matchFound = false;
    $("tr.dataRow").find("td").each(function() {
        $this = $(this);
        if (!matchFound) {
            if ($this.html() == filter) {
                //matchFound = true;
                $this.parent().css("visibility", "visible");
            }
        }
    });
});



function filterAcc() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputPhone");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterBP() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterReq() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputMail");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterSumm() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputSalesRep");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filterDate() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputCampaign");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[5];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}