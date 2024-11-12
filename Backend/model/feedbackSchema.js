import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  feedbackId: { type: Number },
  patientId: { type: String },
  name: { type: String }, 
  phonenumber: { type: String},
  rating: { type: String },
  feedback: { type: String },
});

const FeedbackSchema = mongoose.model("FeedbackList", feedbackSchema);
export default FeedbackSchema;
