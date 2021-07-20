const electron = require('electron');
const { ipcRenderer } = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');

getLeads();

function getLeads() {

    fetch('http://' + ip + '/api/v1/windows/lead', {
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
                var leadStatus = '';
                if (record.LeadStatus == undefined) {
                    leadStatus = '';
                } else {
                    leadStatus = record.LeadStatus.identifier;
                }
                //console.log(leadStatus);
                var salesRep = '';
                if (record.SalesRep_ID == undefined) {
                    salesRep = '';
                } else {
                    salesRep = record.SalesRep_ID.identifier;
                }

                //console.log(salesRep);
                var campaign = '';
                if (record.C_Campaign_ID == undefined) {
                    campaign = '';
                } else {
                    campaign = record.C_Campaign_ID.identifier;
                }
                //console.log(campaign);
                var row = `<tr class="dataRow"> 
                    <td>${record.Name}</td>
                    <td>${record.Phone}</td>
                    <td>${record.EMail}</td>
                    <td>${leadStatus}</td>
                    <td>${salesRep}</td>
                    <td>${campaign}</td>
                    <td><a href="#" id="iconLinkWebUrl"><i class="fas fa-external-link-alt"></i></td>
                    </tr>`;


                table.innerHTML += row;

                /*                var table = document.getElementById('myTable');
                                              for (var i = 2; i < table.rows.length; i++) {
                                                  table.rows[i].cells[6].addEventListener('click', function(infoTable) {
                                                      namelead = infoTable.path[3].cells[0].innerHTML;
                                                      ipcRenderer.send('save:nameLead', namelead);
                                                      ipcRenderer.send('pageInfoLeads:Leads_info_window');
                                                      //alert(msg);
                                                  });
                                              } */
            });

            var btns = document.querySelectorAll('.iconLinkWebUrl');
            Array.prototype.forEach.call(btns, function addClickListener(btn) {
                btn.addEventListener('click', function(event) {
                    var namelead = event.path[3].cells[0].innerHTML;

                    ipcRenderer.send('save:nameLead', namelead);
                    ipcRenderer.send('pageInfoLeads:Leads_info_window');
                });
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