import { useEffect, useState } from "react"

import ReactPlayer from "react-player"

 export const Video_Call=()=>{
const [stream,setstream] =useState(null)
useEffect(()=>{
    navigator.mediaDevices.getUserMedia({audio:false,video:true}).then(
       ( stream)=>{
        setstream(stream)

        }
    )
},[])

    return(
<div>
<ReactPlayer url={stream} height={'100px'} width={'100px'}></ReactPlayer>
        </div>
    )
}