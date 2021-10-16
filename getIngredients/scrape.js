function getIngredientsFromPage(url) {
    const request= require("request-promise")
    const cheerio= require("cheerio");

    request(url, (error, response, html) => {
        if (!error && response.statusCode==200) {
            const $= cheerio.load(html);
            const datarow= $(".recipe__ingredients");

            var liArr = [];
            datarow.find("li").each( function() {
                liArr.push($(this).html());
            });
            var ingredients = [];
            for (i=0;i<liArr.length;i++){
                ingredients.push(liArr[i].split("<!-- -->"));
            }
            console.log(ingredients);
        }
    });
}

getIngredientsFromPage("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew");