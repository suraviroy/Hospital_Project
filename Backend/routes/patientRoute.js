import express from 'express'
import {
    login,
    HomePageDetails,
    PatientProfile,
    PatientsAllAppointments,
    createRequest,
    allrequest,
    request
} from '../controller/patientController.js'
const patientRouter = express.Router()

patientRouter.post('/login', login)
patientRouter.get("/HomePageDetails/:id", HomePageDetails);
patientRouter.get("/PatientProfile/:id", PatientProfile);
patientRouter.get("/PatientsAllAppointments/:id", PatientsAllAppointments);
patientRouter.post("/RegiseterNewPatientRequest", createRequest);
patientRouter.get("/allrequest/:id", allrequest);
patientRouter.get("/request/:rid", request);

export default patientRouter
