import express from 'express'

import { patientregistration ,registeredPatientList } from '../controller/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/patientregistration', patientregistration);
adminRouter.get('/registeredPatientList', registeredPatientList)

export default adminRouter