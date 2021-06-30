const electron_main = window.require("electron");
const ipcRender_main = electron_main.ipcRenderer;

document.getElementById("span_usernmane_jslogic").innerHTML = ipcRender_main.sendSync('send:user');


PermessiMenu();

function logOut() {
    if (window.confirm("Se esci al prossimo Login dovrai reinserire nome utente e password, sicuro di voler uscire? ")) {
        /*  stash.cut('username');
         stash.cut('password');
         stash.cut('ip');
         stash.cut('roleid');
         stash.cut('organizationid');
         stash.cut('clientid');
         stash.cut('warehouseid');
         stash.cut('language');*/
        ipcRender_main.send('page:change', 0);

    } else {}
}


function PermessiMenu() {
    //Declare and set variable 
    const permission = ipcRender_main.sendSync('send:permission');
    const menu = document.getElementsByClassName("macrocategory-permission-menu");
    const array_permission = [];
    var temp = "";
    //Take the permission for each page
    for (let i = 0; i < permission.length; i++) {
        if (permission[i] != '-') {
            temp = temp + permission[i];
            if ((i + 1) == permission.length) {
                array_permission.push(temp);
            }
        } else {
            if (temp != "") {
                array_permission.push(temp);
                temp = "";
            }
        }
    }
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
    }
}