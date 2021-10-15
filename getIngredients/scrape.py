import requests
import os
import numpy as np
import pandas as pd
from bs4 import BeautifulSoup

class MeatSubstitution:

    def __init__(self):
        self.substitutes = self.loadData()

    def loadData(self):
        path = os.path.join(os.getcwd(), "data", "Substitutes.csv")
        df = pd.read_csv(path)
        df.set_index('Ingredient', inplace=True)
        print(df.head())
        return df

    def getIngredientsFromPage(self, url):
        page = requests.get(url)
        soup = BeautifulSoup(page.content, "html.parser")
        ingredientSection = soup.find("section", class_="recipe__ingredients")
        ingredients = ingredientSection.find_all("li", class_="list-item")

        results = []
        for i in ingredients:
            results.append(i.text.split(" "))

        #print(results)
        return results

    def function(self, ingredientsList):
        result = []
        
        for ingredient in ingredientsList:
            meat = self.findMeat(ingredient)
            if meat != None:
                result.append((meat,self.findSubstitute(meat)))

        return result

    def findMeat(self, ingredient):
        for word in ingredient:
            if word in self.substitutes.index:
                return word
        return None

    def findSubstitute(self, meatType):
        substitute = self.substitutes.loc[meatType]['Substitute']
        return substitute

sub = MeatSubstitution()

ing = sub.getIngredientsFromPage("https://www.bbcgoodfood.com/recipes/slow-cooker-beef-stew")
print(sub.function(ing))