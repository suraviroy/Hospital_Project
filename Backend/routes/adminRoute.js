import express from 'express'

import { patientregistration ,registeredPatientList,sectionAallPatient,sectionAtodaysPatient } from '../controller/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/patientregistration', patientregistration);
adminRouter.get('/registeredPatientList', registeredPatientList);
adminRouter.get('/sectionAtodaysPatient', sectionAtodaysPatient);
adminRouter.get('/sectionAallPatient', sectionAallPatient);

export default adminRouter