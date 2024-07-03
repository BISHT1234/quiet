const messagemodel = require('./Schemas/messagemodel')
const mschema=require('./Schemas/schema')
const mongoose=require('mongoose')
const conversation_model=mongoose.model('conversation',mschema)
const creat_conversation=async (req,res)=>{
  await conversation_model.findOne({sender_id:req.body.s_id ,reciver_id:req.body.r_id}).then(
   async (response)=>{
        if(response){ 
            await conversation_model.findOne({sender_id:req.body.r_id ,reciver_id:req.body.s_id})
            .then(
                reciveres=>{//console.log(response.reciver_id)
            res.send({senderroom:response,reciverroom:reciveres}) })
        }
        else{
           // console.log("reciver id "+req.body.r_id)
            if(!(req.body.s_id==req.body.r_id))
           { const newconvo=conversation_model({sender_id:req.body.s_id,reciver_id:req.body.r_id,sender_name:req.body.sender_name,reciver_name:req.body.reciver_name,message:'',status:'unblock',reciver_dp:req.body.reciver_dp})
            const rconvo=conversation_model({sender_id:req.body.r_id,reciver_id:req.body.s_id,reciver_name:req.body.sender_name,sender_name:req.body.reciver_name,message:'',status:'unblock',reciver_dp:req.body.sender_dp})
 newconvo.save().then(resd=>{ 
    
    rconvo.save().then(response=>{
        //console.log("2"+response)
      // console.log("1"+resd) 
       res.send({senderroom:resd,reciverroom:response})

    }
    )
            }
            )      } 
        }
    }
)
        
   
}
const sendmessage= async (req,res)=>{
        const conversationid=req.params['id']
        //console.log(conversationid)
        const senderid=req.body.sender
        const value=req.body.message
        const type=req.body.type
     const reciverroom=req.body.reciverroom 
   var newmessage;
   var message;
     if(type!='string'){
        newmessage= messagemodel({sender_id:senderid,value:value,type:type,conversation_id:conversationid,discription:req.body.discription,status:'unreaded'})
       message = messagemodel({sender_id:senderid,value:value,type:type,conversation_id:reciverroom,discription:req.body.discription,status:'unreaded'})
     }else
{ newmessage= messagemodel({sender_id:senderid,value:value,type:type,conversation_id:conversationid,status:'unreaded'})
 message= messagemodel({sender_id:senderid,value:value,type:type,conversation_id:reciverroom,status:'unreaded'})
}
await newmessage.save().then(
    async response=>{
     await conversation_model.findByIdAndUpdate(conversationid,{message:value,type:type});
     var status;
     conversation_model.findOne({_id:conversationid}).then(block=>{
        if(block.status==='unblock')
     {  message.save().then(async()=>{
        await conversation_model.findByIdAndUpdate(reciverroom,{message:value,type:type});
           res.send(response)
       })}
    else{
        res.send(response)
    }
    })

 
     
       
    }
)

    
}

const clearchat= async(req,res)=>{
    const id=req.body.senderroom
  //  console.log("delete this : "+id+"                sf")
messagemodel.deleteMany({ conversation_id: id })
.then(async (res)=>{//console.log("cleared")
await conversation_model.findByIdAndUpdate(id,{message:''});
})
.catch(err=>{console.log(err)})
}
const blocked=async(req,res)=>{
    const status=req.body.status;
    const sid=req.body.sid
    const rid=req.body.rid
    await conversation_model.findByIdAndUpdate(sid,{status:status}).then(
       async (response)=>{
        await conversation_model.findByIdAndUpdate(rid,{status:status}).then(
            res.send(status)
        )
        }
    )
    

}
const delete_message=async(req,res)=>{
var delete_message_id=req.params['id'];
const deleted = await messagemodel.findOneAndDelete({_id:delete_message_id});
res.send('deleted');
}
const unsend =async(req,res)=>{
  var  time =new Date( req.body.datetime);
  const hour=time.getHours();
  const minute=time.getMinutes();
  var  message_value=req.body.value;
  const start = new Date();
  start.setHours(hour, minute, 0, 0);
  const end = new Date();
  end.setHours(hour, minute, 59, 999);
  const result = await messagemodel.deleteMany({
    value:message_value,
    createdAt: {
        $gte: start,
        $lte: end
    }
});
if(result){
    res.send(result)
}
}
module.exports={creat_conversation,sendmessage,conversation_model,clearchat,blocked,delete_message,unsend}