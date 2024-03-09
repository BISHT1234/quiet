import React, { createContext, useContext, useEffect, useState } from "react";

import {Cardmodel} from "./cardmodel";


import { context } from "./homepage";



export function Mobile(){
const a=useContext(context)
  function opench(){
    window.open('/mobilechat','_self')
  }
  const creatcard =(friends,i)=>{ 
    return(
<Cardmodel key={i}
name={friends.Name}
username={friends.Username}
></Cardmodel>
    )

   }
    return(
       <>
       <div id="mobilenav" style={{height:'50px',width:'100%',display:'flex'}}>
        <div>chats</div>
        <div>search</div>
       </div>
       <div onClick={opench}>
    {a.data.map(creatcard)}
       </div>
       </>
    )
}
