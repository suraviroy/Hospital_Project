import express from "express";

import {
  patientregistration,
  registeredPatientList,
  sectionAallPatient,
  sectionAtodaysPatient,
  UpdateProfileNameId,
  PatientBasicDetails,
  patientEachVistDetails,
} from "../controller/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/patientregistration", patientregistration);
adminRouter.get("/registeredPatientList", registeredPatientList);
adminRouter.get("/sectionAtodaysPatient", sectionAtodaysPatient);
adminRouter.get("/sectionAallPatient", sectionAallPatient);
adminRouter.get("/updateProfileNameId/:id", UpdateProfileNameId);
adminRouter.get("/patientBasicDetails/:id", PatientBasicDetails);
adminRouter.post("/patientEachVisitDetails/:id", patientEachVistDetails);

export default adminRouter;
