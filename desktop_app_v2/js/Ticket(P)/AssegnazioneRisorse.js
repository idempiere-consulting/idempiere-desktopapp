const electron = require('electron');
const { ipcRenderer } = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const userBPartner = ipcRenderer.sendSync('send:bp', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
//console.log(userBPartner);
getTickets();

function getTickets() {

    fetch('http://' + ip + '/api/v1/windows/resource-assignment', {
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
                var name = record.Name;
                var startHour = new Date(record.AssignDateFrom);
                var endHour = new Date(record.AssignDateTo);
                var qtyEffective = record.QtyEffectiveTime;
                var description = record.Description;
                var row = `
                <tr class="dataRow"> 
                    <td>${bp['identifier']}</td>
                    <td>${name}</td>
                    <td>${startHour.toLocaleString()}</td>
                    <td>${endHour.toLocaleString()}</td>
                    <td>${qtyEffective}</td>
                    <td>${description}</td>
                    <td></td>
                    <td style="display:none">${record.DocumentNo}</td>
                </tr>`;
                if (userBPartner.identifier == bp['identifier']) {
                    table.innerHTML += row;
                }
            });
            OrderTable('ticketBody', 7);
            backgroundRowTable('ticketBody');

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