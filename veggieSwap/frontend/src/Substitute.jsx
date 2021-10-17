/*global chrome*/
import React, {useState} from "react";
import axios from "axios";

function Substitute() {
    //const [list, setList] = useState("");
    
    
    function getSubstitute() {
        //var list = [];
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function(tabs) {
            // and use that tab to fill in out title and url
            var tab = tabs[0];
            //console.log(tab.url);
            var requestString = "http://localhost:5000/" + "?RecipleUrl=" + tab.url;
            axios.get(requestString,  { crossdomain: true }).then(response => {
                //setList(response.data);
                alert(response.data);
                fillInSubstitutes(response.data);
            });
        });
        
      }

      function fillInSubstitutes(output) {
        var meats = [];
        var veggies = [];
        (output.split(",")).forEach(element => {
            if (element != "") {
                meats.push(element.split(":")[0])
                veggies.push(element.split(":")[1])
            }
        })
        var table = "";
        var tag_id = document.getElementById('SubstituteResults');
        table += '<table class="ResultsTable"><tr><th>Meat</th><th>Substitute</th></tr>';
        for (let i = 0; i < meats.length; i++) { 
            table += '<tr><td class="meat">' + meats[i] + '</td><td class="veggie">' + veggies[i] + '</td></tr>';
        }
        table += '</table>';
        tag_id.innerHTML += table;
      }
    
    return (
        <div>
            <h1>VeggieSwap</h1>
            <p>Change meat to veggies</p>
            <button class="button" onClick={getSubstitute}>
                Generate Substitutes
            </button>
            <p id="SubstituteResults"></p>
        </div>
    )
}
  
export default Substitute;