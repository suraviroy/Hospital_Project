import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  requestCount: {
    date: { type: String },
    time: { type: String },
    requestId: { type: Number },
    patientId: { type: String },
    status: { type: String },
    exacrebation: {
      type: {
        type: Boolean,
        details: { type: String },
      },
    },
    newProblem: {
      type: {
        type: Boolean,
        details: { type: String },
      },
    },
    newConsultation: {
      type: {
        type: Boolean,
        details: { type: String },
        dischargeCertificate: { type: String },
      },
    },
    hospitalization: {
      type: {
        type: Boolean,
        records: { type: String },
      },
    },
    disabilities: {
      type: {
        type: Boolean,
        details: { type: String },
      },
    },
    demise: {
      type: {
        type: Boolean,
        deathCertificate: { type: String },
      },
    },
    report: {
      type: {
        type: String,
        details: { type: String },
      },
    },
    request: { type: String },
    action: { type: String, default: "NA" },
  },
});

const RequestSchema = mongoose.model("RequestList", requestSchema);
export default RequestSchema;