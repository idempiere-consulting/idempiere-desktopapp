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
                var table = document.getElementById('ticketBody');
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
                    <td><a href="#" id="iconLinkWebUrl"><i class="fas fa-2x fa-info-circle"></i></td>
                    <td style="display:none" >${record.DocumentNo}</td>
                </tr>`;
                if (userBPartner.identifier == bp['identifier']) {
                    table.innerHTML += row;
                }
            });
            //
            var table = document.getElementById('ticketBody');
            console.log(table);
            console.log(table.rows.length);
            //infoTable used to take the cell where there is the name document and save it in the ipcMain
            for (var i = 0; i < table.rows.length; i++) {
                //infoTable used to take the cell where there is the name document and save it in the ipcMain
                table.rows[i].cells[6].addEventListener('click', function(infoTable) {
                    console.log(infoTable.path[3].cells[7]);
                    doc = infoTable.path[3].cells[7].innerHTML;
                    ipcRenderer.send('save:ticketid', doc);
                    ipcRenderer.send('pageTicketP:TicketP_details_window');
                });
            }
            backgroundRowTable('ticketBody');

        })
        .catch(error => console.log(error))
}






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