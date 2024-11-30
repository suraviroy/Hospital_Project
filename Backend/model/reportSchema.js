import mongoose from "mongoose";

const reportsSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  reportId: { type: String },
  patientId: { type: String },
  name: { type: String },
  coordinatorName: { type: String },
  multipledocument: {
    type: [
      {
        documentname: {
          type: String,
          default: "NA",
        },
        document: {
          type: String,
          default: "NA",
        },
      },
    ],
  },
  viewed: { type: String, default: "false" },
});

const ReportsSchema = mongoose.model("ReportsList", reportsSchema);
export default ReportsSchema;



