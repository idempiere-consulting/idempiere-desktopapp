const electron_settings = window.require("electron");
const ipcRender_settings = electron_settings.ipcRenderer;
//var themeDefault = stash.get('themeDefault');
//console.log(themeDefault);

function theme(arg) {
    switch (arg) {
        case 1:
            if (confirm("Sei sicuro di voler cambiare tema?")) {
                theme1();
            }
            break;

        case 2:
            if (confirm("Sei sicuro di voler cambiare tema? ")) {
                theme2();
            }
            break;

        case 3:
            if (confirm("Sei sicuro di voler cambiare tema? ")) {
                theme3();
            }
            break;
        default:
            break;
    }
}

function theme1() {

    var theme = ["#909090", "#404040", "#F0F8FF", "grey", "black", "refresh1", "refreshHover1", "back1", "white"];
    stash.set('theme', theme);
    location.reload();
}

function theme2() {

    var theme = ["#008080", "#F0F8FF", "black", "#097969", "black", "refresh1", "refreshHover2", "back2", "white"];
    stash.set('theme', theme);
    location.reload();
}

function theme3() {

    var theme = ["#FA8072", "#FAEBD7", "black", "#cd5c5c", "black", "refresh1", "refreshHover3", "back3", "black"];
    stash.set('theme', theme);
    location.reload();
}