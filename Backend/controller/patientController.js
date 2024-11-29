import PatientSchema from "../model/patientSchema.js";
import RequestSchema from "../model/requestSchema.js";
import FeedbackSchema from "../model/feedbackSchema.js";
import moment from "moment-timezone";
import AdminSchema from "../model/adminSchema.js";
import { decryptPassword } from "../middleware/auth.js";
import ReportsSchema from "../model/reportSchema.js";

// export const login = async (req, res) => {
//   const { patientId, password } = req.body;
//   console.log(patientId,password)
//   try {
//     const existingUser = await PatientSchema.findOne({ patientId });
//     if (!existingUser)
//       return res.json({ status: "error", message: "Patient does not exist" });

//     if (password != existingUser.password)
//       return res.json({ status: "error", message: "Invalid credentials" });

//     const { patientId, name, gender, age, contactNumber, bloodGroup, image } =
//       existingUser;

//     res.status(200).json({
//       status: "success",
//       result: {
//         patientId,
//         name,
//         gender,
//         age,
//         contactNumber,
//         bloodGroup,
//         image,
//       },
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
export const login = async (req, res) => {
  const { patientId, password } = req.body;
  //console.log(patientId, password);
  try {
    const existingUser = await PatientSchema.findOne({ patientId });
    if (!existingUser)
      return res
        .status(404)
        .json({ status: "error", message: "Patient does not exist" });

    const decryptedPassword = decryptPassword(existingUser.password);

    if (password !== decryptedPassword)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });

    const { name, gender, age, contactNumber, bloodGroup, image } =
      existingUser;

    res.status(200).json({
      status: "success",
      result: {
        patientId,
        name,
        gender,
        age,
        contactNumber,
        bloodGroup,
        image,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const HomePageDetails = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if patient exists
    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Fetch patient details
    const registeredPatientsName = await PatientSchema.find(
      { patientId: id },
      {
        name: 1,
        gender: 1,
        patientId: 1,
        contactNumber: 1,
        image: 1,
        _id: 0,
        consultingDoctor: 1,
        date: { $arrayElemAt: ["$visitCount.visitDate", -1] },
        time: { $arrayElemAt: ["$visitCount.visitTime", -1] },
      }
    );

    // Create variables for degree and medicine
    let degree = null;
    let medicine = null;

    // Assign degree and medicine based on the consulting doctor
    if (registeredPatientsName[0]?.consultingDoctor === 'Dr. Parthasarathi Bhattacharyya') {
      degree = 'MD, DNBE';
      medicine = 'Pulmonary Medicine';
    } else if (registeredPatientsName[0]?.consultingDoctor === 'Dr. Avishek Kar') {
      degree = 'MD';
      medicine = 'Pulmonary Medicine';
    } else if (registeredPatientsName[0]?.consultingDoctor === 'Dr. Abhra Ch. Chowdhury') {
      degree = 'DNB, DM';
      medicine = null;  // No specific medicine
    } else if (registeredPatientsName[0]?.consultingDoctor === 'Dr. Ashok Saha') {
      degree = 'MS, DNB, D.Orth';
      medicine = null;  // No specific medicine
    }

    // Add degree and medicine to each patient's details
    const updatedPatientsName = registeredPatientsName.map(patient => ({
      ...patient.toObject(),
      degree: degree,
      medicine: medicine,
    }));

    // Log the details for debugging purposes
    // console.log("Registered Patients Details:", updatedPatientsName);

    // Send the response with patient details including degree and medicine
    res.status(200).json(updatedPatientsName);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const PatientProfile = async (req, res) => {
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
        status: 1,
        date: 1,
        time: 1,
        country: 1,
        image: 1,
        consultingDoctor: 1,
        localContactName: 1,
        localContactRelation: 1,
        localContactNumber: 1,
        _id: 0,
      }
    );
    res.status(200).json(registeredPatientsName[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const PatientCoordinator = async (req, res) => {
  try {
    const id = req.params.id;

    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const registeredPatient = await PatientSchema.find(
      {
        patientId: id,
      },
      {
        name: 1,
        patientId: 1,
        coordinator: 1,
        _id: 0,
      }
    );
    res.status(200).json(registeredPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const PatientsAllAppointments = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if patient exists
    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    let patientInfo = await PatientSchema.findOne(
      { patientId: id },
      {
        name: 1,
        patientId: 1,
        consultingDoctor: 1,
        coordinator: 1,
        _id: 0,
      }
    );


    let degree = null;
    let medicine = null;


    if (patientInfo.consultingDoctor === 'Dr. Parthasarathi Bhattacharyya') {
      degree = 'MD, DNBE';
      medicine = 'Pulmonary Medicine';
    } else if (patientInfo.consultingDoctor === 'Dr. Avishek Kar') {
      degree = 'MD';
      medicine = 'Pulmonary Medicine';
    } else if (patientInfo.consultingDoctor === 'Dr. Abhra Ch. Chowdhury') {
      degree = 'DNB, DM';
      medicine = null;
    } else if (patientInfo.consultingDoctor === 'Dr. Ashok Saha') {
      degree = 'MS, DNB, D.Orth';
      medicine = null;
    }

    patientInfo = patientInfo.toObject();


    // console.log("Patient Info:", patientInfo);
    // console.log("Degree:", degree);
    // console.log("Medicine:", medicine);


    const patientAppointments = await PatientSchema.findOne(
      { patientId: id },
      { visitCount: 1, _id: 0 }
    );


    const allAppointments = patientAppointments?.visitCount?.map((visit) => ({
      visitDate: visit.visitDate,
      visitTime: visit.visitTime,
      id: visit._id
    }))
      .reverse();


    res.status(200).json({
      patientInfo: patientInfo,
      degree: degree,
      medicine: medicine,
      appointments: allAppointments
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const OneAppointmentDetails = async (req, res) => {

  try {
    const visitid = req.params.visitid; // ID of the specific visit inside visitCount
    //console.log(visitid);
    // Find the patient document containing the specified visit _id
    const patient = await PatientSchema.findOne(
      { "visitCount._id": visitid },
      {
        "visitCount.$": 1,
        _id: 0
      } // Only retrieve the matching visit in visitCount
    );

    // If no matching visit is found, return a 404 error
    if (!patient) {
      return res.status(404).json({ message: "Visit not found" });
    }


    res.status(200).json({
      visitDetails: patient.visitCount[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const createRequest = async (req, res) => {
  try {
    const desiredTimezone = 'Asia/Kolkata';
    const currentDate = moment().tz(desiredTimezone).format('MMMM D, YYYY');
    const currentTime = moment().tz(desiredTimezone).format('hh:mm A');

    const { patientId, hospitalization, demise, ...rest } = req.body;
    const isCritical = hospitalization?.isSelected === "yes" || demise?.isSelected === "yes";
    const status = isCritical ? 'Critical' : 'Normal';

    const patientDetails = await PatientSchema.findOne({ patientId });

    const coordinator = await AdminSchema.findOne({ name: patientDetails.coordinator });
    const coordinatorId = coordinator?.idNumber; // assuming `_id` is the unique identifier in AdminSchema

    // const documentCount = await RequestSchema.countDocuments();
    // const nextRequestId = documentCount + 1;

    const largestRequest = await RequestSchema.findOne().sort({ requestId: -1 });
    const nextRequestId = largestRequest ? largestRequest.requestId + 1 : 1;

    const newRequest = {
      viewed: true,
      coordinatorviewed: false,
      coordinatorName: patientDetails.coordinator,
      coordinatorId: coordinatorId,
      date: currentDate,
      time: currentTime,
      requestId: nextRequestId,
      patientId,
      status,
      hospitalization,
      demise,
      ...rest,
    };

    //this console.log prints the new request object perfectly with all the fields
    //console.log(newRequest)

    // Create a new document with the new request
    const requestDocument = await RequestSchema.create(newRequest);
    // const savedRequest = await requestDocument.save();

    res.status(200).json(requestDocument);
    //console.log('New document created');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const allrequest = async (req, res) => {
  try {
    const id = req.params.id;

    const patientExists = await RequestSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientRequest = await RequestSchema.find(
      {
        patientId: id,
      },
      {
        date: 1,
        time: 1,
        requestId: 1,
        request: 1,
        _id: 0,
      }
    );
    const reversedPatientRequest = patientRequest.reverse();
    res.status(200).json(reversedPatientRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const request = async (req, res) => {
  try {
    const id = req.params.rid;

    const requestExists = await RequestSchema.exists({ requestId: id });
    if (!requestExists) {
      return res.status(404).json({ message: "Request not found" });
    }

    const patientRequest = await RequestSchema.find(
      {
        requestId: id,
      },
      {
        date: 1,
        time: 1,
        exacrebation: 1,
        newProblem: 1,
        newConsultation: 1,
        hospitalization: 1,
        disabilities: 1,
        demise: 1,
        report: 1,
        request: 1,
        action: 1,
        _id: 0,
      }
    );
    res.status(200).json(patientRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const requestNotification = async (req, res) => {
  try {
    const id = req.params.id;

    const requestExists = await RequestSchema.exists({ patientId: id });
    if (!requestExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientRequest = await RequestSchema.find(
      {
        patientId: id,
        action: { $ne: "NA" }
      },
      {
        requestId: 1,
        action: 1,
        request: 1,
        _id: 0,
      }
    );
    res.status(200).json(patientRequest.reverse());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const countNotification = async (req, res) => {
  try {
    const id = req.params.id;

    const count = await RequestSchema.countDocuments({ patientId: id, viewed: false });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const seenNotification = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await RequestSchema.updateMany(
      { patientId: id, viewed: false },
      { viewed: true }
    );

    res.status(200).json({ message: "All notifications marked as seen" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Feedback


export const sendFeedback = async (req, res) => {
  try {
    const desiredTimezone = 'Asia/Kolkata';
    const currentDate = moment().tz(desiredTimezone).format('MMMM D, YYYY');
    const currentTime = moment().tz(desiredTimezone).format('hh:mm A');

    const { patientId, name, phonenumber, rating, feedback } = req.body;


    const largestFeedback = await FeedbackSchema.findOne().sort({ feedbackId: -1 });
    const nextFeedbackId = largestFeedback ? largestFeedback.feedbackId + 1 : 1;

    const newFeedback = {
      date: currentDate,
      time: currentTime,
      feedbackId: nextFeedbackId,
      patientId,
      name,
      phonenumber,
      rating,
      feedback,
    };


    // Create a new document with the new request
    const requestDocument = await FeedbackSchema.create(newFeedback);
    // const savedRequest = await requestDocument.save();

    res.status(200).json(requestDocument);
    //console.log('New document created');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/////Reports section...


export const uploadReports = async (req, res) => {
  try {
    const desiredTimezone = 'Asia/Kolkata';
    const currentDate = moment().tz(desiredTimezone).format('MMMM D, YYYY');
    const currentTime = moment().tz(desiredTimezone).format('hh:mm A');

    const { patientId, multipledocument } = req.body;
    

    const patientDetails = await PatientSchema.findOne({ patientId });
    if (!patientDetails) {
      return res.status(404).json({ message: "Patient not found" });
    }


    const coordinator = await AdminSchema.findOne({ name: patientDetails.coordinator });
    const coordinatorId = coordinator?.idNumber; // assuming `_id` is the unique identifier in AdminSchema

    // const documentCount = await RequestSchema.countDocuments();
    // const nextRequestId = documentCount + 1;

    const largestRequest = await ReportsSchema.findOne().sort({ reportId: -1 });
    const nextRequestId = largestRequest ? largestRequest.reportId + 1 : 1;

    const newRequest = {
      viewed: false,
      coordinatorName: patientDetails.coordinator,
      coordinatorId: coordinatorId,
      date: currentDate,
      time: currentTime,
      name: patientDetails.name,
      reportId: nextRequestId,
      patientId,
      multipledocument,
    };

    //this console.log prints the new request object perfectly with all the fields
    //console.log(newRequest)

    // Create a new document with the new request
    const requestDocument = await ReportsSchema.create(newRequest);
    // const savedRequest = await requestDocument.save();

    res.status(200).json(requestDocument);
    //console.log(requestDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


