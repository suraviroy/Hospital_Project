import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  requestId: { type: Number },
  patientId: { type: String },
  status: { type: String },
  exacrebation: {
    isSelected: {
      type: String,
      default: "NA",
    },
    details: { type: String, default: "NA" },
  },
  newProblem: {
    isSelected: {
      type: String,
      default: "NA",
    },
    details: { type: String, default: "NA" },
  },
  newConsultation: {
    isSelected: {
      type: String,
      default: "NA",
    },
    details: { type: String, default: "NA" },
    dischargeCertificate: { type: String, default: "NA" },
  },
  hospitalization: {
    isSelected: {
      type: String,
      default: "NA",
    },
    records: { type: String, default: "NA" },
    dischargeHCertificate: { type: String, default: "NA" },
  },
  disabilities: {
    isSelected: {
      type: String,
      default: "NA",
    },
    details: { type: String, default: "NA" },
  },
  demise: {
    isSelected: {
      type: String,
      default: "NA",
    },
    deathCertificate: { type: String, default: "NA" },
  },
  report: {
    isSelected: {
      type: String,
      default: "NA",
    },
    // details: { type: String, default: "NA" },
    // certificate :{type: String, default: "NA"},
    multiplereport: {
      type: [
        {
          details: {
            type: String,
            default: "NA",
          },
          certificate: {
            type: String,
            default: "NA",
          },
        },
      ],
    },
  },
  request: {
    type: [
      {
        requestFor: {
          type: String,
          required: true 
        },
        details: {
          type: String,
          default: "NA",
        },
      },
    ],
  },
 // request: { type: String, default: "NA" },
  action: { type: String, default: "NA" },
  viewed: { type: String, default: "true" },
  coordinatorviewed: { type: String, default: "false" },
  coordinatorName: { type: String },
  coordinatorId: { type: String },
});

const RequestSchema = mongoose.model("RequestList", requestSchema);
export default RequestSchema;



