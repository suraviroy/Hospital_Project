import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  requestId: { type: Number },
  patientId: { type: String },
  status: { type: String },
  exacrebation: {
    type: {
      type: Boolean,
    },
    details: { type: String, default: "NA" },
  },
  newProblem: {
    type: {
      type: Boolean,
    },
    details: { type: String, default: "NA" },
  },
  newConsultation: {
    type: {
      type: Boolean,
    },
    details: { type: String, default: "NA" },
    dischargeCertificate: { type: String, default: "NA" },
  },
  hospitalization: {
    type: {
      type: Boolean,
    },
    records: { type: String, default: "NA" },
  },
  disabilities: {
    type: {
      type: Boolean,
    },
    details: { type: String, default: "NA" },
  },
  demise: {
    type: {
      type: Boolean,
    },
    deathCertificate: { type: String, default: "NA" },
  },
  report: {
    type: {
      type: String,
    },
    details: { type: String, default: "NA" },
  },
  request: { type: String, default: "NA" },
  action: { type: String, default: "NA" },
});

const RequestSchema = mongoose.model("RequestList", requestSchema);
export default RequestSchema;
