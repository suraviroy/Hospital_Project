import express from 'express'
import {
    login,
    HomePageDetails,
    PatientProfile,
    PatientsAllAppointments
} from '../controller/patientController.js'
const patientRouter = express.Router()

patientRouter.post('/login', login)
patientRouter.get("/HomePageDetails/:id", HomePageDetails);
patientRouter.get("/PatientProfile/:id", PatientProfile);
patientRouter.get("/PatientsAllAppointments/:id", PatientsAllAppointments);

export default patientRouter
