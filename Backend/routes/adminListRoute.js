import express from 'express'
import {registration} from '../controller/adminListController.js'
//const auth=require('../middleware/auth');
const adminListRouter = express.Router()

adminListRouter.post("/registration",registration);

// module.exports={adminListRouter};
export default adminListRouter
