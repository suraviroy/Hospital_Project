import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  requestCount: {
    type: {
      date: {
        type: String,
      },
      time: {
        type: String,
      },
      requestId: {
        type: Number,
      },
      patientId: {
        type: String,
      },
      status: {
        type: String,
      },
      exacrebation: {
        type: Boolean,
        details: {
          type: String,
        },
      },
      newProblem: {
        type: Boolean,
        details: {
          type: String,
        },
      },
      newConsultation: {
        type: Boolean,
        details: {
          type: String,
        },
        dischargeCertificate: {
          type: String,
        },
      },
      hospitalization: {
        type: Boolean,
        records: {
          type: String,
        },
      },
      disabilities: {
        type: Boolean,
        details: {
          type: String,
        },
      },
      demise: {
        type: Boolean,
        deathCertificate: {
          type: String,
        },
      },
      report: {
        type: String,
        details: {
          type: String,
        },
      },
      request: {
        type: String,
      },
      action: {
        type: String,
      },
    },
  },
});

const RequestSchema = mongoose.model("RequestList", requestSchema);
export default RequestSchema;
