const express = require("express");
var fs = require('fs'); 
var parse = require('csv-parse');
var path = require('path');
const request= require("request-promise")
const cheerio= require("cheerio");
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

function csvToList(res, callback) {
    var fileLocation = path.join(__dirname, 'data', 'Substitutes.csv');
    //console.log(fileLocation);

    var csvData=[];
    fs.createReadStream(fileLocation)
        .pipe(parse({delimiter: ':'}))
        .on('data', function(csvrow) {
            for (i=0;i<csvrow.length;i++){
                csvData.push(csvrow[i].split(","));
            }
            //csvData.push(csvrow)   
        })
        .on('end',function() {
        //do something with csvData;   
        //console.log(csvData);
        callback(csvData);  
        });
}

function getIngredientsFromPage(url, res, callback) {
    var ingredients = [];

    request(url, (error, response, html) => {
        if (!error && response.statusCode==200) {
            const $= cheerio.load(html);
            const datarow= $(".recipe__ingredients");

            var liArr = [];
            datarow.find("li").each( function() {
                liArr.push($(this).html());
            });
            for (i=0;i<liArr.length;i++){
                ingredients.push(liArr[i].split("<!-- -->")[1].split(" "));
            }

            // console.log(ingredients);
            callback(ingredients);
        }
    });
}


function findSubstitute(ingredientListList, substitutes, res) {
    var output = ""
    ingredientListList.forEach(ingredientList => {
        ingredientList.forEach(ingredient => {
            substitutes.forEach(element => {
                if (element[0] == ingredient) {
                    output += ingredient + ":" + element[1] + ",";
                    
                }
            });
        });
    });
    res.send(output);
}

function getSubsForURL(url, res) {
    getIngredientsFromPage(url, res, function(ListofLists) {
        csvToList(res, function(csvData) {    
            findSubstitute(ListofLists, csvData, res);
            });
        });
}

// app.get("/", function(req, res) {
//     getSubsForURL("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew", res)
// });

app.get("/", function(req, res) {
    let url = req.query.RecipleUrl;
    console.log(url);
    getSubsForURL(url, res)
    //getSubsForURL("https://www.bbcgoodfood.com/recipes/beef-guinness-stew-bacon-dumplings", res)
});

let port = process.env.PORT;
if(port == null || port == "") {
port = 5000;
}
app.listen(port, function() {
console.log("Server started successfully");
});

// var testResult;
// getSubsForURL("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew", function(results) {
//     testResult = results;
// });
// console.log(testResult);


// function betterFindSubstitute(url) {
    
//     var output = ""
//     ingredientListList.forEach(ingredientList => {
//         ingredientList.forEach(ingredient => {
//             substitutes.forEach(element => {
//                 if (element[0] == ingredient) {
//                     //console.log(ingredient + ": " + element[1]);
//                     output += ingredient + ":" + element[1] + ",";
//                 }
//             });
//         });
//     });
//     console.log(output);
//     return output;
// }

// console.log(getSubsForURL("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew"));

// getIngredientsFromPage("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew", function(ListofLists) {
//     csvToList(function(csvData) {    
//         findSubstitute(ListofLists, csvData);
//         });
// });