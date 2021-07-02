const electron_addOrderLine = window.require("electron");
const ipcRender_addOrderLine = electron_addOrderLine.ipcRenderer;


//Take the user information for the request api
const authToken = ipcRender_addOrderLine.sendSync('send:authtoken', 'ping');
const ip = ipcRender_addOrderLine.sendSync('send:ip', 'ping');
const client = ipcRender_addOrderLine.sendSync('send:clientId', 'ping');
const org = ipcRender_addOrderLine.sendSync('send:organizationid', 'ping');
const warehouseId = ipcRender_addOrderLine.sendSync('send:warehouseid', 'ping');
let setting = ipcRender_addOrderLine.sendSync('send:permission_settings', 'ping');
//Declare variable
var idProd, idUDM, instAttr_ID, instAttr_Name, keyCode, keyinstAttr, count, flag_ = 0;



//Take the input for the search by product code or product name
const codeInput = document.getElementById('productcode');
const srcName = document.getElementById('srcName');

//Take the "button" to search product code 
const srcCode = document.getElementById('srcCode');


//Button to insert a new order line
const sendLine = document.getElementById('sendLine');


/* Events buttons */

//Seach code with also instance attribute when the button is clicked
console.log(srcCode != null);
if (srcCode != null) {
    srcCode.addEventListener('click', function(e) {
        flag_ = 0;
        var temp = document.getElementById('productcode').value;
        //If the input type contain a _ you have a attribute instance and it divide in two string
        //Else the input type have only the product code
        if (temp.includes("_")) {
            for (var i = 0; i < temp.length; i++) {
                if (temp[i] == '_' && flag_ == 0) {
                    count = i;
                    flag_ = 1;
                }
            }
            keyCode = temp.slice(0, count);
            keyinstAttr = temp.slice(count + 1, temp.length);
            //console.log(keyinstAttr);
        } else {
            keyCode = temp;
        }
        //Call the method searchByCode to call the api for search the information of the product selected
        searchByCode();

    });
}
console.log(codeInput);
//Search the product when the user digit the key 'Enter'
if (codeInput != null) {
    codeInput.addEventListener('keypress', function(e) {
        flag_ = 0;
        //Same fuction of the srcCode button 
        if (e.key === 'Enter') {
            var temp = document.getElementById('productcode').value;
            if (temp.includes("_")) {
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i] == '_' && flag_ == 0) {
                        count = i;
                        flag_ = 1;
                    }
                }
                keyCode = temp.slice(0, count);
                console.log(keyCode)
                keyinstAttr = temp.slice(count + 1, temp.length);
                console.log(keyinstAttr);
            } else {
                keyCode = temp;
            }
            searchByCode();
        }
    });
}
//Search on base the name
if (srcName != null)
    srcName.addEventListener('click', searchByName);

//Add order line
//If the permission setting has a M. 
//The process to insert a order line is manual(you have to click the button sendLine to insert the orderLine ) 
if (sendLine != null) {

    if (setting[4] == 'M')
        sendLine.addEventListener('click', sendOrderLine);
}
getProducts();

//Fill the option for the name search 
function getProducts() {

    fetch('http://' + ip + '/api/v1/windows/product', {
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
            //Fill data list with the product name
            var optionList = data['window-records'];
            var container = document.getElementById('product');
            len = optionList.length;
            dataListProduct = document.createElement('datalist');
            dataListProduct.id = 'products';
            dataListProduct.size = '20';
            for (let i = 0; i < len; i += 1) {
                var option = document.createElement('option');
                option.value = optionList[i].Name;
                dataListProduct.appendChild(option);
            }

            container.appendChild(dataListProduct);
            document.getElementById('productcode').focus();


        })
        .catch(error => console.log(error))

}

//Search the product
async function searchByCode() {

    var idCode = keyCode;
    document.getElementById('productcode').value = '';
    document.getElementById('product').value = '';
    document.getElementById('attributo').value = '';

    fetch(`http://` + ip + `/api/v1/models/m_product?$filter=Name eq '` + idCode + `'`, {
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


            idProd = '';
            Name = '';
            Description = '';
            QtyEntered = '';
            idUDM = '';
            instAttrSeries_ID = '';



            a.forEach((record) => {

                document.getElementById('codice').value = record.Value;
                document.getElementById('codice').readOnly = true;
                document.getElementById('nome').value = record.Name;
                document.getElementById('udm').value = record.C_UOM_ID.identifier;
                document.getElementById('udm').readOnly = true;
                document.getElementById('qty').value = 1;
                idProd = record.id;
                idUDM = record.C_UOM_ID.id;
                if (record.M_AttributeSet_ID != undefined)
                    instAttr_ID = record.M_AttributeSet_ID.id
                else {
                    instAttr_ID = undefined;
                }
            });
            if (instAttr_ID != undefined) {
                document.getElementById('attributo').disabled = false;
                getInstAttr();

            } else {
                document.getElementById('attributo').disabled = true;
                if (setting[4] == 'A') {
                    sendOrderLine();
                }
            }

        })
        .catch(error => console.log(error))

}

function searchByName() {

    var idName = document.getElementById('product').value;
    document.getElementById('productcode').value = '';
    document.getElementById('product').value = '';
    document.getElementById('attributo').value = '';
    document.getElementById('udm').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('desc').value = '';




    fetch(`http://` + ip + `/api/v1/models/m_product?$filter=Name eq '` + idName + `'`, {
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

            idProd = '';
            Name = '';
            Description = '';
            QtyEntered = '';
            idUDM = '';




            a.forEach((record) => {

                document.getElementById('codice').value = record.Value;
                document.getElementById('codice').readOnly = true;
                document.getElementById('nome').value = record.Name;
                document.getElementById('udm').value = record.C_UOM_ID.identifier;
                document.getElementById('udm').readOnly = true;
                document.getElementById('qty').value = 1;
                idProd = record.id;
                idUDM = record.C_UOM_ID.id;
                console.log('test' + record.M_AttributeSetInstance_ID);
                if (record.M_AttributeSet_ID != undefined)
                    instAttr_ID = record.M_AttributeSet_ID.id
                else {
                    instAttr_ID = undefined;
                }




            });
            console.log('test2' + instAttr_ID);
            console.log('test3' + document.getElementById('attributes'));
            if (instAttr_ID != undefined) {
                document.getElementById('attributo').disabled = false;
                getInstAttr();
            } else {
                document.getElementById('attributo').disabled = true;
                if (setting[4] == 'A') {
                    sendOrderLine();
                }
            }

        })
        .catch(error => console.log(error))

}

function sendOrderLine() {

    instAttr_Name = document.getElementById('attributo').value;
    console.log(instAttr_Name);
    var Name = document.getElementById('nome').value;
    var Description = document.getElementById('desc').value;
    var QtyEntered = document.getElementById('qty').value;
    var C_UOM_ID = document.getElementById('udm').value;
    var docID = ipcRender_addOrderLine.sendSync('send:docid:ODV', 'ping');

    if (instAttr_Name != "") {
        var instAttrSeries = document.querySelectorAll('[value="' + instAttr_Name + '"]');
        var instAttrSeries_ID = instAttrSeries[0].getAttribute("data-id");
        console.log(instAttrSeries);
        BodyData = {

            "AD_Client_ID": {
                "id": client
            },
            "AD_Org_ID": {
                "id": org
            },
            "C_Order_ID": {
                "id": docID
            },
            "M_Product_ID": {
                "id": idProd
            },
            "Description": Description,
            "Name": Name,
            "M_Warehouse_ID": {
                "id": warehouseId
            },
            "QtyEntered": QtyEntered,
            "C_UOM_ID": {
                "id": idUDM
            },
            "C_Tax_ID": {
                "id": 1000319
            },
            "M_AttributeSetInstance_ID": {
                "id": instAttrSeries_ID
            },
            "QtyReserved": 0,
            "QtyDelivered": 0,
            "QtyInvoiced": 0,
            "LIT_StockInTrade": "test"
        };
    } else {
        BodyData = {

            "AD_Client_ID": {
                "id": client
            },
            "AD_Org_ID": {
                "id": org
            },
            "C_Order_ID": {
                "id": docID
            },
            "M_Product_ID": {
                "id": idProd
            },
            "Description": Description,
            "Name": Name,
            "M_Warehouse_ID": {
                "id": warehouseId
            },
            "QtyEntered": QtyEntered,
            "C_UOM_ID": {
                "id": idUDM
            },
            "C_Tax_ID": {
                "id": 1000319
            },
            "M_AttributeSetInstance_ID": {
                "id": 0
            },
            "QtyReserved": 0,
            "QtyDelivered": 0,
            "QtyInvoiced": 0,
            "LIT_StockInTrade": "test"
        };
    }

    console.log(BodyData);


    fetch('http://' + ip + '/api/v1/models/c_orderline/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(BodyData)
        }).then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            doNotification(data);
            document.getElementById('codice').value = '';
            document.getElementById('nome').value = '';
            document.getElementById('attributo').value = '';
            document.getElementById('udm').value = '';
            document.getElementById('qty').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('productcode').focus();



        })
        .catch(error =>
            alert("Errore inserimento!"));

}

function getInstAttr() {

    fetch(`http://` + ip + `/api/v1/models/m_attributesetinstance?$filter=m_attributeset_id eq ` + instAttr_ID, {
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

            var optionList = data['records'];

            var container = document.getElementById('attributo');
            i = 0;
            len = optionList.length;
            dl = document.createElement('datalist');
            dl.id = 'attributes';
            for (; i < len; i += 1) {
                var option = document.createElement('option');
                option.value = optionList[i].Description;
                option.setAttribute("data-id", optionList[i].id);
                dl.appendChild(option);
            }
            container.appendChild(dl);

            if (flag_ == 1) {
                container.value = keyinstAttr;
            }
            if (setting[4] == 'A') {
                sendOrderLine();
            }

        })
        .catch(error => console.log(error))

}



function lessQty() {
    var qty = document.getElementById("qty").value;
    console.log(qty);
    if (qty != '') {
        if (qty == 1) {
            alert("Non pu essere 0");
        } else {
            qty--;
            document.getElementById("qty").value = qty;
        }
    }
}


function plusQty() {
    var qty = document.getElementById("qty").value;
    if (qty != '') {
        qty++;
        document.getElementById("qty").value = qty;
    }


}