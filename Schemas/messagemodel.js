const { type } = require("language-tags");
const { Timestamp } = require("mongodb");
const { default: mongoose } = require("mongoose");

const messageschema=mongoose.Schema({
    sender_id:{
        type:String,
        required: true
    },
    value:{
type:String
    },
    conversation_id:{
        type:String,
        required: true
    },type:{
        type:String
    },
    files:[
        {
            url:{type:String},
            type:{type:String}
        }
    ],
    status:{
        type:String,
        required: true
    }
},{
    timestamps:true
}
)
const messagemodel= new mongoose.model('Message',messageschema)
module.exports=messagemodel