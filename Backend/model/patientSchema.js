import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age:{
    type: Number,
  },
  gender:{
    type: String,
  },
  patientId:{
    type: String,
  },
  contactNumber:{
    type: Number,
  },
  email:{
    type: String,
  },
  bloodGroup:{
    type: String,
  },
  address:{
    type: String,
  },
  state:{
    type: String,
  },
  country:{
    type: String,
  },
  date:{
    type: String,
  },
  time:{
    type: String,
  },
  consultingDoctor: {
    type: String,
  },
  localContacts: {
    type: String,
  },
  extistingPatientDiagnosis: {
    type: String,
  },
  status:{
    type: String,
  },
  password:{
    type: String,
  },
  existingDeseases: {
    type: [
      {
        disease: {
          type: [String],
        },
        duration: {
          type: Number,
        },
        status: {
          type: String,
        },
      },
    ],
  },
  problemForCondultation: {
    type: [
      {
        problems: {
          type: [String],
        },
        duration: {
          type: Number,
        },
        severity: {
          type: String,
        },
      },
    ],
  },
  importantHistory: {
    type: [
      {
        history: {
          type: [String],
        },
        duration: {
          type: Number,
        },
      },
    ],
  },
  postHospitalization: {
    type: [
      {
        year: {
          type: String,
        },
        month: {
          type: Number,
        },
        reason: {
          type: String,
        },
        dischargeCertificate: {
          type: String,
        },
      },
    ],
  },
  statusOfSickness: {
    type: String,
  },
  catScore: {
    type: Number,
  },
});

const PatientSchema = mongoose.model("PatientList", patientSchema);
export default PatientSchema;
