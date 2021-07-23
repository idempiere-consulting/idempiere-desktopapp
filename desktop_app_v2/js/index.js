const electron_main = window.require("electron");
const ipcRender_main = electron_main.ipcRenderer;

const authToken = ipcRender_main.sendSync('send:authtoken', 'ping');
const clientid = ipcRender_main.sendSync('send:clientId', 'ping');
const ip = ipcRender_main.sendSync('send:ip', 'ping');

var chartRole = ipcRender_main.sendSync('send:chartRole', 'ping');


var Chart = require('chart.js');

var arrayDataChart1 = [];
var arrayDataChart2 = [];
var arrayDataChart3 = [];
var arrayDataChart4 = [];
let myChart;



var boxinfo = document.getElementsByClassName("item-first");

function FillBoxInfo(id, info, value) {
    boxinfo[id].style.display = '';
    boxinfo[id].children[0].children[0].children[0].innerHTML = info;
    boxinfo[id].children[0].children[0].children[2].innerHTML = value;
}


//Box Information

getTotaleOrderLines();

async function getTotaleOrderLines() {
    await fetch(`http://` + ip + `/api/v1/models/c_orderline?$filter= AD_Client_ID eq ` + clientid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {

            FillBoxInfo(0, 'Totale Ordini di linea', data.records.length);
            getTotaleInvoiceLines();
        })
        .catch(error => console.log(error))
}


async function getTotaleInvoiceLines() {
    await fetch(`http://` + ip + `/api/v1/models/c_invoice?$filter= AD_Client_ID eq ` + clientid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            FillBoxInfo(1, 'Totale Fatture', data.records.length);



        })
        .catch(error => console.log(error))
}














//Chart

takeDataForChart();
async function takeDataForChart() {
    await fetch('http://' + ip + '/api/v1/windows/chart-mobile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            var records = data["window-records"];
            //Filtraggio in base al numero di grafico e inserimento dell'elemento nel array
            records.forEach(element => {
                switch (element.chartno) {
                    case "01": {
                        arrayDataChart1.push(element);
                    }
                    break;
                case "02": {
                    arrayDataChart2.push(element);
                }
                break;
                case "03": {
                    arrayDataChart3.push(element);
                }
                break;
                case "04": {
                    arrayDataChart4.push(element);
                }
                break;
                }
            });
            //Funzione per predere il tipo di grafico dall'api
            GetTypeChart();





        })
        .catch(error => console.log(error))
}







//Tipo di grafico
async function GetTypeChart() {
    await fetch('http://' + ip + '/api/v1/windows/chart-mobile-setup', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        }).then(res => {
            return res.json()
        })
        .then(data => {
            var count = 0;
            var records = data["window-records"];

            var charts = document.getElementsByClassName('item-main');
            records.forEach(element => {

                if (chartRole != undefined && chartRole.includes(element.Value)) {


                    charts[count].style.display = '';
                    var chart = charts[count].firstElementChild.getContext('2d');

                    switch (element.Value) {

                        //Case bar chart
                        case "01": {
                            //Set up chart
                            myChart = new Chart(chart, {
                                type: 'bar',
                                data: {
                                    labels: [],
                                    datasets: []
                                },
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: element.Name
                                        },
                                    },
                                    responsive: true,
                                    scales: {
                                        x: {
                                            stacked: true,
                                        },
                                        y: {
                                            stacked: true
                                        }
                                    }
                                }


                            });

                            if (arrayDataChart1.length > 0) {
                                //Filtraggio in base al series
                                DataChart1FilterBySeries(arrayDataChart1);
                            }


                        }
                        break;
                        //Case line chart
                    case "02": {
                        myChart = new Chart(chart, {
                            type: 'line',
                            data: {
                                labels: [],
                                datasets: []
                            },
                            options: {
                                responsive: true,

                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: element.Name
                                    }
                                },
                                elements: {
                                    line: {
                                        tension: 0.2
                                    }
                                },
                                scales: {
                                    y: {
                                        min: -10
                                    }
                                }

                            },
                        });

                        if (arrayDataChart2.length > 0) {
                            //Filtraggio in base al series
                            DataChart1FilterBySeries(arrayDataChart2);
                        }

                    }
                    break;
                    case "03": {

                    }
                    break;

                    }
                    count++;
                }



            });




        })
        .catch(error => console.log(error))
}






function DataChart1FilterBySeries(array) {

    var numberSeries = [];
    var arrayFilterBySeries = [];
    var add = true;

    //Ciclo per prendere tutti i numeri di serie unici nel vettore che è stato preso dall'api
    for (let index = 0; index < array.length; index++) {
        //Il primo oggetto deve essere aggiunto sicuramente perchè è univoco
        if (numberSeries.length == 0) {
            numberSeries.push(array[index].series);
        } else {
            add = true;
            //Ciclo che controlla l'unicità di un numero di serie(ovvero che deve essere presente una sola volta)
            for (let j = 0; j < numberSeries.length; j++) {
                //Se il numero di serie è presente nell'array numberSeries significa che sono prenseti piu oggetti con lo stesso numero di serie
                if (array[index].series == numberSeries[j]) {
                    add = false;
                }
            }
            if (add) {
                numberSeries.push(array[index].series);

            }
        }
    }

    //Questo ciclo filtra per il numero di serie
    for (let index = 0; index < numberSeries.length; index++) {
        for (let z = 0; z < array.length; z++) {
            if (array[z].series == numberSeries[index]) {
                arrayFilterBySeries.push(array[z]);
            }
        }
        //Una volta filtrato per la serie si ottine un vettore contente tutti gli oggetti con quel determinato numero di serie. Ed ora si filtra per data 
        DataChart1FilterByData(arrayFilterBySeries, arrayFilterBySeries[0].series);

        arrayFilterBySeries = [];
    }
}


function DataChart1FilterByData(data, filtroDaset) {
    let arrayData = [];
    let arrayLabel = [];
    //Ciclo per settare l'array a 0. arrayData conterrà la somma dei dati di un singolo oggetto filtrato sia per numero di serie e per data(la data torna indietro di 6 mesi)   
    for (let j = 0; j < 6; j++) {
        arrayData[j] = 0;
    }
    //Ordinamento vettore
    for (let y = 0; y < data.length; y++) {
        for (let z = 0; z < data.length; z++) {
            if (data[z].label > data[y].label) {
                var temp = data[y];
                data[y] = data[z];
                data[z] = temp;
            }
        }
    }
    //Vettore per inserire come asse x del grafico
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //Ciclo filtraggio per data
    for (let index = 0; index < data.length; index++) {
        //Prendere la data corrente
        var dateCurrent = new Date();
        /*Ciclo per capire che in mese si trova l'ordine di linea */
        for (let z = 0; z < 6; z++) {
            //startInterval prende la data corrente e setta come mese di partenza quello di 6 mesi
            var startInterval = new Date(dateCurrent);
            startInterval.setMonth(dateCurrent.getMonth() - 5 + z);
            //dateDataArray prende la data che si vuole filtrare
            var dateDataArray = new Date(data[index].label);
            //arrayLabel prende tutti i 6 mesi e l'anno precendete ad oggi  
            if (index == 0)
                arrayLabel.push(months[startInterval.getMonth()] + " " + startInterval.getFullYear());
            if (startInterval.getMonth() == dateDataArray.getMonth() && startInterval.getFullYear() == dateDataArray.getFullYear()) {
                if (data[index].Qty == 0) {
                    arrayData[z]++;
                } else {
                    arrayData[z] += data[index].Qty;
                }
            }
        }
    }
    /*
    Funzione per aggiungere il i dati appena filtrati nel grafico: 
    1) passandogli il grafico(myChart) , 
    2) il nome del dataSet(filtroDataset),
    3) il numero degli ordini di vendita (arrayData),
    4) i parametri per l'asse x (arrayLabel)
    */
    addData(myChart, filtroDaset, arrayData, arrayLabel);
    arrayLabel = [];
    arrayData = [];


}

function disorder(p) {
    var i, pos, temp;
    for (i = 0; i < p.length; i++) {
        pos = Math.random() * p.length | 0;
        temp = p[pos];
        p.splice(pos, 1);
        p.push(temp);
    }
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var array = [];
    for (let index = 0; index < letters.length; index++) {
        array.push(letters[index]);
    }
    disorder(array);
    letters = '';
    array.forEach(element => {
        letters += element
    });

    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
}


function addData(chart, labelFilter, data, labelChart) {
    //Creazione dataSet con i parametri
    var colour = getRandomColor();
    var newDataSet = {
        label: labelFilter,
        data: data,
        borderColor: colour,
        backgroundColor: colour
    }
    //Svuotato paramentri asse x in modo da averlo vuoto per i nuovi dati
    chart.data.labels = [];
    //Inserimento paramentri asse x
    labelChart.forEach(element => {
        chart.data.labels.push(element);
    });
    //Inserimento del nuovo dataSet nel grafico
    //chart.data.datasets = [];
    chart.data.datasets.push(newDataSet);
    //Aggiornamento grafico
    chart.update();
}