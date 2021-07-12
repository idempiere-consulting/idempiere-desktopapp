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

            //var pData = JSON.parse(data)

            a = data['window-records'];
            //console.log(a);
            a.forEach((record) => {
                var table = document.getElementById('opportunityBody');
                var bPartner = record.C_BPartner_ID;
                //console.log(leadStatus);
                var salesRep = record.SalesRep_ID;
                //console.log(salesRep);
                var campaign = record.C_Campaign_ID;
                var salesStage = record.C_SalesStage_ID;
                //console.log(campaign);
                var row = `<tr class="dataRow">
                    <td>${bPartner['identifier']}</td>
                    <td>${campaign['identifier']}</td>
                    <td>${salesRep['identifier']}</td>
                    <td>${salesStage['identifier']}</td>
                    <td>${record.OpportunityAmt}</td>
                    <td>${record.Description}</td>
                    <td><a href="#" id="iconLinkWebUrl"><i class="fas fa-2x fa-info-circle"></i></td>
              </tr>`;

                table.innerHTML += row;
            });


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