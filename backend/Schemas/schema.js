const mongoose=require('mongoose')

const Mschema=new mongoose.Schema({
    sender_id:{
        type:String,
        required: true
    },
    reciver_id:{
        type:String,
        required: true
    },
    sender_name:{
        type:String,
        required: true
    },
   reciver_name:{
        type:String,
        required: true
    },
    message:{
        type:String
       },
       status:{
        type:String,
        required: true
       },
       reciver_dp:{
        type:String
       }
},{
    timestamps:true
}
)

 module.exports =Mschema
