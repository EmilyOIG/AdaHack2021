var path = require('path');
//var d3 = require('d3');
var DataFrame = require('dataframe-js').DataFrame;
// var DataFrame = dfjs.DataFrame;


var fileLocation = path.join(__dirname, 'data', 'Substitutes.csv');
console.log(fileLocation);


var csv = require('csv');
csv.parse(fileLocation, {columns: true}, function(err, data){
    console.log(JSON.stringify(data, null, 2));
});

//d3.csv(fileLocation).then(function(data) { console.log(data) });

// df contains a promise object for the dataframe
// const df = DataFrame.fromCSV(x).then(data => { data.show() }).then(data => { return data; })  //.then(data => { console.log(data.find(row => row.get('Ingredient') === 'chicken').get('Substitute'))})


// const printDf = () => {
//     df.then((data) => {
//       data.show();
//     });
//   };

// printDf();
