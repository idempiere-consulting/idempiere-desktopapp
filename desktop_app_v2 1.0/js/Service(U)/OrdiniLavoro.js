const electron = require('electron');
const {
    ipcRenderer
} = electron;

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

            //var pData = JSON.parse(data)
            a = data['records'];
            var table = document.getElementById('OrdiniLavoro');

            a.forEach((record) => {

                var bPartner = record.C_BPartner_ID;
                var ris = record.S_Resource_ID

                var row = `<tr class="dataRow">
                    <td>${record.DocumentNo}</td>
                    <td>${bPartner['identifier']}</td>
                    <td>${record.Description}</td>
                    <td>${ris['identifier']}</td>
                    <td>${record.DateWorkStart}</td>
                    <td></td>
              </tr>`;
                table.innerHTML += row;


            });
            /*             var btns = document.querySelectorAll('.iconLinkWebUrl');
                        Array.prototype.forEach.call(btns, function addClickListener(btn) {
                            btn.addEventListener('click', function(event) {
                                var doc = event.path[3].cells[0].innerHTML;
                                console.log(doc);
                                ipcRenderer.send('save:docN', doc);
                                ipcRenderer.send('page:ODV:odv_details_window');
                            });
                        }); */
            OrderTable("OrdiniLavoro", 4);
            backgroundRowTable('OrdiniLavoro');

        })
        .catch(error => console.log(error))
}






//test jquery filter
$(".filter").click(function () {
    var filter = this.value;
    if (filter == "All")
        $("tr.dataRow").css("visibility", "visible");
    else $("tr.dataRow").css("visibility", "collapse");
    var matchFound = false;
    $("tr.dataRow").find("td").each(function () {
        $this = $(this);
        if (!matchFound) {
            if ($this.html() == filter) {
                $this.parent().css("visibility", "visible");
            }
        }
    });
});