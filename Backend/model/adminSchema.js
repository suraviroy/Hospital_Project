const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
  
});


module.exports = mongoose.model("AdminList", adminSchema);