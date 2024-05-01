import PatientSchema from "../model/patientSchema.js";
import RequestSchema from "../model/requestSchema.js";
import moment from "moment-timezone";
import excelJS from 'exceljs';

export const patientregistration = async (req, res) => {
  try {
    const {
      name,
      gender,
      patientId,
      contactNumber,
      email,
      bloodGroup,
      password,
      age,
      address,
      state,
      country,
      image,
      consultingDoctor,
      localContactName,
      localContactRelation,
      localContactNumber,
    } = req.body;

    // Get the desired time zone (e.g., server's time zone or a specific time zone)
    const desiredTimezone = "Asia/Kolkata"; // Replace with your desired time zone
    const currentDate = moment().tz(desiredTimezone).format("MMMM D, YYYY");
    const currentTime = moment().tz(desiredTimezone).format("hh:mm A");

    const finduser = await PatientSchema.findOne({ patientId: patientId });
    if (finduser) {
      console.log("user exist");
      return res.status(200).json({ message: "ID already exists" });
    } else {
      const newUser = await PatientSchema.create({
        name,
        gender,
        patientId,
        contactNumber,
        email,
        bloodGroup,
        password,
        age,
        address,
        state,
        country,
        image,
        consultingDoctor,
        localContactName,
        localContactRelation,
        localContactNumber,
        date: currentDate,
        time: currentTime,
        status: "Registered",
      });

      res
        .status(200)
        .json({ message: "User created successfully", data: newUser });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred while creating user" });
  }
};

export const registeredPatientList = async (req, res) => {
  try {
    const registedPatients = await PatientSchema.find(
      { status: "Registered" },
      { name: 1, patientId: 1, image: 1, _id: 0 }
    );
    registedPatients.reverse();
    res.status(200).json(registedPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sectionAtodaysPatient = async (req, res) => {
  try {
    // Get the desired time zone (e.g., server's time zone or a specific time zone)
    const desiredTimezone = "Asia/Kolkata"; // Replace with your desired time zone
    // Get the current date and time in the desired time zone
    const currentDate = moment().tz(desiredTimezone).format("MMMM D, YYYY");

    const registeredPatients = await PatientSchema.find(
      {
        status: "Registered",
        date: currentDate,
      },
      {
        name: 1,
        patientId: 1,
        image: 1,
        gender: 1,
        age: 1,
        _id: 0,
      }
    );

    //reverse the array so that the latest registerations come at the top
    registeredPatients.reverse();
    res.status(200).json(registeredPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sectionAallPatient = async (req, res) => {
  try {
    function parseTime(timeStr) {
      const [time, period] = timeStr.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      let hourIn24Format = hours;
      // Check if period exists and convert it to lowercase
      const periodLowerCase = period ? period.toLowerCase() : null;
      if (periodLowerCase === "pm" && hours !== 12) {
        hourIn24Format += 12;
      } else if (periodLowerCase === "am" && hours === 12) {
        hourIn24Format = 0;
      }
      return hourIn24Format * 60 + minutes;
    }

    const registeredPatients = await PatientSchema.find(
      {
        status: "Registered",
      },
      {
        name: 1,
        date: 1,
        patientId: 1,
        image: 1,
        gender: 1,
        age: 1,
        time: 1,
        _id: 0,
      }
    );

    registeredPatients.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA - dateB;
      } else {
        // If dates are same, sort by time
        const timeA = parseTime(a.time);
        const timeB = parseTime(b.time);
        return timeA - timeB;
      }
    });

    //reverse the array so that the latest registerations come at the top
    registeredPatients.reverse();
    res.status(200).json(registeredPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const UpdateProfileNameId = async (req, res) => {
  try {
    const id = req.params.id;

    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const registeredPatientsName = await PatientSchema.find(
      {
        patientId: id,
      },
      {
        name: 1,
        patientId: 1,
        _id: 0,
      }
    );
    res.status(200).json(registeredPatientsName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const PatientBasicDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const registeredPatientsName = await PatientSchema.find(
      {
        patientId: id,
      },
      {
        name: 1,
        gender: 1,
        patientId: 1,
        contactNumber: 1,
        email: 1,
        bloodGroup: 1,
        password: 1,
        age: 1,
        address: 1,
        state: 1,
        country: 1,
        image: 1,
        consultingDoctor: 1,
        localContactName: 1,
        localContactRelation: 1,
        localContactNumber: 1,
        _id: 0,
      }
    );
    res.status(200).json(registeredPatientsName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const patientEachVistDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const visitData = req.body.visitData;
    console.log("data", visitData)
    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient = await PatientSchema.findOne({ patientId: id });

    // Get the desired time zone (e.g., server's time zone or a specific time zone)
    const desiredTimezone = "Asia/Kolkata"; // Replace with your desired time zone
    // Get the current date and time in the desired time zone
    const currentDate = moment().tz(desiredTimezone).format("MMMM D, YYYY");
    const currentTime = moment().tz(desiredTimezone).format("hh:mm A");

    const newVisit = {
      visitDate: currentDate,
      visitTime: currentTime,
      existingDeseases: req.body.existingDeseases,
      problemForConsultation: req.body.problemForConsultation,
      importantHistory: req.body.importantHistory,
      postHospitalization: req.body.postHospitalization,
      statusOfSickness: req.body.statusOfSickness,
      catScore: req.body.catScore,

    };

    patient.coordinator = req.body.coordinator;
    patient.visitCount.push(visitData);
    patient.status = "Updated";

    console.log(patient)

    const updatedPatient = await patient.save();

    if (!updatedPatient) {
      return res.status(500).json({ message: "Failed to update patient data" });
    }

    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const allpatientList = async (req, res) => {
  try {
    const registeredPatients = await PatientSchema.find(
      {
        status: "Updated",
      },
      {
        name: 1,
        patientId: 1,
        image: 1,
        gender: 1,
        age: 1,
        visitDate: { $arrayElemAt: ["$visitCount.visitDate", -1] },
        visitTime: { $arrayElemAt: ["$visitCount.visitTime", -1] },
        _id: 0,
      }
    );

    //reverse the array so that the latest registerations come at the top
    registeredPatients.reverse();
    res.status(200).json(registeredPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const patientDisease = async (req, res) => {
  try {
    const id = req.params.id;

    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const registeredPatientsName = await PatientSchema.find(
      {
        patientId: id,
      },
      {
        visitCount: { $arrayElemAt: ["$visitCount", 0] },
        coordinator: 1,
        _id: 0,
      }
    );
    res.status(200).json(registeredPatientsName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const notification = async (req, res) => {
  try {
    const requestedPatients = await RequestSchema.find({},
      {
        requestId: 1,
        patientId: 1,
        status: 1,
        date: 1,
        time: 1,   
        request: 1,
        _id: 0
      });

    // Array to hold details for all patients
    const patientDetailsArray = [];

    // Iterate through each requested patient
    for (const patient of requestedPatients) {
      const patientId = patient.patientId;

      // Fetch details for the current patient ID from another schema (assuming PatientSchema)
      const patientDetails = await PatientSchema.findOne({ patientId });

      if (patientDetails) {

        const patientObject = {
          requestId: patient.requestId,
          patientId: patient.patientId,
          status: patient.status,
          date: patient.date,
          time: patient.time,
          request: patient.request,
          name: patientDetails.name,
          image: patientDetails.image
        };

        // Push the patient object to the array
        patientDetailsArray.push(patientObject);
      }
    }

    // Send the array of patient details as the response
    patientDetailsArray.reverse();
    res.status(200).json(patientDetailsArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const action = async (req, res) => {
  try {
    const id = req.params.rid;
    const action = req.body.action;

    const requestExists = await RequestSchema.exists({ requestId: id });
    if (!requestExists) {
      return res.status(404).json({ message: "Patient request not found" });
    }

    const updatedRequest =await RequestSchema.updateOne({ requestId: id }, { action: action } );
    
    res.status(200).json({ message: "updated" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const excelFile = async (req, res) => {
  //
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Patient Details");

    worksheet.columns = [
      { header: "Sl No", key: "s_no" },
      { header: "Name", key: "name" },
      { header: "Gender", key: "gender" },
      { header: "Age", key: "age" },
      { header: "Patient ID", key: "patientId" },
      { header: "Contact no.", key: "contactNumber" },
      { header: "Email.", key: "email" },

      { header: "Blood Group", key: "bloodGroup" },
      { header: "State", key: "state" },
      { header: "Country", key: "country" },
      { header: "Date", key: "date" },
      { header: "Time", key: "time" },
      { header: "Consulting Doctor", key: "consultingDoctor" },
      { header: "Local Contact Name", key: "localContactName" },
      { header: "Local Contact Relation", key: "localContactRelation" },
      { header: "Local Contact Number", key: "localContactNumber" },
      { header: "Coordinator", key: "coordinator" },

      { header: "Visit Date", key: "visitDate" },
      { header: "Visit Time", key: "visitTime" },

      // Existing disease
      { header: "Diabetes Duration", key: "diabetesDuration" },
      { header: "Unit", key: "diabetesDurationUnit" },
      { header: "Status", key: "diabetesStatus" },

      { header: "Hypertension Duration", key: "hypertensionDuration" },
      { header: "Unit", key: "hypertensionDurationUnit" },
      { header: "Status", key: "hypertensionStatus" },

      { header: "HID Duration", key: "HIDDuration" },
      { header: "Unit", key: "HIDDurationUnit" },
      { header: "Status", key: "HIDStatus" },

      { header: "hypothyroidism Duration", key: "hypothyroidismDuration" },
      { header: "Unit", key: "hypothyroidismDurationUnit" },
      { header: "Status", key: "hypothyroidismStatus" },

      { header: "Allergic Rhinitis Duration", key: "allergicRhinitisDuration" },
      { header: "Unit", key: "allergicRhinitisDurationUnit" },
      { header: "Status", key: "allergicRhinitisStatus" },

      { header: "Hyperuricemia Duration", key: "hyperuricemiaDuration" },
      { header: "Unit", key: "hyperuricemiaDurationUnit" },
      { header: "Status", key: "hyperuricemiaStatus" },

      { header: "Asthama Duration", key: "asthamaDuration" },
      { header: "Unit", key: "asthamaDurationUnit" },
      { header: "Status", key: "asthamaStatus" },

      { header: "TB Duration", key: "tbDuration" },
      { header: "Unit", key: "tbDurationUnit" },
      { header: "Status", key: "tbStatus" },

      { header: "COPD Duration", key: "copdDuration" },
      { header: "Unit", key: "copdDurationUnit" },
      { header: "Status", key: "copdStatus" },

      { header: "ILD Duration", key: "ildDuration" },
      { header: "Unit", key: "ildDurationUnit" },
      { header: "Status", key: "copdStatus" },

      { header: "Bronchiectasis Duration", key: "bronchiectasisDuration" },
      { header: "Unit", key: "bronchiectasisDurationUnit" },
      { header: "Status", key: "bronchiectasisStatus" },

      { header: "OSA Duration", key: "osaDuration" },
      { header: "Unit", key: "osaDurationUnit" },
      { header: "Status", key: "osaStatus" },

      { header: "IBS Duration", key: "ibsDuration" },
      { header: "Unit", key: "ibsDurationUnit" },
      { header: "Status", key: "ibsStatus" },

      // Inflammatory Bowel Disease
      { header: "Inflammatory Bowel Disease Duration", key: "inflammatoryBowelDiseaseDuration" },
      { header: "Unit", key: "inflammatoryBowelDiseaseDurationUnit" },
      { header: "Status", key: "inflammatoryBowelDiseaseStatus" },

      // Depression
      { header: "Depression Duration", key: "depressionDuration" },
      { header: "Unit", key: "depressionDurationUnit" },
      { header: "Status", key: "depressionStatus" },

      // Anxiety
      { header: "Anxiety Duration", key: "anxietyDuration" },
      { header: "Unit", key: "anxietyDurationUnit" },
      { header: "Status", key: "anxietyStatus" },

      // Collagen Vascular Disease
      { header: "Collagen Vascular Disease Duration", key: "collagenVascularDiseaseDuration" },
      { header: "Unit", key: "collagenVascularDiseaseDurationUnit" },
      { header: "Status", key: "collagenVascularDiseaseStatus" },

      // Malignancy
      { header: "Malignancy Duration", key: "malignancyDuration" },
      { header: "Unit", key: "malignancyDurationUnit" },
      { header: "Organ", key: "malignancyOrgan" },
      { header: "Status", key: "malignancyStatus" },

      // Dyslipidemia
      { header: "Dyslipidemia Duration", key: "dyslipidemiaDuration" },
      { header: "Unit", key: "dyslipidemiaDurationUnit" },
      { header: "Status", key: "dyslipidemiaStatus" },

      // CLD
      { header: "CLD Duration", key: "cldDuration" },
      { header: "Unit", key: "cldDurationUnit" },
      { header: "Status", key: "cldStatus" },

      // CKD
      { header: "CKD Duration", key: "ckdDuration" },
      { header: "Unit", key: "ckdDurationUnit" },
      { header: "Type", key: "ckdType" },
      { header: "Status", key: "ckdStatus" },

      // Others
      { header: "Others Disease", key: "othersDisease" },
      { header: "Duration", key: "othersDuration" },
      { header: "Unit", key: "othersDurationUnit" },
      { header: "Status", key: "othersStatus" },

      // Problem for consultation 
      { header: "Problem", key: "problem" },

      { header: "SOB Duration", key: "sobDuration" },
      { header: "SOB Unit", key: "sobDurationUnit" },
      { header: "SOB Status", key: "sobStatus" },

      { header: "Cough Duration", key: "coughDuration" },
      { header: "Cough Unit", key: "coughDurationUnit" },
      { header: "Cough Status", key: "coughStatus" },

      { header: "Bleeding With Cough Duration", key: "bleedingWithCoughDuration" },
      { header: "Unit", key: "bleedingWithCoughDurationUnit" },
      { header: "Status", key: "bleedingWithCoughStatus" },

      { header: "Chest Pain Duration", key: "chestPainDuration" },
      { header: "Unit", key: "chestPainDurationUnit" },
      { header: "Status", key: "chestPainStatus" },

      { header: "Wheeze Duration", key: "wheezeDuration" },
      { header: "Unit", key: "wheezeDurationUnit" },
      { header: "Status", key: "wheezeStatus" },

      { header: "Phlegm Duration", key: "phlegmDuration" },
      { header: "Unit", key: "phlegmDurationUnit" },
      { header: "Status", key: "phlegmStatus" },

      { header: "Nasal Congestion Duration", key: "nasalCongestionDuration" },
      { header: "Unit", key: "nasalCongestionDurationUnit" },
      { header: "Status", key: "nasalCongestionStatus" },

      { header: "Snoring Duration", key: "snoringDuration" },
      { header: "Unit", key: "snoringDurationUnit" },
      { header: "Status", key: "snoringStatus" },

      { header: "Daytime Sleepiness Duration", key: "dayTimeSleepinessDuration" },
      { header: "Unit", key: "dayTimeSleepinessDurationUnit" },
      { header: "Status", key: "dayTimeSleepinessStatus" },

      { header: "Weakness Duration", key: "weaknessDuration" },
      { header: "Unit", key: "weaknessDurationUnit" },
      { header: "Status", key: "weaknessStatus" },

      { header: "Drowsiness Duration", key: "drowsinessDuration" },
      { header: "Unit", key: "drowsinessDurationUnit" },
      { header: "Status", key: "drowsinessStatus" },

      { header: "Lethargy Duration", key: "lethargyDuration" },
      { header: "Unit", key: "lethargyDurationUnit" },
      { header: "Status", key: "lethargyStatus" },

      { header: "Low Mood Duration", key: "lowMoodDuration" },
      { header: "Unit", key: "lowMoodDurationUnit" },
      { header: "Status", key: "lowMoodStatus" },

      { header: "Diarrhoea Duration", key: "diarrheaDuration" },
      { header: "Unit", key: "diarrheaDurationUnit" },
      { header: "Status", key: "diarrheaStatus" },

      { header: "Uncontrolled Disease", key: "uncontrolledDiseaseName" },
      { header: "Duration", key: "uncontrolledDiseaseDuration" },
      { header: "Unit", key: "uncontrolledDiseaseDurationUnit" },
      { header: "Status", key: "uncontrolledDiseaseStatus" },

      { header: "Others Disease", key: "othersDisease" },
      { header: "Duration", key: "othersDuration" },
      { header: "Unit", key: "othersDurationUnit" },
      { header: "Status", key: "othersStatus" },
      //History
      { header: "History", key: "history" },

      { header: "Allergy Type", key: "allergyType" },
      { header: "Allergy Duration", key: "allergyDuration" },
      { header: "Allergy Duration Unit", key: "allergyDurationUnit" },

      { header: "Drug Type", key: "drugType" },
      { header: "Reaction Type", key: "reactionType" },

      { header: "Past Surgery Type", key: "pastSurgeryType" },
      { header: "Year of Surgery", key: "yearOfSurgery" },

      { header: "Past Disease", key: "pastDisease" },

      { header: "Family History", key: "familyHistory" },
      { header: "Occupation", key: "occupation" },

      { header: "Dust Exposure Duration", key: "dustExposureDuration" },
      { header: "Dust Exposure Unit", key: "dustExposureUnit" },

      { header: "Cotton Dust Exposure Duration", key: "cottonDustExposureDuration" },
      { header: "Cotton Dust Exposure Unit", key: "cottonDustExposureUnit" },

      { header: "Wood Dust Exposure Duration", key: "woodDustExposureDuration" },
      { header: "Wood Dust Exposure Unit", key: "woodDustExposureUnit" },

      { header: "Pigeon Exposure Duration", key: "pigeonExposureDuration" },
      { header: "Pigeon Exposure Unit", key: "pigeonExposureUnit" },

      { header: "Hay Exposure Duration", key: "hayExposureDuration" },
      { header: "Hay Exposure Unit", key: "hayExposureUnit" },

      { header: "Moulds Exposure Duration", key: "mouldsExposureDuration" },
      { header: "Moulds Exposure Unit", key: "mouldsExposureUnit" },

      { header: "Pollen Exposure Duration", key: "pollenExposureDuration" },
      { header: "Pollen Exposure Unit", key: "pollenExposureUnit" },

      { header: "Chemical Exposure Duration", key: "chemicalExposureDuration" },
      { header: "Chemical Exposure Unit", key: "chemicalExposureUnit" },

      { header: "Stone Dust Exposure Duration", key: "stoneDustExposureDuration" },
      { header: "Stone Dust Exposure Unit", key: "stoneDustExposureUnit" },

      { header: "Other Exposure Type", key: "otherExposureType" },
      { header: "Other Exposure Duration", key: "otherExposureDuration" },
      { header: "Other Exposure Unit", key: "otherExposureUnit" },

      { header: "Hospitalization", key: "Hospitalization" },

      { header: "Past Hospitalization Year", key: "pastHospitalizationYear" },
      { header: "Hospitalization Days", key: "hospitalizationDays" },
      { header: "Reason for Hospitalization", key: "hospitalizationReason" },

      { header: "Status Of Sickness", key: "statusOfSickness" },
      { header: " Cat Score", key: "catScore" },

    ]

    let counter = 1;
    const userData = await PatientSchema.find();


    userData.forEach((visit) => {

      const rowData = {
        s_no: counter,
        name: visit.name,
        gender: visit.gender,
        age: visit.age,
        patientId: visit.patientId,
        contactNumber: visit.contactNumber,
        email: visit.email,
        bloodGroup: visit.bloodGroup,
        state: visit.state,
        country: visit.country,
        date: visit.date,
        time: visit.time,
        consultingDoctor: visit.consultingDoctor,
        localContactName: visit.localContactName,
        localContactRelation: visit.localContactRelation,
        coordinator: visit.coordinator,
        localContactNumber: visit.localContactNumber,
        visitDate: visit?.visitCount[0]?.visitDate,
        visitTime: visit?.visitCount[0]?.visitTime,

        // Existing disease
        diabetesDuration: visit?.visitCount[0]?.existingDeseases?.diabetes?.duration?.numericValue,
        diabetesDurationUnit: visit?.visitCount[0]?.existingDeseases?.diabetes?.duration?.unit,
        diabetesStatus: visit?.visitCount[0]?.existingDeseases?.diabetes?.statusOfDisease,

        hypertensionDuration: visit?.visitCount[0]?.existingDeseases?.hypertension?.duration?.numericValue,
        hypertensionDurationUnit: visit?.visitCount[0]?.existingDeseases?.hypertension?.duration?.unit,
        hypertensionStatus: visit?.visitCount[0]?.existingDeseases?.hypertension?.statusOfDisease,

        HIDDuration: visit?.visitCount[0]?.existingDeseases?.ihd?.duration?.numericValue,
        HIDDurationUnit: visit?.visitCount[0]?.existingDeseases?.ihd?.duration?.unit,
        HIDStatus: visit?.visitCount[0]?.existingDeseases?.ihd?.statusOfDisease,

        hypothyroidismDuration: visit?.visitCount[0]?.existingDeseases?.hypothyroidism?.duration?.numericValue,
        hypothyroidismDurationUnit: visit?.visitCount[0]?.existingDeseases?.hypothyroidism?.duration?.unit,
        hypothyroidismStatus: visit?.visitCount[0]?.existingDeseases?.hypothyroidism?.statusOfDisease,

        allergicRhinitisDuration: visit?.visitCount[0]?.existingDeseases?.allergicrhinitis?.duration?.numericValue,
        allergicRhinitisDurationUnit: visit?.visitCount[0]?.existingDeseases?.allergicrhinitis?.duration?.unit,
        allergicRhinitisStatus: visit?.visitCount[0]?.existingDeseases?.allergicrhinitis?.statusOfDisease,

        hyperuricemiaDuration: visit?.visitCount[0]?.existingDeseases?.ihd?.duration?.numericValue,
        hyperuricemiaDurationUnit: visit?.visitCount[0]?.existingDeseases?.ihd?.duration?.unit,
        hyperuricemiaStatus: visit?.visitCount[0]?.existingDeseases?.ihd?.statusOfDisease,

        asthamaDuration: visit?.visitCount[0]?.existingDeseases?.asthama?.duration?.numericValue,
        asthamaDurationUnit: visit?.visitCount[0]?.existingDeseases?.asthama?.duration?.unit,
        asthamaStatus: visit?.visitCount[0]?.existingDeseases?.asthama?.statusOfDisease,

        tbDuration: visit?.visitCount[0]?.existingDeseases?.tb?.duration?.numericValue,
        tbDurationUnit: visit?.visitCount[0]?.existingDeseases?.tb?.duration?.unit,
        tbStatus: visit?.visitCount[0]?.existingDeseases?.tb?.statusOfDisease,

        copdDuration: visit?.visitCount[0]?.existingDeseases?.copd?.duration?.numericValue,
        copdDurationUnit: visit?.visitCount[0]?.existingDeseases?.copd?.duration?.unit,
        copdStatus: visit?.visitCount[0]?.existingDeseases?.copd?.statusOfDisease,

        ildDuration: visit?.visitCount[0]?.existingDeseases?.ild?.duration?.numericValue,
        ildDurationUnit: visit?.visitCount[0]?.existingDeseases?.ild?.duration?.unit,
        ildStatus: visit?.visitCount[0]?.existingDeseases?.ild?.statusOfDisease,

        bronchiectasisDuration: visit?.visitCount[0]?.existingDeseases?.bronchiectasis?.duration?.numericValue,
        bronchiectasisDurationUnit: visit?.visitCount[0]?.existingDeseases?.bronchiectasis?.duration?.unit,
        bronchiectasisStatus: visit?.visitCount[0]?.existingDeseases?.bronchiectasis?.statusOfDisease,

        osaDuration: visit?.visitCount[0]?.existingDeseases?.osa?.duration?.numericValue,
        osaDurationUnit: visit?.visitCount[0]?.existingDeseases?.osa?.duration?.unit,
        osaStatus: visit?.visitCount[0]?.existingDeseases?.osa?.statusOfDisease,

        ibsDuration: visit?.visitCount[0]?.existingDeseases?.ibs?.duration?.numericValue,
        ibsDurationUnit: visit?.visitCount[0]?.existingDeseases?.ibs?.duration?.unit,
        ibsStatus: visit?.visitCount[0]?.existingDeseases?.ibs?.statusOfDisease,

        inflammatoryBowelDiseaseDuration: visit?.visitCount[0]?.existingDeseases?.inflammatoryboweldisease?.duration?.numericValue,
        inflammatoryBowelDiseaseDurationUnit: visit?.visitCount[0]?.existingDeseases?.inflammatoryboweldisease?.duration?.unit,
        inflammatoryBowelDiseaseStatus: visit?.visitCount[0]?.existingDeseases?.inflammatoryboweldisease?.statusOfDisease,

        depressionDuration: visit?.visitCount[0]?.existingDeseases?.depression?.duration?.numericValue,
        depressionDurationUnit: visit?.visitCount[0]?.existingDeseases?.depression?.duration?.unit,
        depressionStatus: visit?.visitCount[0]?.existingDeseases?.depression?.statusOfDisease,

        anxietyDuration: visit?.visitCount[0]?.existingDeseases?.anxiety?.duration?.numericValue,
        anxietyDurationUnit: visit?.visitCount[0]?.existingDeseases?.anxiety?.duration?.unit,
        anxietyStatus: visit?.visitCount[0]?.existingDeseases?.anxiety?.statusOfDisease,

        osaDuration: visit?.visitCount[0]?.existingDeseases?.osa?.duration?.numericValue,
        osaDurationUnit: visit?.visitCount[0]?.existingDeseases?.osa?.duration?.unit,
        osaStatus: visit?.visitCount[0]?.existingDeseases?.osa?.statusOfDisease,

        collagenVascularDiseaseDuration: visit?.visitCount[0]?.existingDeseases?.collagenvasculardisease?.duration?.numericValue,
        collagenVascularDiseaseDurationUnit: visit?.visitCount[0]?.existingDeseases?.collagenvasculardisease?.duration?.unit,
        collagenVascularDiseaseStatus: visit?.visitCount[0]?.existingDeseases?.collagenvasculardisease?.statusOfDisease,

        malignancyOrgan: visit?.visitCount[0]?.existingDeseases?.malignancy?.organ,
        malignancyDuration: visit?.visitCount[0]?.existingDeseases?.malignancy?.duration?.numericValue,
        malignancyDurationUnit: visit?.visitCount[0]?.existingDeseases?.malignancy?.duration?.unit,
        malignancyStatus: visit?.visitCount[0]?.existingDeseases?.malignancy?.statusOfDisease,

        dyslipidemiaDuration: visit?.visitCount[0]?.existingDeseases?.dyslipidemia?.duration?.numericValue,
        dyslipidemiaDurationUnit: visit?.visitCount[0]?.existingDeseases?.dyslipidemia?.duration?.unit,
        dyslipidemiaStatus: visit?.visitCount[0]?.existingDeseases?.dyslipidemia?.statusOfDisease,

        cldDuration: visit?.visitCount[0]?.existingDeseases?.cld?.duration?.numericValue,
        cldDurationUnit: visit?.visitCount[0]?.existingDeseases?.cld?.duration?.unit,
        cldStatus: visit?.visitCount[0]?.existingDeseases?.cld?.statusOfDisease,

        ckdType: visit?.visitCount[0]?.existingDeseases?.ckd?.typeofckd,
        ckdDuration: visit?.visitCount[0]?.existingDeseases?.ckd?.duration?.numericValue,
        ckdDurationUnit: visit?.visitCount[0]?.existingDeseases?.ckd?.duration?.unit,
        ckdStatus: visit?.visitCount[0]?.existingDeseases?.ckd?.statusOfDisease,

        othersDisease: visit?.visitCount[0]?.existingDeseases?.others?.disease,
        othersDuration: visit?.visitCount[0]?.existingDeseases?.others?.duration?.numericValue,
        othersDurationUnit: visit?.visitCount[0]?.existingDeseases?.others?.duration?.unit,
        othersStatus: visit?.visitCount[0]?.existingDeseases?.others?.statusOfDisease,

        //Problem for consultation
        problem: 'Problem for consultation',

        sobDuration: visit?.visitCount[0]?.problemForConsultation?.sob?.duration?.numericValue,
        sobDurationUnit: visit?.visitCount[0]?.problemForConsultation?.sob?.duration?.unit,
        sobStatus: visit?.visitCount[0]?.problemForConsultation?.sob?.statusOfDisease,

        // cough
        coughDuration: visit?.visitCount[0]?.problemForConsultation?.cough?.duration?.numericValue,
        coughDurationUnit: visit?.visitCount[0]?.problemForConsultation?.cough?.duration?.unit,
        coughStatus: visit?.visitCount[0]?.problemForConsultation?.cough?.statusOfDisease,

        // bleeding with cough
        bleedingWithCoughDuration: visit?.visitCount[0]?.problemForConsultation?.bleedingwithcough?.duration?.numericValue,
        bleedingWithCoughDurationUnit: visit?.visitCount[0]?.problemForConsultation?.bleedingwithcough?.duration?.unit,
        bleedingWithCoughStatus: visit?.visitCount[0]?.problemForConsultation?.bleedingwithcough?.statusOfDisease,

        // chest pain
        chestPainDuration: visit?.visitCount[0]?.problemForConsultation?.chestpain?.duration?.numericValue,
        chestPainDurationUnit: visit?.visitCount[0]?.problemForConsultation?.chestpain?.duration?.unit,
        chestPainStatus: visit?.visitCount[0]?.problemForConsultation?.chestpain?.statusOfDisease,

        // wheeze
        wheezeDuration: visit?.visitCount[0]?.problemForConsultation?.wheeze?.duration?.numericValue,
        wheezeDurationUnit: visit?.visitCount[0]?.problemForConsultation?.wheeze?.duration?.unit,
        wheezeStatus: visit?.visitCount[0]?.problemForConsultation?.wheeze?.statusOfDisease,

        // phlegm
        phlegmDuration: visit?.visitCount[0]?.problemForConsultation?.phlagm?.duration?.numericValue,
        phlegmDurationUnit: visit?.visitCount[0]?.problemForConsultation?.phlagm?.duration?.unit,
        phlegmStatus: visit?.visitCount[0]?.problemForConsultation?.phlagm?.statusOfDisease,

        // nasal congestion
        nasalCongestionDuration: visit?.visitCount[0]?.problemForConsultation?.nasalcongestion?.duration?.numericValue,
        nasalCongestionDurationUnit: visit?.visitCount[0]?.problemForConsultation?.nasalcongestion?.duration?.unit,
        nasalCongestionStatus: visit?.visitCount[0]?.problemForConsultation?.nasalcongestion?.statusOfDisease,

        // snoring
        snoringDuration: visit?.visitCount[0]?.problemForConsultation?.snoring?.duration?.numericValue,
        snoringDurationUnit: visit?.visitCount[0]?.problemForConsultation?.snoring?.duration?.unit,
        snoringStatus: visit?.visitCount[0]?.problemForConsultation?.snoring?.statusOfDisease,

        // daytime sleepiness
        dayTimeSleepinessDuration: visit?.visitCount[0]?.problemForConsultation?.daytimesleepiness?.duration?.numericValue,
        dayTimeSleepinessDurationUnit: visit?.visitCount[0]?.problemForConsultation?.daytimesleepiness?.duration?.unit,
        dayTimeSleepinessStatus: visit?.visitCount[0]?.problemForConsultation?.daytimesleepiness?.statusOfDisease,

        // weakness
        weaknessDuration: visit?.visitCount[0]?.problemForConsultation?.weakness?.duration?.numericValue,
        weaknessDurationUnit: visit?.visitCount[0]?.problemForConsultation?.weakness?.duration?.unit,
        weaknessStatus: visit?.visitCount[0]?.problemForConsultation?.weakness?.statusOfDisease,

        // drowsiness
        drowsinessDuration: visit?.visitCount[0]?.problemForConsultation?.drowsiness?.duration?.numericValue,
        drowsinessDurationUnit: visit?.visitCount[0]?.problemForConsultation?.drowsiness?.duration?.unit,
        drowsinessStatus: visit?.visitCount[0]?.problemForConsultation?.drowsiness?.statusOfDisease,

        // lethargy
        lethargyDuration: visit?.visitCount[0]?.problemForConsultation?.lethargy?.duration?.numericValue,
        lethargyDurationUnit: visit?.visitCount[0]?.problemForConsultation?.lethargy?.duration?.unit,
        lethargyStatus: visit?.visitCount[0]?.problemForConsultation?.lethargy?.statusOfDisease,

        // low mood
        lowMoodDuration: visit?.visitCount[0]?.problemForConsultation?.lowmood?.duration?.numericValue,
        lowMoodDurationUnit: visit?.visitCount[0]?.problemForConsultation?.lowmood?.duration?.unit,
        lowMoodStatus: visit?.visitCount[0]?.problemForConsultation?.lowmood?.statusOfDisease,

        // diarrhea
        diarrheaDuration: visit?.visitCount[0]?.problemForConsultation?.diarrhoea?.duration?.numericValue,
        diarrheaDurationUnit: visit?.visitCount[0]?.problemForConsultation?.diarrhoea?.duration?.unit,
        diarrheaStatus: visit?.visitCount[0]?.problemForConsultation?.diarrhoea?.statusOfDisease,

        uncontrolledDiseaseDuration: visit?.visitCount[0]?.problemForConsultation?.uncontrolleddisease[0]?.duration?.numericValue,
        uncontrolledDiseaseDurationUnit: visit?.visitCount[0]?.problemForConsultation?.uncontrolleddisease[0]?.duration?.unit,
        uncontrolledDiseaseStatus: visit?.visitCount[0]?.problemForConsultation?.uncontrolleddisease[0]?.statusOfDisease,
        uncontrolledDiseaseName: visit?.visitCount[0]?.problemForConsultation?.uncontrolleddisease[0]?.name,

        othersDisease: visit?.visitCount[0]?.problemForConsultation?.others?.disease,
        othersDuration: visit?.visitCount[0]?.problemForConsultation?.others?.duration?.numericValue,
        othersDurationUnit: visit?.visitCount[0]?.problemForConsultation?.others?.duration?.unit,
        othersStatus: visit?.visitCount[0]?.problemForConsultation?.others?.statusOfDisease,

        history: 'History',

        allergyType: visit?.visitCount[0]?.importantHistory?.allergy?.typeOfAllergy,
        allergyDuration: visit?.visitCount[0]?.importantHistory?.allergy?.duration?.numericValue,
        allergyDurationUnit: visit?.visitCount[0]?.importantHistory?.allergy?.duration?.unit,
        drugType: visit?.visitCount[0]?.importantHistory?.drugReaction?.typeOfDrug,
        reactionType: visit?.visitCount[0]?.importantHistory?.drugReaction?.typeOfReaction,
        pastSurgeryType: visit?.visitCount[0]?.importantHistory?.pastSurgery?.typeOfSurgery,
        yearOfSurgery: visit?.visitCount[0]?.importantHistory?.pastSurgery?.year,


        pastDisease: visit?.visitCount[0]?.importantHistory?.pastDisease?.typeOfDisease,

        familyHistory: visit?.visitCount[0]?.importantHistory?.familyHistory,
        occupation: visit?.visitCount[0]?.importantHistory?.occupation,
        dustExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.dust?.duration?.numericValue,
        dustExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.dust?.duration?.unit,
        cottonDustExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.cottondust?.duration?.numericValue,
        cottonDustExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.cottondust?.duration?.unit,
        woodDustExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.wooddust?.duration?.numericValue,
        woodDustExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.wooddust?.duration?.unit,
        pigeonExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.pigeon?.duration?.numericValue,
        pigeonExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.pigeon?.duration?.unit,
        hayExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.hay?.duration?.numericValue,
        hayExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.hay?.duration?.unit,
        mouldsExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.moulds?.duration?.numericValue,
        mouldsExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.moulds?.duration?.unit,
        pollenExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.pollen?.duration?.numericValue,
        pollenExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.pollen?.duration?.unit,
        chemicalExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.chemical?.duration?.numericValue,
        chemicalExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.chemical?.duration?.unit,
        stoneDustExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.stonedust?.duration?.numericValue,
        stoneDustExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.stonedust?.duration?.unit,
        otherExposureType: visit?.visitCount[0]?.importantHistory?.exposure?.others?.typeOfExposure,
        otherExposureDuration: visit?.visitCount[0]?.importantHistory?.exposure?.others?.duration?.numericValue,
        otherExposureUnit: visit?.visitCount[0]?.importantHistory?.exposure?.others?.duration?.unit,

        Hospitalization: 'Hospitalization',

        pastHospitalizationYear: visit?.visitCount[0]?.pastHospitalization[0]?.yearOfHospitalization,
        hospitalizationDays: visit?.visitCount[0]?.pastHospitalization[0]?.days,
        hospitalizationReason: visit?.visitCount[0]?.pastHospitalization[0]?.reason,

        statusOfSickness: visit?.visitCount[0]?.statusOfSickness,
        catScore: visit?.visitCount[0]?.catScore,

      };

      console.log(visit?.visitCount[0]?.existingDeseases?.diabetes?.duration?.numericValue)


      worksheet.addRow(rowData);
      counter++;
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    })

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
    )
    res.setHeader("Content-Disposition", `attachment; filename= users.xlsx`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200)
    })

  } catch (error) {
    console.log(error.message)
  }
};