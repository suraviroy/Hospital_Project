import express from 'express'

import {
    patientregistration,
    registeredPatientList,
    sectionAallPatient,
    sectionAtodaysPatient,
    UpdateProfileNameId,
    PatientBasicDetails
} from '../controller/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/patientregistration', patientregistration);
adminRouter.get('/registeredPatientList', registeredPatientList);
adminRouter.get('/sectionAtodaysPatient', sectionAtodaysPatient);
adminRouter.get('/sectionAallPatient', sectionAallPatient);
adminRouter.get('/UpdateProfileNameId/:id', UpdateProfileNameId);
adminRouter.get('/PatientBasicDetails/:id', PatientBasicDetails);

export default adminRouter