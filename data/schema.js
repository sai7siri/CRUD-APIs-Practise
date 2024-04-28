const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({

   name :{
      type: String
   },
   age : {
      type: Number
   },
   gpa : {
      type: Number
   },
   fullTime : {
      type: Boolean
   },
   date : {
      type: Date,
      default: Date.now
   }


},
{
   timestamps : true
}

);

const students = mongoose.model("result", studentSchema);


module.exports = students;

