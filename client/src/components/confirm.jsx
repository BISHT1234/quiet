

export const Confirm=(props)=>{
    return(
        <div id="confirm_box">
         <h3>{props.discription}</h3>
         <div>
         <button id="cancel" onClick={()=>{props.oncancel()}  }>cancel</button>
         <button id="confirm" onClick={()=>{props.onconfirm()}}>{props. confim_title}</button></div>
        </div>
        
    )
}