
import mongoose from "mongoose";

const artificialDeviceSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  patientId: { type: String },

  details: { type: String }, 
  device: { type: String },
  
  expdate: { type: String},
});

const FeedbackSchema = mongoose.model("ArtificialDevice", artificialDeviceSchema);
export default FeedbackSchema;
