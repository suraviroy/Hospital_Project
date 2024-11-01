import express from 'express'
import {
    login,
    HomePageDetails,
    PatientProfile,
    PatientsAllAppointments,
    createRequest,
    allrequest,
    request,
    OneAppointmentDetails,
    PatientCoordinator,
    requestNotification,
    countNotification,
    seenNotification
} from '../controller/patientController.js'
const patientRouter = express.Router()

patientRouter.post('/login', login)
patientRouter.get("/HomePageDetails/:id", HomePageDetails);
patientRouter.get("/PatientProfile/:id", PatientProfile);
patientRouter.get("/PatientCoordinator/:id", PatientCoordinator);
patientRouter.get("/PatientsAllAppointments/:id", PatientsAllAppointments);
patientRouter.get("/OneAppointmentDetails/:visitid", OneAppointmentDetails);
patientRouter.post("/RegiseterNewPatientRequest", createRequest);
patientRouter.get("/allrequest/:id", allrequest);
patientRouter.get("/request/:rid", request);
patientRouter.get("/requestNotification/:id", requestNotification);
patientRouter.get("/countNotification/:id", countNotification);
patientRouter.post("/seenNotification/:id", seenNotification);

export default patientRouter
