const electron = require('electron');
const { ipcRenderer } = electron;

const authToken = ipcRenderer.sendSync('send:authtoken', 'ping');
const ip = ipcRenderer.sendSync('send:ip', 'ping');
const docN = ipcRenderer.sendSync('send:docN', 'ping');
const addOrderLine = document.getElementById('addOrderLine');

getODV();

if (addOrderLine != null) {
    addOrderLine.addEventListener('click', openOrderLineWindow);
}


function getODV() {

    fetch(`http://` + ip + `/api/v1/models/c_order?$filter=DocumentNo eq '` + docN + `'`, {
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

            a = data['records'];
            a.forEach((record) => {
                var table = document.getElementById('opportunityBody');
                var bPartner = record.C_BPartner_ID;
                //console.log(leadStatus);
                var activity = '';
                if (record.C_Activity_ID == undefined) {
                    activity = '';
                } else {
                    activity = record.C_Activity_ID.identifier;
                }
                docID = record.id;
                ipcRenderer.send('save:docid:ODV', docID);
                //console.log(docID);
                getODVLines();
                var row = `<tr class="dataRow">
							<td>${record.DocumentNo}</td>
							<td>${bPartner['identifier']}</td>
							<td></td>
							<td>${activity}</td>
							<td>${record.DateOrdered}</td>
							<td><a href="#" id="iconLinkWebUrl"><i class="fas fa-2x fa-info-circle"></i></a></td>
					  </tr>`;

                table.innerHTML += row;

                var table = document.getElementById('myTable1');
                for (var i = 2; i < table.rows.length; i++) {
                    table.rows[i].addEventListener('click', function(infoTable = table.row[i].cells[0].innerHTML) {
                        doc = infoTable.path[3].cells[0].innerHTML;
                        ipcRenderer.send('save:docN', doc);
                        ipcRenderer.send('page:ODV:odv_details_window');
                        //alert(msg);
                    });
                }
            });


        })
        .catch(error => console.log(error))
}

function getODVLines() {

    fetch(`http://` + ip + `/api/v1/models/c_order/` + docID + `?$expand=c_orderline`, {
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

            a = data['c_orderline'];
            console.log(a);
            var table = document.getElementById('opportunityBody2');
            a.forEach((record) => {


                var MProdcutidentifier = '';
                var Name = '';
                var UOMindentifier = '';
                var QtyEntered = '';
                var MAttributeIdentifier = '';

                if (record.M_Product_ID.identifier != undefined) {
                    MProdcutidentifier = record.M_Product_ID.identifier
                }
                if (record.Name != undefined) {
                    Name = record.Name;
                }
                if (record.C_UOM_ID.identifier != undefined) {
                    UOMindentifier = record.C_UOM_ID.identifier;
                }
                if (record.QtyEntered != undefined) {
                    QtyEntered = record.QtyEntered;
                }
                if (record.M_AttributeSetInstance_ID.identifier != undefined) {
                    MAttributeIdentifier = record.M_AttributeSetInstance_ID.identifier;
                }


                var row = `<tr class="dataRow2">
							<td>${MProdcutidentifier}</td>
							<td>${Name}</td>
							<td>${UOMindentifier}</td>
							<td>
                                <a onclick="LessQuantity(${record.id},${record.QtyEntered})" id="less-qty" class="orderline-quantity" href="#">
                                    <i class="fas fa-1x fa-minus left-minus"></i>
                                </a>
                                ${QtyEntered}
                                <a onclick="PlusQuantity(${record.id},${record.QtyEntered})" id="plus-qty" class="orderline-quantity" href="#">
                                    <i class="fas fa-1x fa-plus right-plus"></i>
                                </a>
                            </td>
							<td>${MAttributeIdentifier}</td>
                            <td> <a onclick="DeleteODV(${record.id})" href="#" id="trashODV"> <i style="color: #cc0000;" class="fas fa-2x fa-trash-alt"></i>  </a></td>
                            <td style="">${record.id}</td>
                        </tr>`;


                table.innerHTML += row;
            });
            var switching = true;
            var shouldSwitch;
            var x, y, index;

            while (switching) {
                switching = false;
                console.log(table.rows.length);
                for (index = 0; index < table.rows.length; index++) {
                    shouldSwitch = false;
                    console.log(table.rows[index]);
                    x = table.rows[index].cells[6];
                    y = table.rows[index + 1].cells[6];
                    if (x.innerHTML < y.innerHTML) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (shouldSwitch) {
                    table.rows[index].parentNode.insertBefore(table.rows[index + 1], table.rows[index]);
                    switching = true;
                }
            }



        })
        .catch(error => console.log(error))

}


// DELETE ODV

function DeleteODV(idProduct) {
    console.log(idProduct);
    if (confirm("Sei sicuro di voler eliminare la linea d'ordine?")) {


        fetch(`http://` + ip + `/api/v1/models/c_orderline/` + idProduct, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                }
            }).then(data => {
                console.log(data);
            })
            .catch(error => console.log(error))
        location.reload();

    } else {

    }

}




function updateOrderLine(orderLineId, qtyUpdate) {
    var bodyData = {
        "QtyEntered": qtyUpdate
    };

    fetch(`http://` + ip + `/api/v1/models/c_orderline/` + orderLineId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(bodyData)
        }).then(res => {
            return res.json()
        })
        .then(data => {
            location.reload();

        })
        .catch(error => console.log(error))
}


function LessQuantity(orderLineId, qty) {

    if (qty == 1) {
        if (window.confirm("Sei togli un unita l'ordine verrà cancellato")) {
            DeleteODV(orderLineId);
        }
    } else {
        qty--;
        updateOrderLine(orderLineId, qty);
    }
}


function PlusQuantity(orderLineId, qty) {
    qty++;
    updateOrderLine(orderLineId, qty);
}

function openOrderLineWindow() {
    ipcRenderer.send('pageODV:orderLineWindow');
}