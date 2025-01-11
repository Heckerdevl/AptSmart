const data=()=>{
    const a=document.getElementById('n1').value
    const b=document.getElementById('n2').value
    const c=document.getElementById('n3').value
    if(a==="" || b==="" || c===""  ){
        alert("Please Fill All Details")
    }else{
        return true;
    }
}

const express=require('express');
const mongoose=require('mongoose');
const path = require('path');
const port= 3019;


const app=express();
app.use(express.static(__dirname));

app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/Students');
const db=mongoose.connection;
db.once('open',()=>{
    console.log("connection successfull")
})

const userSchema = new mongoose.Schema({
    name:String,
    Email:String,
    Password:String 
})


const Users=mongoose.model("data",userSchema);


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html '))
})



app.post('/post',async(req,res)=>{
    const {name,Email,Password} = req.body

    const user =new Users({
        name,
        Email,
        Password
    })
    await user.save()
    console.log(user)
    res.send("Form Submitted")
})

app.listen(port,()=>{
    console.log("server started")
})