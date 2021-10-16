var fs = require('fs'); 
var parse = require('csv-parse');
var path = require('path');
const request= require("request-promise")
const cheerio= require("cheerio");

function csvToList(callback) {
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

function getIngredientsFromPage(url, callback) {
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


function findSubstitute(ingredientListList, substitutes) {
    ingredientListList.forEach(ingredientList => {
        ingredientList.forEach(ingredient => {
            substitutes.forEach(element => {
                if (element[0] == ingredient) {
                    console.log(ingredient + ": " + element[1]);
                }
            });
        });
    });
}

getIngredientsFromPage("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew", function(ListofLists) {
    csvToList(function(csvData) {    
        findSubstitute(ListofLists, csvData);
        });
});