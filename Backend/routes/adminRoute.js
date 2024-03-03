import express from 'express'

import { patientregistration ,registeredPatientList,sectionAtodaysPatient } from '../controller/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/patientregistration', patientregistration);
adminRouter.get('/registeredPatientList', registeredPatientList);
adminRouter.get('/sectionAtodaysPatient', sectionAtodaysPatient);

export default adminRouter