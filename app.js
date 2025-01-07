
const express =require('express')
const cors= require('cors')
const multer  = require('multer')
const fs = require('fs')
const creat_conversation =require('./backfunctions')
const getmessages=require('./getmessages')
const bodyParser=require('body-parser')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
// import{API} from './api' 
const API = "http://localhost:3000" || "http://192.168.29.37:3000"
const { useParams } = require('react-router-dom')
 const app=express();
 ///////////

 ///firebase
 const admin = require('firebase-admin');

 const initializeApp =
  {
    type: "service_account",
    project_id: "quiet-a9f1e",
    private_key_id: "0db069cddf034990fca0a60b7199394460a23c88",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrgPhdwaBvRyvc\nPDPZEl9tRcyE9YnEoZUqnB3kXQ3229jA0ITFhnHEh5eYsSWIFzpq0u8nv9ZepueV\nmmvrjEKWZKv00OZhm6VbpKKJkzJjiS8cwKpWdO5KQPRcwh9BAe/smCvMW1UDDdaY\niZ5bSBlm/rdJNKiSh75y8Tu0TKAePghTJRgIiKy3/mqmvIMK+a+Tf37UwlNvZVCd\nuaCNtO0xMa9A8Ia6codl19e5hc/v6DrkHC+A2GD2X/BwTlkR3tvhhLcAWi8QFVqv\noLUvaYte7Of2YqPNxbTyccNanJBxe/2zQm2aB+MxYITqhSxmYd3kOSUpRznT0yKj\nOZ06G//VAgMBAAECggEAOAfLnL3cj15eKvaULc/90zJhjfK2DsKHfENC1M+99y9+\nEghNyEaTNpTh5yXA0ERednXxYjgfbg7zTAIGTg8l1gKP10zEZ5E1JcqUu4OWi8RO\n2wLq45ISI7oy23ckRNXAL7jLXllcXcIQoQcc8E+O1QJUmRsWE8E7bEv5qH78NMSf\n2hpbZ3oNurNQrV5U7nFkrulPuRQv8xTR4X5gYTcw2QIIiFC53JDAJRu08aEg86dz\nV5yU52bdZxjdQLb6cWY07kbMQy/rFEANeMPJAqhXye9BQgDKmN7CoNaXMVG0pWHb\n6wPebVBiFebxoWW5Ks1hfnKG5SfRU9MU3aYKTShkpQKBgQDnNH35rECbnkvFEiIJ\nH7vpbWe0T6wvVBXrlFytghXptkjVbpm9iipMUW6Z7+VkFBpnaLuBGVvfLQg5b2FD\nCpESli2Qp5f28jIl7ThYZkCnZ4dQdYfjhyjAzHqULTFxeW47gdbRMv/NwBYzhurJ\n8DoPRdIuP90G2HNWuAEBaVo9YwKBgQC95XBHuEsEgE7IJoIU2oKkS+AdOuXM+gat\nBdIl8u+ow5UZ7ZWv0ECeM1ghitqzwWY5K8W7L5e11V4ejTuH02GO8OGKHJdvjpBQ\nsSCjZTkrfJdmcV7Kid0ti05VqpeKKF0iTPh6D7EbjIPMW3frWEsrudFx2h0uhsUS\nUl7n5GGPZwKBgAekLn2v+bqq8qoivUk76UP/v6uv7mrqBodwsddyMzM0ORgEvcQL\n6vX2wwcHbLdwCqdcSMYthmHL5TewvLAwizboC716LIWW351tR610Q7LEsy4vlDwq\n3Wfx2iNHkxjDAKeq1OS5IMc2EAXH8b6W1/RlRFsO9Ukioj09e5sGVlstAoGBALll\nd+mNlDAg1Mm0TuvtKf8d1QC0sAcfU8U5GaLTPAiYasmVm766o1vQ5QpadotpFlRa\n2AGYxZVRa0KIwMYrKeRUaN5ea7sOhPdC94qPGPHMAkSSCunTD42XpDMfCjRolAUZ\nAL6q807iMQsjgkDTQxC9qi5ttG/oRB9PLDlaT6WhAoGALGZ4RHMDIp+NcwIiB7N5\n+drKcJIQTKSaDnHKrVWBHQRgtYgf6BJZ/CUe4wwrN/aQcH2hgikoMvH7jo4NWq0S\nAGHv24CZhnkdf6MFrvFw/3figj700BRgeyrXCiW9QGulA8fK4mBWS4BTbjkXDjxk\npUAC2313sLBYAHXn+xmT2aA=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-cue5b@quiet-a9f1e.iam.gserviceaccount.com",
    client_id: "104182925427396864937",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cue5b%40quiet-a9f1e.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  
};
admin.initializeApp({
  credential: admin.credential.cert(initializeApp),
  storageBucket: "quiet-a9f1e.appspot.com"
})
const fireStorage=admin.storage();
// const mediaref =ref(fireStorage)

//

const http = require('http');

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      
      origin: "*",
      methods: ["GET", "POST"]
    }
  });;
  const corsOpts = {
    
    origin: "*",
  
    methods: [
      'GET',
      'POST',
    ],
    credentials:true,
    allowedHeaders: [
      'Content-Type'
    ],
  };
//const io = new Server(server);
 ////////////
 app.use(cors(corsOpts))
 app.options('*',cors(corsOpts))
 app.use(express.static('uploads'));
 app.use(bodyParser.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({extended:true,limit: '500mb'}))
var model;
var sender;
var sender_id;
var secratKey='ATOz12345678910ancdefghijklmno'
const PORT=process.env.PORT || 4000;
async function connection(){
  await  mongoose.connect('mongodb+srv://ohitbisht:321bishtmohit@cluster0.4m0y6nc.mongodb.net/quiet?retryWrites=true&w=majority',{ })
  .then(res=>{
    
  })
   const schema=new mongoose.Schema({
    Name:{
      type:String,required:true
    },
    Email:{
      type:String,required:true},
        Password:{
            type:String,required:true},
       
        profile_picture:{
              type:String
            }
        })
 model = mongoose.model('newuser',schema)
     
Array()

}
connection()/////////////
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      console.log("12",file.originalname)
      cb(null, `${Date.now()}+${file.originalname}`)
    }
})
const fstorage= multer.memoryStorage()
const upload = multer({ storage: storage })
/////////
// async function Array(){
//     array=[]
// await model.find({}).then(
//     res=>{
//     res.forEach(element => {
//         array.push(element)
//     });
//     }
// )
// }



app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.post('/api/creatuser',(req,res)=>{
  console.log(req.body);
 const user=new model({
  Name:req.body.Name,
  Email:req.body.Email,
    Password:req.body.Password,
 
  profile_picture:'' })
 user.save()
 res.send("succes")

})
app.post('/api/chekuser',async (req,res)=>{

    let email =req.body.email;
    let password = req.body.password
    console.log("jdbj")
 model.findOne({Email:email})
 .then(user=>{
    if(user){
        if(user.Password===password){
       //     console.log(user)
            sender=user
            const token= jwt.sign({user},secratKey)
            res.json({exist:true,User:user,token})
                sender_id=user._id
        }else{
            console.log("incorrect password")
            res.send("incorrect password")
        }
    }
    else{
        console.log("no user")
        res.send("user didn't exsist")
    }
 })
})
app.post('/api/verifytoken',async(req,res)=>{
  const token=req.body.token;
  const decode=jwt.verify(token,secratKey);
  // const user= {
  //   _id:decode.id,
  //   Name:decode.username
  // };
  res.json({decode})
})
app.post('/api/getfriends',async(req,res)=>{
   let array=[]
   await model.find({}).then(
    res=>{
    res.forEach(element => {
        array.push(element)
    });
    }
)
res.json({users:array})  })

        app.post('/api/creatrooms',creat_conversation.creat_conversation)
        app.post('/api/sendmssg/:id',upload.array('file',10),creat_conversation.sendmessage)
        app.get('/api/getmessages/:id',getmessages.getmessages)
        app.post(`/api/upload/:id/:ex`,upload.array('file'),(req,res)=>{
          try{
          
            res.send(req.files)
          }
catch(err){

  res.send(err)
}

        })
        app.get('/api/getcoversations/:id',async(req,res)=>{
               var array=[]
               const sender_id=req.params['id']
            // await creat_conversation.conversation_model.find({sender_id:sender_id},null,{sort:{"updatedAt":-1}}).then(
            //     res=>{
                  
            //     res.forEach(element => {
            //         array.push(element)
            //     });
            //     } )
            const result= await creat_conversation.conversation_model.aggregate([
              {
                $project:{
                  "_id":{
                    $toString:"$_id"
                  },
                  "sender_id":1,
                  "reciver_id":1,
                  "sender_name":1,
                  "reciver_name":1,
                  "status":1,
                  "reciver_dp":1,
                  "createdAt":1,
                  "updatedAt":1

                }
              },{
                $lookup:{
        "from": "messages",
       "localField": "_id",
       "foreignField": "conversation_id",
       "as": "message"
                }
              },
              {
                $match:{
                  "sender_id":sender_id
                }
              },
              {
                $addFields:{
                  "message":{
                    $last:"$message"
                  }
                }
              },
              {
                $addFields:{
                  "message":"$message.value",
                  "type":"$message.type"
              }
            }
            ])
            result.forEach(element => {
              array.push(element);
            });
            res.send(array)
        })
        
        app.get('/api/unreaded/:id',getmessages.numberofunreaded)
        app.post('/api/clearchat',creat_conversation.clearchat)
        app.post('/api/block',creat_conversation.blocked)
        app.post('/api/updateprofile',async(req,res)=>{
          try{
            await model.updateOne({_id:req.body.id},{
              $set : {
                Name: req.body.Name,
                Password:req.body.Password,
                Email:req.body.Email
              }
            });
            res.send('sucess');
          }
          catch(err){
            console.log(err)
            res.send(err)
                      }
        }
      )
        app.post('/api/updatepic',async(req,res)=>{
        try{  const result= await model.updateOne({_id:req.body.id},{
          $set : {
            profile_picture: req.body.url
          }
          });
          await creat_conversation.conversation_model.updateMany({reciver_id:req.body.id},{
            $set : {
              reciver_dp: req.body.url
            }
          })
          model.findOne({_id:req.body.id}).then((self)=>{
           res.send(self)
          })
        }
          catch(err){
console.log(err)
          }
        })
        app.get('/api/getmydetails/:id',async(req,res)=>{
          model.findOne({_id:req.params['id']}).then((self)=>{
           console.log(req.params['id'])
            res.send(self)
            
           })
        })
      app.post('/api/delete-message/:id',creat_conversation.delete_message);
      app.post('/api/unsend',creat_conversation.unsend)
        //connection
        io.on('connection', (socket) => {
          console.log('socket connected')
          socket.on('login',()=>{
            console.log("from login space ")
          })
          socket.on('desktop',()=>{
            console.log("from desktop space ")
          })
          socket.on('chat',()=>{
            console.log("from chat space ")
          })
        socket.on('join-sender-room',id=>{
          console.log("self room: ",id)
          socket.join(id)
        })

        socket.on("join room",data=>{
          socket.join(data.sender)
          socket.join(data.reciver)
           console.log("sender: ",data.sender," reciver: ",data.reciver)
          socket.to(data.sender).to(data.reciver).emit('joined',"joined room")

          
        })
        socket.on('emit_message',address=>{
          console.log("message:  ",address)
        socket.to(address).emit('on_message',true)
        })    
        
        socket.on('broadcast',data=>{
          console.log('broadcast  ',data)
         io.to(data).emit('on_broadcast',true)
        })
        socket.on('dpupdate',(data)=>{
          io.emit('changedp',null)
        })
        socket.on('message_unsend',reciver=>{
          socket.to(reciver).emit('on_unsend',true)
        })

          });
          if(process.env.NODE_ENV =="production"){
            app.use(express.static("client/build"));
          }
 server.listen(PORT)

