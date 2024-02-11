const  express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'client','public','index.html')));

mongoose.connect('mongodb://localhost/DrivingSchool')
.then(()=>console.log("Connected to Database..."))
.catch((err)=>console.log(err))

console.log(mongoose.Collection.dbName);

const DataSchema = new mongoose.Schema({
    name:String,
    location:String,
    pricing:Number,
    course:String,
    phone:String,
    email:String,
    working_hours:String,
    rating:Number,
    type:String,
});
const DataModel = mongoose.model('User',DataSchema);
app.post('/data',async (req,res)=>{
    console.log(req.body);
    if(Object.keys(req.body[1]).length !== 0)
    {
         if(req.body[1].pricing === 'Price:Low to High') req.body[1].pricing=1;
         else req.body[1].pricing=-1;
    }
     try{
         const result = await DataModel.find(req.body[0]).sort(req.body[1]).exec();
         return res.send(result);
     }
     catch(err){
         console.log(err);
         return res.sendStatus(404);
     }
})
app.listen(port,()=>{
    console.log(`Running on Port ${port}`)
})