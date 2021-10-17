#  AdaHack 2021: VeggieSwap
###  Susanna Lassila and Emily Gaughan

Veggie swap is a Chrome extension with a popup that can be used to identify meat ingredients in recipes and suggest vegetarian alternatives. 

This project encourages social responsibility in two ways:
1. Trying to improve public health by encouraging healthier options - as sedentary lifestyles and modern diets are contributing to a large scale decline in public health. 
2. Helping to protect the environment by reducing meat consumption, because livestock are a major contributor to methane and CO2 in the atmosphere.

The popup is written in React.js, and the backend is written in Node.js.


## Running the Extension

1. From the **veggieSwap** directory, run the backend server by running `node backend.js`
2. Build the extension file:
	1.  If using windows ensure the `scripts` section in **frontend/package.json** includes the line `"build":  "set INLINE_RUNTIME_CHUNK=false&&react-scripts build"`
	2. If using mac ensure the `scripts` section in **frontend/package.json** includes the line `"build":  "INLINE_RUNTIME_CHUNK=false react-scripts build"`
	3. From **veggieSwap/frontend** run `npm run build` to generate a build folder which contains the extension
    > You may need to install the node and react packages used for this extension - you'll get a warning detailing which packages these are when you run the above command
3. Load the extension into chrome:
	1. Go to chrome://extensions
	2. Click "Load Unpack Extensions"
	3.  Load the **build** folder that you just created
4. Navigate to a BBC Good Food and find a recipe
5. From the recipe, click on the popup in the extensions bar 
6. Click "Get Substitutes" and the popup will do the rest!

## Future of the Project

* bigger database
* vegan
* host the server online + put extension in chrome store
* affordable options
* healthier options (non-vegan)
* seasonal swaps (environment, local economy)
* include stats about the nutrients/carbon impact before and after change


## Sources 

react web ext:
https://gilfink.medium.com/building-a-chrome-extension-using-react-c5bfe45aaf36
https://levelup.gitconnected.com/how-to-use-react-js-to-create-chrome-extension-in-5-minutes-2ddb11899815

node with react:
https://medium.com/zero-equals-false/how-to-connect-a-react-frontend-with-node-js-bccb1fb7e2bb

query paramaters:
https://stackabuse.com/get-query-strings-and-parameters-in-express-js/

building issue: https://stackoverflow.com/questions/58354362/inline-script-because-it-violates-the-following-content-security-policy-directiv

tabs:
https://stackoverflow.com/questions/51411447/using-chrome-api-with-react-js/52554077
https://stackoverflow.com/questions/6132018/how-can-i-get-the-current-tab-url-for-chrome-extension

web scraping with node:
https://www.analyticsvidhya.com/blog/2020/10/web-scraping-using-node-js/

parsing a csv file:
https://stackoverflow.com/questions/23080413/parsing-a-csv-file-using-nodejs


