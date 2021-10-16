const request= require("request-promise")
const cheerio= require("cheerio");

request("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew", (error, response, html) => {
    if (!error && response.statusCode==200) {
        const $= cheerio.load(html);

        const datarow= $(".recipe__ingredients");
        const output= datarow.find("li").text();
        console.log(output);
    }
});