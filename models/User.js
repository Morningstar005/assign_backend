const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    universityId:{type:String,required:true,trim:true},
    name:{type:String,required:true},
    accountType:{
        type:String,
        enum:["Student","Dean"],
        required:true,
    },
    token:{
        type: String,
      },
      password: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model("User",userSchema)