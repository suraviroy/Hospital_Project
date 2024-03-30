import express from 'express'
import { login } from '../controller/patientController.js'
const patientRouter = express.Router()

patientRouter.post('/login', login)

export default patientRouter
