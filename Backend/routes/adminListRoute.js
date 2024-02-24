import express from 'express'
import {
  adminList,
  adminregistration
} from '../controller/adminListController.js'
const adminListRouter = express.Router()

adminListRouter.post('/adminregistration', adminregistration)
adminListRouter.get('/adminlist', adminList)

export default adminListRouter
