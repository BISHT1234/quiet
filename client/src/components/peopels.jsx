import { useContext } from "react"
import { Cardmodel } from "./cardmodel"
import { context } from "./homepage"

export function People(){
   
    function handel(){

    }
    const creatcard =(friends,i)=>{
  return(
    <Cardmodel key={i}
    name={friends.Name}
    username={friends.Username}
    ></Cardmodel>
        )
    
       }
       
       return (
        <div onClick={handel}>
{/* { {a.data.map(creatcard)} } */}
        </div>
       )
}