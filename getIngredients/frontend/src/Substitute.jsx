/*global chrome*/
import React, {useState} from "react";
import axios from "axios";

function Substitute() {
    const [list, setList] = useState("");
    
    
    function getSubstitute() {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function(tabs) {
            // and use that tab to fill in out title and url
            var tab = tabs[0];
            //console.log(tab.url);
            var requestString = "http://localhost:5000/" + "?RecipleUrl=" + tab.url;
            axios.get(requestString,  { crossdomain: true }).then(response => {
                setList(response.data);
            });
        });
        
      }
    
    return (
        <div>
            <button onClick={getSubstitute}>
                Generate Substitutes
            </button>
            <h1>{list}</h1>
        </div>
    )
}
  
export default Substitute;