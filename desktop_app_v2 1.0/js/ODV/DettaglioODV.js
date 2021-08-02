const electron = require('electron');
const {
    ipcRenderer
} = electron;

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

            a = data['records'];
            a.forEach((record) => {
                var table = document.getElementById('opportunityBody');
                var bPartner = record.C_BPartner_ID;
                var activity = '';
                if (record.C_Activity_ID == undefined) {
                    activity = '';
                } else {
                    activity = record.C_Activity_ID.identifier;
                }
                docID = record.id;
                ipcRenderer.send('save:docid:ODV', docID);
                getODVLines();
                var row = `<tr class="dataRow">
							<td>${record.DocumentNo}</td>
							<td>${bPartner['identifier']}</td>
							<td></td>
							<td>${activity}</td>
							<td>${record.DateOrdered}</td>
                            <td><a href="#" class="iconLinkWebUrl"><i class="fas fa-2x fa-info-circle"></i></td>
					  </tr>`;


                table.innerHTML += row;
            });



            var btns = document.querySelectorAll('.iconLinkWebUrl');
            Array.prototype.forEach.call(btns, function addClickListener(btn) {
                btn.addEventListener('click', function (event) {
                    var doc = event.path[3].cells[0].innerHTML;
                    ipcRenderer.send('save:docN', doc);
                    ipcRenderer.send('page:ODV:odv_details_window');
                });
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

            //var pData = JSON.parse(data)

            a = data['c_orderline'];
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


                var row = `<tr class="dataRow">
							<td>${MProdcutidentifier}</td>
							<td>${Name}</td>
							<td>${UOMindentifier}</td>
							<td>
                                <a onclick="LessQuantity(${record.id},${record.QtyEntered})" id="less-qty" class="orderline-quantity" href="#">
                                    <i class="fas fa-1x fa-minus left-minus" style="color: red;margin-right: 4px;"></i>
                                </a>
                                <span>${QtyEntered}</span>
                                <a onclick="PlusQuantity(${record.id},${record.QtyEntered})" id="plus-qty" class="orderline-quantity" href="#">
                                    <i class="fas fa-1x fa-plus right-plus" style = "color: green;margin-left: 4px;"></i>
                                </a>
                            </td>
							<td>${MAttributeIdentifier}</td>
                            <td> <a onclick="DeleteODV(${record.id})" href="#" id="trashODV"> <i style="color: #cc0000;" class="fas fa-2x fa-trash-alt"></i>  </a></td>
                            <td style="display:none">${record.id}</td>
                        </tr>`;


                table.innerHTML += row;
            });

            OrderTable("opportunityBody2", 6);
            backgroundRowTable('opportunityBody2');



        })
        .catch(error => console.log(error))

}


// DELETE ODV

function DeleteODV(idProduct) {
    if (confirm("Sei sicuro di voler eliminare la linea d'ordine?")) {


        fetch(`http://` + ip + `/api/v1/models/c_orderline/` + idProduct, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                }
            }).then(data => {
                location.reload();
            })
            .catch(error => console.log(error))
    } else {

    }

}




function updateOrderLine(orderLineId, qtyUpdate) {
    var bodyData = {
        "QtyEntered": qtyUpdate,
        "QtyOrdered": qtyUpdate
    };

    fetch(`http://` + ip + `/api/v1/models/c_orderline/` + orderLineId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(bodyData)
        }).then(res => {
            return res.json();

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