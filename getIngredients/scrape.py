import requests
import sys

print(sys.version)

from bs4 import BeautifulSoup

URL = "https://www.bbcgoodfood.com/recipes/best-spaghetti-bolognese-recipe"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

# ingredients = soup.find(class_="recipe_ingredients")
# print(ingredients.prettify())