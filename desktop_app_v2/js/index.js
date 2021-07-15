const electron_main = window.require("electron");
const ipcRender_main = electron_main.ipcRenderer;

const authToken = ipcRender_main.sendSync('send:authtoken', 'ping');
const userBPartner = ipcRender_main.sendSync('send:bp', 'ping');
const ip = ipcRender_main.sendSync('send:ip', 'ping');


var Chart = require('chart.js');

var arrayDataChart1 = [];
var arrayDataChart2 = [];
var arrayDataChart3 = [];
var arrayDataChart4 = [];
let myChart;
var count = 0;


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

            //Filter by number of chart and put the element in the corret array
            records.forEach(element => {
                switch (element.chartno) {
                    case "01":
                        {
                            arrayDataChart1.push(element);
                        }
                        break;
                    case "02":
                        {
                            arrayDataChart2.push(element);
                        }
                        break;
                    case "03":
                        {
                            arrayDataChart3.push(element);
                        }
                        break;
                    case "04":
                        {
                            arrayDataChart4.push(element);
                        }
                        break;
                }
            });
            //Function to take the type chart from api request
            GetTypeChart();





        })
        .catch(error => console.log(error))
}








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
            var records = data["window-records"];

            console.log(records);
            var charts = document.getElementsByClassName('myChart');
            console.log(charts);
            records.forEach(element => {
                var chart = charts[count].getContext('2d');

                console.log(element.Value);
                console.log(arrayDataChart1.length);
                switch (element.Value) {

                    //Case bar chart
                    case "01":
                        {
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
                                    /* responsive: true, */
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
                                console.log(arrayDataChart1);
                                //Filter on base the obj series
                                DataChart1FilterBySeries(arrayDataChart1);
                            }


                        }
                        break;
                        //Case line chart
                    case "02":
                        {
                            myChart = new Chart(chart, {
                                type: 'line',
                                data: {
                                    labels: [],
                                    datasets: []
                                },
                                options: {
                                    /*                                     responsive: true,
                                     */
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
                                console.log(arrayDataChart2);
                                //Filter on base the obj series
                                DataChart1FilterBySeries(arrayDataChart2);
                            }

                        }
                        break;
                    case "03":
                        {

                        }
                        break;

                }
                count++;
                //Call api to take data from view of dabase
                takeDataForChart();


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
    for (let index = 0; index < data.length; index++) {
        for (let z = 0; z < data.length; z++) {
            if (data[z].label > data[index].label) {
                var temp = data[index];
                data[index] = data[z];
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
            var startInterval = new Date(dateCurrent.toLocaleDateString());
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
    /*Funzione per aggiungere il i dati appena filtrati nel grafico: 
    1) passandogli il grafico(myChart) , 
    2) il nome del dataSet(filtroDataset),
    3) il numero degli ordini di vendita (arrayData),
    4) i parametri per l'asse x (arrayLabel)
    */
    addData(myChart, filtroDaset, arrayData, arrayLabel);
    arrayLabel = [];
    arrayData = [];


}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
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

/*var mousePosition;
var offset = [0,0];
var div;
var isDown = false;
divmain=document.createElement("div");
divmain.style.position = "relative";
divmain.style.width = "600px";
divmain.style.height = "700px";
divmain.style.left = "0px";
divmain.style.top = "0px";
divmain.style.background = "yellow"; 


div = document.createElement("div");
div.style.position = "absolute";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "blue";


div2 = document.createElement("div");
div2.style.position = "absolute";
div2.style.left = "0px";
div2.style.top = "0px";
div2.style.width = "100px";
div2.style.height = "100px";
div2.style.background = "blue";
div2.style.color = "blue";
divmain.appendChild(div2);
divmain.appendChild(div);
document.body.appendChild(divmain);

div.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        if((mousePosition.x +offset[0])<=500 && (mousePosition.y + offset[1]) <=600 && mousePosition.x +offset[0]>= 0 && mousePosition.y + offset[1]>=0){
          div.style.left = (mousePosition.x + offset[0]) + 'px';
          div.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
        console.log(div.style.top);
    }
}, true);*/