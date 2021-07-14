const electron = require('electron');
const { ipcRenderer } = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');

getOpportunities();

function getOpportunities() {

    fetch('http://' + ip + '/api/v1/windows/sales-opportunity', {
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


            a = data['window-records'];
            var table = document.getElementById('opportunityBody');

            a.forEach((record) => {
                var bPartner = record.C_BPartner_ID;
                var salesRep = record.SalesRep_ID;
                var campaign = record.C_Campaign_ID;
                var salesStage = record.C_SalesStage_ID;
                var importWithValue = record.OpportunityAmt + " " + record.C_Currency_ID.identifier;
                var probability = record.Probability + "%";
                var row = `<tr class="dataRow">
                    <td>${bPartner['identifier']}</td>
                    <td>${campaign['identifier']}</td>
                    <td>${salesRep['identifier']}</td>
                    <td>${salesStage['identifier']}</td>
                    <td>${importWithValue}</td>
                    <td>${record.Description}</td>
                    <td>${record.ExpectedCloseDate}</td>
                    <td>${probability}</td>
                    <td></td>
              </tr>`;

                table.innerHTML += row;
            });

            for (let index = 0; index < table.length; index++) {


            }

            backgroundRowTable("opportunityBody");

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