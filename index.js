const express = require("express");

const mongoose = require("mongoose");
const app = express();
const students = require("./data/schema.js");

const port = 7000;

// middle ware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// server working
app.get("/",(req,res) =>{
  res.send("server is working done!")
})

// getting info
app.get("/students", async(req, res) => {
  try{
    const total = await students.find(req.body);
    res.status(200).json(total);
    console.log(total);

  }catch(error){
    res.status(500).json({message : error.message})
  }
});

app.post("/students", async (req, res) => {
  try{
    const total = await students.create(req.body);
    res.status(200).json(total);
    console.log(total);
  }catch(error){
    res.status(500).json({message: error.message});
  }
  
});


app.get("/student/:id",async(req,res) =>{
  const {id} = req.params;
  try{
    const person = await students.findById(id);
    if(!person){
      res.status(400).json({msge: person.msge});
    }
   return res.status(200).json(person) 

  }catch(err){
   return res.status(500).json({msg: err.msg});
  }

})

app.patch("/student/:id",async(req,res) =>{
    const {id} = req.params;
    try{
    const data = await students.findByIdAndUpdate(id,req.body);
       return res.status(200).json(data);
    }catch(error){
      return res.status(500).json(error);
    }
});

app.delete("/student/:id", async(req,res) =>{
  const {id} = req.params;
  try{
    const person = await students.findByIdAndDelete(id,req.body);
    
    if(!person){
      return res.status(400).json("not found")
    }
    return res.status(200).json(person)


  }catch(err){
    return res.status(500).json(err)
  }
})

mongoose
  .connect("mongodb://localhost:27017/mycollege")
  .then(() => {
    console.log("Database connecting");
    app.listen(port, () => {
      console.log(`the port is listening on ${port}`);
    });
  })
  .catch(() => {
    console.log(" connection was error");
  });
