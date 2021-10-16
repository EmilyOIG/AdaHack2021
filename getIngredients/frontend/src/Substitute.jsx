import React, {useState} from "react";
import axios from "axios";

function Substitute() {
    const [list, setList] = useState("");
    
    
    function getSubstitute() {
        axios.get("http://localhost:5000/",  { crossdomain: true }).then(response => {
          setList(response.data);
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