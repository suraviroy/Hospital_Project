import express from 'express'
import {adminregistration} from '../controller/adminListController.js'
//const auth=require('../middleware/auth');
const adminListRouter = express.Router()

adminListRouter.post("/adminregistration",adminregistration);

// module.exports={adminListRouter};
export default adminListRouter
