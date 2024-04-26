import express from 'express'
import {
    login,
    HomePageDetails,
    PatientProfile,
    PatientsAllAppointments,
    createRequest
} from '../controller/patientController.js'
const patientRouter = express.Router()

patientRouter.post('/login', login)
patientRouter.get("/HomePageDetails/:id", HomePageDetails);
patientRouter.get("/PatientProfile/:id", PatientProfile);
patientRouter.get("/PatientsAllAppointments/:id", PatientsAllAppointments);
patientRouter.post("/RegiseterNewPatientRequest", createRequest);

export default patientRouter
