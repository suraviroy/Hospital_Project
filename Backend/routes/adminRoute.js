import express from 'express'

import { patientregistration } from '../controller/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/patientregistration', patientregistration)

export default adminRouter