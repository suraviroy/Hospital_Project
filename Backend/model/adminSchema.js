import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    }
});


const AdminSchema = mongoose.model("AdminList", adminSchema);
export default AdminSchema;