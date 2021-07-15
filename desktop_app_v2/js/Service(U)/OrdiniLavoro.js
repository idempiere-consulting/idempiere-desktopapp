const electron = require('electron');
const { ipcRenderer } = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const userBPartner = ipcRenderer.sendSync('send:bp', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
getOrdiniLavoro();

function getOrdiniLavoro() {

    fetch('http://' + ip + '/api/v1/models/MP_OT', {
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
            a = data['records'];
            //console.log(a);
            var table = document.getElementById('OrdiniLavoro');

            a.forEach((record) => {

                var bPartner = record.C_BPartner_ID;
                //console.log(leadStatus);
                var ris = record.S_Resource_ID

                var row = `<tr class="dataRow">
                    <td>${record.DocumentNo}</td>
                    <td>${bPartner['identifier']}</td>
                    <td>${record.Description}</td>
                    <td>${ris['identifier']}</td>
                    <td>${record.DateWorkStart}</td>
                    <td><a href="#" id="iconLinkWebUrl"><i class="fas fa-external-link-alt"></i></td>
              </tr>`;
                table.innerHTML += row;


            });
            //
            /*var table = document.getElementById('ticketBody');
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
            }*/
            OrderTable("OrdiniLavoro", 4);
            backgroundRowTable('OrdiniLavoro');

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