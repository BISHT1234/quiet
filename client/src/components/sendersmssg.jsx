
export function Sendermssg(prop){
    
    const date=new Date(prop.mssg.createdAt)

var Min =date.getMinutes()<10?Min='0'+date.getMinutes():   Min=date.getMinutes()
var hour = date.getHours()>12?date.getHours()-12: hour=date.getHours()
var ampm=date.getHours() >= 12 ? 'pm':'am'
var Hr = hour<10 ?'0'+hour: hour
const time=Hr+':'+Min+' '+ampm

//////////
const imgclick = (src,type)=>{
const container = document.getElementById('root')
let element = document.createElement('div')
element.id='image-contanier'
Object.assign(element.style,{height:'100%',width:'100%',top:'0',position:'absolute',display:'grid'})
let exit=document.createElement('i')
exit.className='bi bi-x'
Object.assign(exit.style,{height:'10%',width:'2%',position:'absolute',top:'0',right:'50px',color:'white',fontSize:'xx-large'})
element.appendChild(exit)
if(type==='image')
{let imgelement= document.createElement('img')
imgelement.src=src
Object.assign(imgelement.style,{height:'60%',width:'60%',position:'absolute',alignSelf:'center',justifySelf:'center'})

element.appendChild(imgelement)}
if(type==='mp4'){
    let videoelement = document.createElement('video')
    videoelement.src=src
    Object.assign(videoelement.style,{height:'60%',width:'60%',position:'absolute',alignSelf:'center',justifySelf:'center'})
  videoelement.controls='controls'
    element.appendChild(videoelement)
}
container.append(element)
exit.addEventListener('click',()=>{
    container.removeChild(element)
})
}
//////////////////
    const typeofmassage=()=>{
        switch(prop.mssg.type)
        {
            case "string":
                return(
                    <> <div id="mssgtxt" style={{color:'white'}}>{prop.mssg.value}</div>
                     {/* <p id="time">{time}</p> */}
                        
                    </>
                                )   
              case "jpg":     return(
              <>
                <img onClick={()=>{imgclick(`/`+prop.mssg.value,'image')}} style={{margin:'3px'}} src={`http://192.168.29.37:4000/`+prop.mssg.value} ></img>
                <p id="mssgtxt">{prop.mssg.discription}</p>
               </>
                ) 
            case "jpeg": return( <>
            <img onClick={()=>{imgclick(`/`+prop.mssg.value,'image')}} style={{margin:'3px'}} src={`http://192.168.29.37:4000/`+prop.mssg.value} ></img>
            <p id="mssgtxt">{prop.mssg.discription}</p>
           </>
            )
            case "png":   
            return( <>
                <img onClick={()=>{imgclick(`/`+prop.mssg.value,'image')}} style={{margin:'3px'}} src={`http://192.168.29.37:4000/`+prop.mssg.value} ></img>
                <p id="mssgtxt">{prop.mssg.discription}</p>
                
                </>
                )                 
            case "video": return(
                                    <><video  style={{margin:'3px'}} src={prop.mssg.value} controls="controls"></video>
                                    {/* <p id="time">{time}</p> */}
                                    </>
                                )
             case "mp4":   return(
                <><video onClick={()=>{imgclick(`/`+prop.mssg.value,'mp4')}} style={{margin:'3px'}} src={`http://192.168.29.37:4000/${prop.mssg.value}`} controls="controls"></video>
              {/* <p id="time">{time}</p> */}
              </> 
            )                
            default: return(
                <p > Error</p>
            )

        }

    }


    return(
        <div id='sendermssg' >
    {typeofmassage()}
        </div>
    )
    }