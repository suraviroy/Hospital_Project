import express from "express";

import {
  patientregistration,
  registeredPatientList,
  sectionAallPatient,
  sectionAtodaysPatient,
  UpdateProfileNameId,
  PatientBasicDetails,
  patientEachVistDetails,
  allpatientList,
  patientDisease,
  excelFile,
  notification,
  action,
  coordinatorPatients,
  excelFileFeedback,
  updateBasicDetails,
  countAdminNotification,
  seenAdminNotification,
  oneAdminNotification
} from "../controller/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/patientregistration", patientregistration);
adminRouter.get("/registeredPatientList", registeredPatientList);
adminRouter.get("/sectionAtodaysPatient", sectionAtodaysPatient);
adminRouter.get("/sectionAallPatient", sectionAallPatient);
adminRouter.get("/updateProfileNameId/:id", UpdateProfileNameId);
adminRouter.get("/patientBasicDetails/:id", PatientBasicDetails);
adminRouter.post("/patientEachVisitDetails/:id", patientEachVistDetails);
adminRouter.get("/allpatientList", allpatientList);
adminRouter.get("/patientDisease/:id", patientDisease);
adminRouter.get("/excelFile", excelFile);
adminRouter.get("/notification", notification);
adminRouter.post("/action/:rid", action);
adminRouter.get("/coordinatorPatients/:coname", coordinatorPatients);
adminRouter.put("/updateBasicDetails/:id", updateBasicDetails);

adminRouter.get("/excelFileFeedback", excelFileFeedback);

adminRouter.get("/countAdminNotification/:cid", countAdminNotification);
adminRouter.post("/seenAdminNotification/:cid", seenAdminNotification);
adminRouter.get("/oneAdminNotification/:cid", oneAdminNotification);

export default adminRouter;
