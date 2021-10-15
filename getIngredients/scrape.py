import requests

from bs4 import BeautifulSoup

def getIngredientsFromPage(url):
    page = requests.get(url)
    
    soup = BeautifulSoup(page.content, "html.parser")
    ingredientSection = soup.find("section", class_="recipe__ingredients")
    ingredients = ingredientSection.find_all("li", class_="list-item")

    results = []
    for i in ingredients:
        results.append(i.text.split(" "))

    #print(results)
    return results

getIngredientsFromPage("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew")


def containsMeat(ingredient):
    return False

def findSubstitute(meatType):
    return None