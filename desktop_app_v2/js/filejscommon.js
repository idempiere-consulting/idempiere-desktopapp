const electron_2 = window.require("electron");
const ipcRender_2 = electron_2.ipcRenderer;

document.getElementById("span_usernmane_jslogic").innerHTML = ipcRender_2.sendSync('send:user');
PermessiMenu();


function logOut() {
    if (window.confirm("Se esci al prossimo Login dovrai reinserire nome utente e password, sicuro di voler uscire? ")) {
        stash.cut('username');
        stash.cut('password');
        stash.cut('ip');
        stash.cut('roleid');
        stash.cut('organizationid');
        stash.cut('clientid');
        stash.cut('warehouseid');
        stash.cut('language');
        ipcRender_2.send('page:change', 0);

    }
}



//Max permessi 7-7-3-3-1A-7-31-1-1-1-1-15
function PermessiMenu() {
    //Declare and set variable 
    const permission = ipcRender_2.sendSync('send:permission');
    const menu = document.getElementsByClassName("macrocategory-permission-menu");
    const array_permission = [];
    const array_permission_setting = [];
    var temp = "";
    var temp2 = "";
    //Take the permission for each page
    for (let i = 0; i < permission.length; i++) {
        if (permission[i] != '-') {

            if (!isNaN(permission[i])) {
                temp = temp + permission[i];
            } else {
                temp2 = temp2 + permission[i];
            }
            if ((i + 1) == permission.length) {
                array_permission.push(temp);
                if (temp2 != "")
                    array_permission_setting.push(temp2);
                else
                    array_permission_setting.push(" ");
            }



        } else {
            if (temp != "") {
                array_permission.push(temp);
                temp = "";
                if (temp2 != "") {
                    array_permission_setting.push(temp2);
                    temp2 = "";
                } else {
                    array_permission_setting.push(" ");
                }
            }

        }
    }
    console.log(array_permission_setting);

    ipcRender_2.send('save:permission_settings', array_permission_setting);
    console.log(array_permission);
    console.log(menu.length);
    if (array_permission != undefined && menu.length == array_permission.length) {
        for (let index = 0; index < menu.length; index++) {
            if (array_permission[index] == 0) {
                //console.log("none " + index);
                menu[index].style.display = "none";
            } else {
                var subMenu_categoryPermission = array_permission[index];
                //html li del sottomenu
                var sub_menu = menu[index].getElementsByClassName("category-permission-menu");
                //console.log(sub_menu.length);
                if (sub_menu.length > 1) {
                    var potenza = Math.pow(2, sub_menu.length);

                    if (subMenu_categoryPermission <= (potenza - 1) && subMenu_categoryPermission > -1) {

                        subMenu_categoryPermission = (subMenu_categoryPermission >>> 0).toString(2);
                        //console.log(subMenu_categoryPermission.length + "-" + sub_menu.length);
                        if (subMenu_categoryPermission.length < sub_menu.length) {

                            while (subMenu_categoryPermission.length < sub_menu.length) {
                                subMenu_categoryPermission = '0' + subMenu_categoryPermission;
                            }
                        }
                        //console.log(subMenu_categoryPermission + '\n___________________________' + index);
                        for (let i = 0; i < subMenu_categoryPermission.length; i++) {
                            if (subMenu_categoryPermission[i] == 0) {
                                sub_menu[i].style.display = "none";
                            }

                        }
                    } else {
                        alert("Numero permesso troppo elevato per la pagina " + (index + 1));
                        menu[index].style.display = "none";
                    }
                }
            }
        }
    } else {
        alert("Problem with permession");
        for (let i = 0; i < menu.length; i++) {
            menu[i].style.display = "none";
        }
    }
}









/* Function to filter the table */
function filterFromInputToTable(nameInput, nameTable, indexTd) {
    var input, filter, table, tr, td, i, txtValue;
    //Take the input filter
    input = document.getElementById(nameInput);
    filter = input.value.toUpperCase();
    //Take table and rows
    table = document.getElementById(nameTable);
    tr = table.getElementsByTagName("tr");
    //Cycle to take each row of table 
    for (i = 0; i < tr.length; i++) {
        //Take the cell in position 0 because there is the value of document
        td = tr[i].getElementsByTagName("td")[indexTd];
        if (td) {
            //Take the value of td
            txtValue = td.textContent || td.innerText;
            //If the string in the filter is present in the td it return position start
            //Else return -1 because the string isn't prensent in the td  
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function OrderTable(nameTbodyTable, nCell) {
    var switching = true;
    var shouldSwitch;
    var x, y, index;
    table = document.getElementById(nameTbodyTable);

    while (switching) {
        switching = false;
        for (index = 0; index < table.rows.length - 1; index++) {
            shouldSwitch = false;
            x = table.rows[index].cells[nCell];
            y = table.rows[index + 1].cells[nCell];
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
}