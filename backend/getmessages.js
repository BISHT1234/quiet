const messagemodel = require('./Schemas/messagemodel')
const mongoose=require('mongoose')
const mschema=require('./Schemas/schema')
const conversation_model=mongoose.model('conversation',mschema)
const getmessages=async (req,res)=>{
try{
    const conversationid=req.params['id']
   // console.log("id:"+conversationid )
     messagemodel.find({conversation_id:conversationid}).then(
        async (mssgs)=>{
          let updated=await messagemodel.updateMany({ conversation_id:conversationid }, {$set: {status:'readed'}})
          var stat;
          await conversation_model.findOne({_id:conversationid}).then(state=>stat=state.status)
    res.send({message:mssgs,state:stat})
        
        }
    )
    
}
catch{
    console.log("error on getting mssg")
}

}
const numberofunreaded=async (req,res)=>{
try{
  const conversationid=req.params['id']
  messagemodel.find({conversation_id:conversationid,status:'unreaded'}).then(
    mssgs=>{
      let int=mssgs.length
  res.send(int.toString())

    
    }
)
}catch{
console.log("errrrrrrrrrrrrr")
}

}

module.exports={getmessages,numberofunreaded}