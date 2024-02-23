import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    phNumber:{
        type:Number,
    },
    educationQualification:{
        type:String,
    },
    gender:{
        type: String,
    },
    idNumber:{
        type: String,
    },
    date:{
        type : String
    },
    time:{
        type: String
    },
    picture:{
        type : String
    }
});


const AdminSchema = mongoose.model("AdminList", adminSchema);
export default AdminSchema;