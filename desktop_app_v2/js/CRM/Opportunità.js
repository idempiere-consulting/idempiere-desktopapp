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


function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});


//test jquery filter
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
                $this.parent().css("visibility", "visible");
            }
        }
    });
});