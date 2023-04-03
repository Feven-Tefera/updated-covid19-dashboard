// summary api
fetch('https://api.covid19api.com/summary')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    tableappend(data);
console.log(data);
})
.catch(error => {
console.error('Error fetching data:', error);
});

// world total api
fetch('https://api.covid19api.com/world/total')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
console.log(data);
worldtotal(data);
})
.catch(error => {
console.error('Error fetching data:', error);
});
 

// south aftrica api 
fetch('https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
console.log(data);
})
.catch(error => {
console.error('Error fetching data:', error);
});


// status api
fetch('https://api.covid19api.com/stats')
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
console.log(data);
statuschart(data);
})
.catch(error => {
console.error('Error fetching data:', error);
});



// search and draw table

var d1 = "";
function click111(){
    inputValue = document.getElementById('valueOfInput').value;

    fetch('https://api.covid19api.com/summary')
    .then(respose=>respose.json())
    .then(summaryData=>{
          for(let i=0; i < summaryData.Countries.length; i++){
            if(summaryData.Countries[i].Country == inputValue){
               d1 = summaryData.Countries[i].TotalConfirmed; 
                break;
            }
          }
          draw(d1)
    })
}


function draw(confirmed){
    Highcharts.chart('chart5', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'By Country Total ConFirmed'
        },
        xAxis: {
            categories: ['TotalConfirmed']
        },
        yAxis: {
            title: {
                text: 'country confirmed covid19'
            }
        },
        series: [ {
            name: 'Total Covid19 Confirmed ',
            data: [parseFloat(confirmed)]
        }]
    });
}

// char one
// world total chart 

function worldtotal(info){
    Highcharts.chart('chart4', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'World Total Covid19 Record'
        },
        xAxis: {
            categories: ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered']
        },
        yAxis: {
            title: {
                text: 'World Total'
            }
        },
        series: [ {
            name: 'world Total',
            data: [info.TotalConfirmed, info.TotalDeaths, info.TotalRecovered]
        }]
    });
}

// chart two

Highcharts.chart('chart2', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'South Africa Covid19 record'
    },
    xAxis: {
        categories: ['Confirmed', 'Active', 'Recovered']
    },
    yAxis: {
        title: {
            text: 'Country record'
        }
    },
    series: [{
        name: 'Active',
        data: [663282, 54260, 592904]
    }, {
        name: 'Recovered',
        data: [665188, 54753, 594229]
    }, {
        name: 'Deaths ',
        data: [667049, 54850, 595916]
    }, {
        name: 'Confirmed',
        data: [668529, 53068, 599149]
    }
]
});

// chart 3 summary 
Highcharts.chart('chart3', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Summary For Covid19 Records'
    },
    series: [{
        name: 'Covid19 Records',
        data: [
            ['NewConfirmed', 177325],
            ['TotalConfirmed', 674300771],
            ['NewDeaths', 1319],
            ['TotalDeaths', 6793224]
          
        ]
    }]
});


// chart 4 status
function statuschart(stat){
    Highcharts.chart('container', {
        title: {
            text: 'Covid19 Status',
            align: 'left'
        },
        
        xAxis: {
            categories: ['Countries', 'ByCountryAllStatus', 'ByCountryTotal', 'DayOne', 'DayOneAllStatus', 'CountryDayOneTotalAllStatus', 'LiveCountryStatus', 'WorldTotal', 'WorldDaily']
        },
        series: [{
            type: 'column',
            name: 'Record',
            colorByPoint: true,
            data: [parseFloat(stat.Countries), parseFloat(stat.ByCountryAllStatus), parseFloat(stat.ByCountryTotal), parseFloat(stat.DayOne), parseFloat(stat.DayOneAllStatus), parseFloat(stat.CountryDayOneTotalAllStatus), parseFloat(stat.LiveCountryStatus), parseFloat(stat.WorldTotal), parseFloat(stat.WorldDaily) ],
            showInLegend: false
        }]
    });
}


// table
function tableappend(data){

    const tablebody = document.querySelector('table');
   console.log(data);
  
     data.Countries.forEach(info => {
     const tr = document.createElement('tr');
  
     const name = document.createElement('td');
     name.textContent = info.Country;
    
     const totalconf = document.createElement('td');
     totalconf.textContent = info.TotalConfirmed;
    
     const totaldea = document.createElement('td');
     totaldea.textContent=info.TotalDeaths;
    
     const newcon = document.createElement('td');
     newcon.textContent=info.NewConfirmed;
     tr.appendChild(name);
     tr.appendChild(totalconf);
     tr.appendChild(totaldea);
     tr.appendChild(newcon);
   
     tablebody.appendChild(tr);
    });
  }
  