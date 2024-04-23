
const express =require('express')
const cors= require('cors')
const multer  = require('multer')
const creat_conversation =require('./backfunctions')
const getmessages=require('./getmessages')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const { useParams } = require('react-router-dom')
 const app=express();
 ///////////
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "https://quiiett.netlify.app",
      methods: ["GET", "POST"]
    }
  });;
  const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
//const io = new Server(server);
 ////////////
 app.use(cors())
 app.use(express.static('uploads'));
 app.use(bodyParser.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({extended:true,limit: '500mb'}))
var model;
var sender;
var sender_id;
var array=[];
const PORT=process.env.PORT || 4000;
async function connection(){
  await  mongoose.connect('mongodb+srv://ohitbisht:321bishtmohit@cluster0.4m0y6nc.mongodb.net/quiet?retryWrites=true&w=majority',{useNewUrlParser:true})
  .then(res=>{
    console.log("connected")
  })
   const schema=new mongoose.Schema({
       Name:{
        type:String,required:true}
       ,
        Email:{
            type:String,required:true},
        Password:{
            type:String,required:true},
        Username:{
            type:String,required:true},
        profile_picture:{
              type:String
            }
        })
 model = mongoose.model('newuser',schema)
     
Array()

}
connection()/////////////
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}+${file.originalname}`)
    }
})
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
app.post('/creatuser',(req,res)=>{
 const user=new model({Name:req.body.Name,
    Email:req.body.Email,
    Password:req.body.Password,
    Username:req.body.Username,
  profile_picture:'null' })
 user.save()
 res.send("succes")

})
app.post('/chekuser',async (req,res)=>{
    let email =req.body.email;
    let password = req.body.password
 model.findOne({Email:email})
 .then(user=>{
    if(user){
        if(user.Password===password){
       //     console.log(user)
            sender=user
            res.json({exist:true,User:user})
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
app.post('/getfriends',async(req,res)=>{
   let array=[]
   await model.find({}).then(
    res=>{
    res.forEach(element => {
        array.push(element)
    });
    }
)
res.json({users:array})  })

        app.post('/creatrooms',creat_conversation.creat_conversation)
        app.post('/sendmssg/:id',creat_conversation.sendmessage)
        app.get('/getmessages/:id',getmessages.getmessages)
        app.post('/upload',upload.single('file'),(req,res)=>{
            console.log("filename"+req.file.filename)
res.send(req.file.filename)
        })
        app.get('/getcoversations/:id',async(req,res)=>{
               var array=[]
               const sender_id=req.params['id']
            await creat_conversation.conversation_model.find({sender_id:sender_id},null,{sort:{"updatedAt":-1}}).then(
                res=>{
                res.forEach(element => {
                    array.push(element)
                });
                } )
            res.send(array)
        })
        
        app.get('/unreaded/:id',getmessages.numberofunreaded)
        app.post('/clearchat',creat_conversation.clearchat)
        app.post('/block',creat_conversation.blocked)
        app.post('/updatepic',async(req,res)=>{
          console.log(req.body)
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
        app.get('/getmydetails',async(req,res)=>{
          model.findOne({_id:req.body.id}).then((self)=>{
            res.send(self)
           })
        })
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

          });
          if(process.env.NODE_ENV =="production"){
            app.use(express.static("client/build"));
          }
 server.listen(PORT)

