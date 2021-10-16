// import DataFrame from 'dataframe.js';
// import DataFrame, { Row } from 'dataframe.js';

var path = require('path');
var DataFrame = require('dataframe-js').DataFrame;
// var DataFrame = dfjs.DataFrame;

const df = new DataFrame([
    [1, 2],
    [3, 4],
], ['A', 'B']);


df.show();

var x = path.join(__dirname, 'data', 'Substitutes.csv');
console.log("\\" + x);
DataFrame.fromCSV(x).then(df => df.show()).catch(function () {
     console.log("Promise Rejected");
});
