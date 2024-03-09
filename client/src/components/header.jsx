import React from "react";

export function Navbar(props){
    return (
     
        <div id='navbar'>
            <h1>Quiet</h1>
<span onClick={()=>{props.open(true)}} style={{alignSelf:"center"}}>
<img id="dp" src={props.src}></img>
</span>
</div>
      
    )

}
