// import DataFrame from 'dataframe.js';
// import DataFrame, { Row } from 'dataframe.js';


var DataFrame = require('dataframe-js').DataFrame;
// var DataFrame = dfjs.DataFrame;

const df = new DataFrame([
    [1, 2],
    [3, 4],
], ['A', 'B']);


df.show()

console.log(__dirname + "/data/Substitutes.csv")
const path = __dirname + "\data\Substitutes.csv"
DataFrame.fromCSV(path).then(df => df.show());
