import PatientSchema from "../model/patientSchema.js";
import RequestSchema from "../model/requestSchema.js";
import AdminSchema from "../model/adminSchema.js";
import moment from "moment-timezone";
import excelJS from 'exceljs';
import FeedbackSchema from "../model/feedbackSchema.js";
import nodemailer from "nodemailer";
import { decryptPassword, encryptPassword } from "../middleware/auth.js";
import dotenv from 'dotenv';
import ReportsSchema from "../model/reportSchema.js";
dotenv.config()

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
      date,
      time,
    } = req.body;

    // Get the desired time zone (e.g., server's time zone or a specific time zone)
    // const desiredTimezone = "Asia/Kolkata"; // Replace with your desired time zone
    // const currentDate = moment().tz(desiredTimezone).format("MMMM D, YYYY");
    // const currentTime = moment().tz(desiredTimezone).format("hh:mm A");

    const encryptedPassword = encryptPassword(password);
    //console.log("encryptedPassword",encryptedPassword)
    const largestRequest = await PatientSchema.findOne().sort({ count: -1 });
    const nextRequestId = largestRequest && !isNaN(largestRequest.count)
      ? largestRequest.count + 1
      : 1;

    const finduser = await PatientSchema.findOne({ patientId: patientId });
    if (finduser) {
      //console.log("user exist");
      return res.status(200).json({ message: "ID already exists" });
    } else {
      const newUser = await PatientSchema.create({
        name,
        gender,
        count: nextRequestId,
        patientId,
        contactNumber,
        email,
        bloodGroup,
        password: encryptedPassword,
        age,
        address,
        state,
        country,
        image,
        consultingDoctor,
        localContactName,
        localContactRelation,
        localContactNumber,
        date,
        time,
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
    // console.log(currentDate)
    const registeredPatients = await PatientSchema.find(
      {
        //status: "Registered",
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
    //console.log(registeredPatients)
    //reverse the array so that the latest registerations come at the top
    registeredPatients.reverse();
    res.status(200).json(registeredPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sectionAallPatient = async (req, res) => {
  try {
    // Get pagination parameters from query string
    const { page = 1, limit = 10 } = req.query;

    // Ensure valid numbers
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    // Fetch total count of patients
    const totalPatients = await PatientSchema.countDocuments();

    // Fetch patients with sorting and pagination
    const registeredPatients = await PatientSchema.find(
      {},
      {
        name: 1,
        date: 1,
        patientId: 1,
        image: 1,
        gender: 1,
        age: 1,
        time: 1,
        _id: 0,
        status: 1,
        count: 1, // Ensure this field exists
      }
    )
      .sort({ count: -1 }) // Sort by count in descending order
      .skip((pageNum - 1) * limitNum) // Skip records for previous pages
      .limit(limitNum); // Limit records for the current page

    // Send paginated response
    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalPatients / limitNum),
      totalPatients,
      patients: registeredPatients,
    });
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

    const patient = await PatientSchema.findOne(
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
    // res.status(200).json(registeredPatientsName);
    const decryptedPassword = decryptPassword(patient.password);

    // Send the patient details along with the decrypted password
    res.status(200).json({
      name: patient.name,
      gender: patient.gender,
      patientId: patient.patientId,
      contactNumber: patient.contactNumber,
      email: patient.email,
      bloodGroup: patient.bloodGroup,
      password: decryptedPassword, // Include decrypted password
      age: patient.age,
      address: patient.address,
      state: patient.state,
      country: patient.country,
      image: patient.image,
      consultingDoctor: patient.consultingDoctor,
      localContactName: patient.localContactName,
      localContactRelation: patient.localContactRelation,
      localContactNumber: patient.localContactNumber,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const patientEachVistDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const visitData = req.body.visitData;
    // console.log("data", visitData)
    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient = await PatientSchema.findOne({ patientId: id });

    // Get the desired time zone (e.g., server's time zone or a specific time zone)
    // const desiredTimezone = "Asia/Kolkata"; // Replace with your desired time zone
    // // Get the current date and time in the desired time zone
    // const currentDate = moment().tz(desiredTimezone).format("MMMM D, YYYY");
    // const currentTime = moment().tz(desiredTimezone).format("hh:mm A");

    const visitDate = req.body.visitDate;
    const visitTime = req.body.visitTime;

    const newVisit = {
      visitDate,
      visitTime,
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

    //console.log(patient)

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
    // Get pagination parameters from query string
    const { page = 1, limit = 10 } = req.query;

    // Ensure valid numbers
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    // Fetch total count of registered patients
    const totalPatients = await PatientSchema.countDocuments({ status: "Updated" });

    // Fetch patients with pagination
    const registeredPatients = await PatientSchema.find(
      { status: "Updated" },
      {
        count: 1,
        name: 1,
        patientId: 1,
        image: 1,
        gender: 1,
        age: 1,
        visitDate: { $arrayElemAt: ["$visitCount.visitDate", -1] },
        visitTime: { $arrayElemAt: ["$visitCount.visitTime", -1] },
        _id: 0,
      }
    )
      .sort({ count: -1 })
      .skip((pageNum - 1) * limitNum) // Skip items for previous pages
      .limit(limitNum); // Limit items for the current page

    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalPatients / limitNum),
      totalPatients,
      patients: registeredPatients,
    });
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
        visitCount: 1,
        coordinator: 1,
        _id: 0,
      }
    );
    // if (registeredPatientsName.visitCount) {
    //   registeredPatientsName.visitCount = registeredPatientsName.visitCount.reverse();
    // }
    registeredPatientsName.forEach(patient => {
      if (patient.visitCount) {
        patient.visitCount = patient.visitCount.reverse();
      }
    });
    res.status(200).json(registeredPatientsName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const notification = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const requestedPatients = await RequestSchema.find(
      {},
      {
        requestId: 1,
        patientId: 1,
        status: 1,
        date: 1,
        time: 1,
        request: 1,
        action: 1,
        _id: 0,
      }
    )
      .sort({ requestId: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const patientDetailsArray = [];

    for (const patient of requestedPatients) {
      const patientId = patient.patientId;

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
          image: patientDetails.image,
          action: patient.action,
          coordinator: patientDetails.coordinator,
          contactNumber: patientDetails.contactNumber,
        };


        patientDetailsArray.push(patientObject);
      }
    }

    //patientDetailsArray.reverse();

    const totalRequests = await RequestSchema.countDocuments();

    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalRequests / limitNum),
      totalRequests,
      notifications: patientDetailsArray,
    });
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

    const updatedRequest = await RequestSchema.updateOne({ requestId: id }, { action: action, viewed: false });

    res.status(200).json({ message: "updated" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const coordinatorPatients = async (req, res) => {
  try {
    const coname = req.params.coname;

    const adminExists = await AdminSchema.exists({ name: coname });
    if (!adminExists) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const totalPatients = await PatientSchema.countDocuments({
      coordinator: coname,
    });

    const coordinatorPatientsName = await PatientSchema.find(
      {
        coordinator: coname,
      },
      {
        name: 1,
        patientId: 1,
        image: 1,
        gender: 1,
        age: 1,
        count: 1,
        visitDate: { $arrayElemAt: ["$visitCount.visitDate", -1] },
        visitTime: { $arrayElemAt: ["$visitCount.visitTime", -1] },
        _id: 0,
      }
    )
      .sort({ count: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalPatients / limitNum),
      totalPatients,
      patients: coordinatorPatientsName,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateBasicDetails = async (req, res) => {
  try {
    const { id } = req.params; // Get patient ID from route parameter
    const updateData = req.body; // Get updated fields from request body

    // Check if the patient with the given patientId exists
    const updatedUser = await PatientSchema.findOneAndUpdate(
      { patientId: id },
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "An error occurred while updating profile" });
  }
};

export const countAdminNotification = async (req, res) => {
  try {
    const id = req.params.cid;

    const count = await RequestSchema.countDocuments({ coordinatorId: id, coordinatorviewed: false });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const seenAdminNotification = async (req, res) => {
  try {
    const id = req.params.cid;

    const result = await RequestSchema.updateMany(
      { coordinatorId: id, coordinatorviewed: false },
      { coordinatorviewed: true }
    );

    res.status(200).json({ message: "All notifications marked as seen" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const oneAdminNotification = async (req, res) => {
  const id = req.params.cid;

  try {
    // Get pagination parameters from query string
    const { page = 1, limit = 10 } = req.query;

    // Ensure valid numbers
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    // Fetch requested patients for the specific coordinator, sorted by requestId (descending for recent first)
    const requestedPatients = await RequestSchema.find(
      { coordinatorId: id },
      {
        requestId: 1,
        patientId: 1,
        status: 1,
        date: 1,
        time: 1,
        request: 1,
        action: 1,
        coordinatorId: 1,
        _id: 0,
      }
    )
      .sort({ requestId: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const patientDetailsArray = [];


    for (const patient of requestedPatients) {
      const patientId = patient.patientId;

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
          image: patientDetails.image,
          action: patient.action,
          coordinator: patientDetails.coordinator,
          contactNumber: patientDetails.contactNumber,
          coordinatorId: patient.coordinatorId,
        };

        patientDetailsArray.push(patientObject);
      }
    }

    const totalRequests = await RequestSchema.countDocuments({ coordinatorId: id });

    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalRequests / limitNum),
      totalRequests,
      notifications: patientDetailsArray,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const sendMail = async (req, res) => {
  const { patientId } = req.body; // Destructure patientId from the request body

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or another provider
    secure: true,
    port: 465,
    auth: {
      user: "pulmocareresearch01@gmail.com", // Replace with your email
      pass: process.env.EMAILPASSWORD, // Replace with your app password
    },
  });

  if (!patientId) {
    return res.status(400).json({ message: "ID is required." });
  }

  try {
    const patient = await PatientSchema.findOne({ patientId }); // Find the patient using the extracted patientId

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Extract required details
    const patientName = patient.name;
    const patientUniqueId = patient.patientId; // Rename this variable to avoid conflict
    const password = decryptPassword(patient.password); // Ensure password is hashed in production!
    const email = patient.email;

    //console.log("decryptPassword",password)

    // Email subject and body
    const subject = "Patient Registration Details";
    const body = `
Congratulations!! ${patientName}
You are Successfully Registered!!

Your Patient ID: ${patientUniqueId}

Your Login Credentials:
Username: ${patientUniqueId}
Password: ${password}

Please use this username and password to login into our system.

Please tap on the below link to download our patient care app.

https://www.dropbox.com/scl/fi/17yfwavamf8fsfaqgqfhk/IpcrConnect_1.0.0.apk?rlkey=430ixaligmnxsnpajrfcrs61z&st=izc9kriw&dl=0

Thank You,
Best Wishes From IPCR
Visit our website for more details - https://www.pulmocareindia.org
    `;

    const mailOptions = {
      from: "pulmocareresearch01@gmail.com",
      to: email,
      subject,
      text: body,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email." });
  }
};

export const PatientBasicDetailsNewWP = async (req, res) => {
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

///Reports ...

export const countReportNotification = async (req, res) => {
  try {
    // const id = req.params.id;

    const count = await ReportsSchema.countDocuments({ viewed: false });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const seenReportNotification = async (req, res) => {
  try {
    //const id = req.params.id;

    const result = await ReportsSchema.updateMany(
      { viewed: false },
      { viewed: true }
    );

    res.status(200).json({ message: "All notifications marked as seen" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const Reportsnotification = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const reportsPatients = await ReportsSchema.find(
      {},
      {
        reportId: 1,
        patientId: 1,
        status: 1,
        date: 1,
        time: 1,
        name: 1,
        coordinatorName: 1,
        _id: 0,
      }
    )
      .sort({ reportId: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);


    const patientDetailsArray = [];

    for (const patient of reportsPatients) {
      const patientId = patient.patientId;

      const patientDetails = await PatientSchema.findOne({ patientId });

      if (patientDetails) {
        const patientObject = {
          reportId: patient.reportId,
          patientId: patient.patientId,
          date: patient.date,
          time: patient.time,
          name: patient.name,
          image: patientDetails.image,
          coordinatorName: patient.coordinatorName,
          contactNumber: patientDetails.contactNumber,
        };

        patientDetailsArray.push(patientObject);
      }
    }

    const totalReports = await ReportsSchema.countDocuments();

    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalReports / limitNum),
      totalReports,
      reports: patientDetailsArray,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const reports = async (req, res) => {
  try {
    const id = req.params.id;

    const requestExists = await ReportsSchema.exists({ reportId: id });
    if (!requestExists) {
      return res.status(404).json({ message: "Report not found" });
    }

    const patientReport = await ReportsSchema.find(
      {
        reportId: id,
      },
      {
        date: 1,
        time: 1,
        name: 1,
        patientId: 1,
        coordinatorName: 1,
        multipledocument: 1,
        reportId: 1,
        _id: 0,
      }
    );
    res.status(200).json(patientReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const allReports = async (req, res) => {
  try {
    const id = req.params.id;

    const patientExists = await PatientSchema.exists({ patientId: id });
    const reportExists = await ReportsSchema.exists({ patientId: id });
    const requestExists = await RequestSchema.exists({ patientId: id });

    if (!patientExists && !reportExists && !requestExists) {
      return res.status(404).json({ message: "No records found for the given ID" });
    }

    const patient = patientExists
      ? await PatientSchema.findOne(
        { patientId: id },
        {
          "visitCount.visitDate": 1,
          "visitCount.visitTime": 1,
          "visitCount.pastHospitalization": 1,
          "visitCount.otherdocuments": 1,
          "visitCount.prescription": 1,
        }
      )
      : null;

    if (patient && patient.visitCount) {
      patient.visitCount.reverse();
    }

    const reports = reportExists
      ? (await ReportsSchema.find(
        { patientId: id },
        {
          date: 1,
          time: 1,
          multipledocument: 1,
        }
      )).reverse()
      : null;

    const request = requestExists
      ? (await RequestSchema.find(
        { patientId: id },
        {
          date: 1,
          time: 1,
          newConsultation: 1,
          hospitalization: 1,
          demise: 1,
          report: 1,
        }
      )).reverse()
      : null;

    //console.log(patient, reports, request)
    res.status(200).json({ patient, reports, request });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

export const ReportcountAdminNotification = async (req, res) => {
  try {
    const id = req.params.cid;

    const count = await ReportsSchema.countDocuments({ coordinatorId: id, coordinatorviewed: false });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const ReportseenAdminNotification = async (req, res) => {
  try {
    const id = req.params.cid;

    const result = await ReportsSchema.updateMany(
      { coordinatorId: id, coordinatorviewed: false },
      { coordinatorviewed: true }
    );

    res.status(200).json({ message: "All notifications marked as seen" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const ReportoneAdminNotification = async (req, res) => {
  const id = req.params.cid;

  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const requestedPatients = await ReportsSchema.find(
      { coordinatorId: id },
      {
        reportId: 1,
        patientId: 1,
        date: 1,
        time: 1,
        coordinatorName: 1,
        name: 1,
        coordinatorId: 1,
        _id: 0,
      }
    )
      .sort({ reportId: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);


    const patientDetailsArray = [];

    for (const patient of requestedPatients) {
      const patientId = patient.patientId;


      const patientDetails = await PatientSchema.findOne({ patientId });

      if (patientDetails) {
        const patientObject = {
          reportId: patient.reportId,
          patientId: patient.patientId,
          coordinatorName: patient.coordinatorName,
          date: patient.date,
          time: patient.time,
          name: patient.name,
          image: patientDetails.image,
          contactNumber: patientDetails.contactNumber,
          coordinatorId: patient.coordinatorId,
        };

        patientDetailsArray.push(patientObject);
      }
    }

    const totalReports = await ReportsSchema.countDocuments({ coordinatorId: id });
    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalReports / limitNum),
      totalReports,
      reports: patientDetailsArray,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


///search ...

export const searchFunction = async (req, res) => {
  try {
    const { value } = req.query; 

    if (!value) {
      return res.status(400).json({
        message: 'Please provide a search value (either patientId or name).',
      });
    }

    const query = { status: "Updated" };
    if (!isNaN(value)) {
      query.patientId = { $regex: `^${value}`, $options: 'i' }; 
    } else {
      query.name = { $regex: `^${value}`, $options: 'i' }; 
    }

    const patients = await PatientSchema.find(query, {
      name: 1,
      patientId: 1,
      image: 1,
      gender: 1,
      age: 1,
      count: 1,
      visitDate: { $arrayElemAt: ["$visitCount.visitDate", -1] }, // Last visit date
      visitTime: { $arrayElemAt: ["$visitCount.visitTime", -1] }, // Last visit time
      _id: 0,
    });

    // Check if no patients found
    if (patients.length === 0) {
      return res.status(404).json({
        message: 'No patient found matching the provided criteria.',
      });
    }

    res.status(200).json(patients);

  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while searching for patients.',
      error: err.message,
    });
  }
};

export const coordinatorSearch = async (req, res) => {
  try {
    const coname = req.params.coname;
    const { value } = req.query; 
    
    if (!value) {
      return res.status(400).json({
        message: 'Please provide a search value (either patientId or name).',
      });
    }

    const query = { coordinator: coname };
    if (!isNaN(value)) {
      query.patientId = { $regex: `^${value}`, $options: 'i' }; 
    } else {
      query.name = { $regex: `^${value}`, $options: 'i' }; 
    }

    const patients = await PatientSchema.find(query, {
      name: 1,
      patientId: 1,
      image: 1,
      gender: 1,
      age: 1,
      count: 1,
      visitDate: { $arrayElemAt: ["$visitCount.visitDate", -1] }, // Last visit date
      visitTime: { $arrayElemAt: ["$visitCount.visitTime", -1] }, // Last visit time
      _id: 0,
    });

    // Check if no patients found
    if (patients.length === 0) {
      return res.status(404).json({
        message: 'No patient found matching the provided criteria.',
      });
    }

    res.status(200).json(patients);

  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while searching for patients.',
      error: err.message,
    });
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
      { header: "StatusC", key: "copdStatus" },

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
      { header: "Others Disease", key: "othersDiseaseE" },
      { header: "Duration", key: "othersDurationE" },
      { header: "Unit", key: "othersDurationUnitE" },
      { header: "Status", key: "othersStatusE" },

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


    userData.forEach((patient) => {
      patient.visitCount.forEach((visit, index) => {
        const rowData = {
          s_no: counter,
          name: patient.name,
          gender: patient.gender,
          age: patient.age,
          patientId: patient.patientId,
          contactNumber: patient.contactNumber,
          email: patient.email,
          bloodGroup: patient.bloodGroup,
          state: patient.state,
          country: patient.country,
          date: patient.date,
          time: patient.time,
          consultingDoctor: patient.consultingDoctor,
          localContactName: patient.localContactName,
          localContactRelation: patient.localContactRelation,
          coordinator: patient.coordinator,
          localContactNumber: patient.localContactNumber,

          visitDate: visit?.visitDate,
          visitTime: visit?.visitTime,

          // Existing disease
          diabetesDuration: visit?.existingDeseases?.diabetes?.duration?.numericValue,
          diabetesDurationUnit: visit?.existingDeseases?.diabetes?.duration?.unit,
          diabetesStatus: visit?.existingDeseases?.diabetes?.statusOfDisease,

          hypertensionDuration: visit?.existingDeseases?.hypertension?.duration?.numericValue,
          hypertensionDurationUnit: visit?.existingDeseases?.hypertension?.duration?.unit,
          hypertensionStatus: visit?.existingDeseases?.hypertension?.statusOfDisease,

          HIDDuration: visit?.existingDeseases?.ihd?.duration?.numericValue,
          HIDDurationUnit: visit?.existingDeseases?.ihd?.duration?.unit,
          HIDStatus: visit?.existingDeseases?.ihd?.statusOfDisease,

          hypothyroidismDuration: visit?.existingDeseases?.hypothyroidism?.duration?.numericValue,
          hypothyroidismDurationUnit: visit?.existingDeseases?.hypothyroidism?.duration?.unit,
          hypothyroidismStatus: visit?.existingDeseases?.hypothyroidism?.statusOfDisease,

          allergicRhinitisDuration: visit?.existingDeseases?.allergicrhinitis?.duration?.numericValue,
          allergicRhinitisDurationUnit: visit?.existingDeseases?.allergicrhinitis?.duration?.unit,
          allergicRhinitisStatus: visit?.existingDeseases?.allergicrhinitis?.statusOfDisease,

          hyperuricemiaDuration: visit?.existingDeseases?.ihd?.duration?.numericValue,
          hyperuricemiaDurationUnit: visit?.existingDeseases?.ihd?.duration?.unit,
          hyperuricemiaStatus: visit?.existingDeseases?.ihd?.statusOfDisease,

          asthamaDuration: visit?.existingDeseases?.asthama?.duration?.numericValue,
          asthamaDurationUnit: visit?.existingDeseases?.asthama?.duration?.unit,
          asthamaStatus: visit?.existingDeseases?.asthama?.statusOfDisease,

          tbDuration: visit?.existingDeseases?.tb?.duration?.numericValue,
          tbDurationUnit: visit?.existingDeseases?.tb?.duration?.unit,
          tbStatus: visit?.existingDeseases?.tb?.statusOfDisease,

          copdDuration: visit?.existingDeseases?.copd?.duration?.numericValue,
          copdDurationUnit: visit?.existingDeseases?.copd?.duration?.unit,
          copdStatus: visit?.existingDeseases?.copd?.statusOfDisease,

          ildDuration: visit?.existingDeseases?.ild?.duration?.numericValue,
          ildDurationUnit: visit?.existingDeseases?.ild?.duration?.unit,
          ildStatus: visit?.existingDeseases?.ild?.statusOfDisease,

          bronchiectasisDuration: visit?.existingDeseases?.bronchiectasis?.duration?.numericValue,
          bronchiectasisDurationUnit: visit?.existingDeseases?.bronchiectasis?.duration?.unit,
          bronchiectasisStatus: visit?.existingDeseases?.bronchiectasis?.statusOfDisease,

          osaDuration: visit?.existingDeseases?.osa?.duration?.numericValue,
          osaDurationUnit: visit?.existingDeseases?.osa?.duration?.unit,
          osaStatus: visit?.existingDeseases?.osa?.statusOfDisease,

          ibsDuration: visit?.existingDeseases?.ibs?.duration?.numericValue,
          ibsDurationUnit: visit?.existingDeseases?.ibs?.duration?.unit,
          ibsStatus: visit?.existingDeseases?.ibs?.statusOfDisease,

          inflammatoryBowelDiseaseDuration: visit?.existingDeseases?.inflammatoryboweldisease?.duration?.numericValue,
          inflammatoryBowelDiseaseDurationUnit: visit?.existingDeseases?.inflammatoryboweldisease?.duration?.unit,
          inflammatoryBowelDiseaseStatus: visit?.existingDeseases?.inflammatoryboweldisease?.statusOfDisease,

          depressionDuration: visit?.existingDeseases?.depression?.duration?.numericValue,
          depressionDurationUnit: visit?.existingDeseases?.depression?.duration?.unit,
          depressionStatus: visit?.existingDeseases?.depression?.statusOfDisease,

          anxietyDuration: visit?.existingDeseases?.anxiety?.duration?.numericValue,
          anxietyDurationUnit: visit?.existingDeseases?.anxiety?.duration?.unit,
          anxietyStatus: visit?.existingDeseases?.anxiety?.statusOfDisease,

          osaDuration: visit?.existingDeseases?.osa?.duration?.numericValue,
          osaDurationUnit: visit?.existingDeseases?.osa?.duration?.unit,
          osaStatus: visit?.existingDeseases?.osa?.statusOfDisease,

          collagenVascularDiseaseDuration: visit?.existingDeseases?.collagenvasculardisease?.duration?.numericValue,
          collagenVascularDiseaseDurationUnit: visit?.existingDeseases?.collagenvasculardisease?.duration?.unit,
          collagenVascularDiseaseStatus: visit?.existingDeseases?.collagenvasculardisease?.statusOfDisease,

          malignancyOrgan: visit?.existingDeseases?.malignancy?.organ,
          malignancyDuration: visit?.existingDeseases?.malignancy?.duration?.numericValue,
          malignancyDurationUnit: visit?.existingDeseases?.malignancy?.duration?.unit,
          malignancyStatus: visit?.existingDeseases?.malignancy?.statusOfDisease,

          dyslipidemiaDuration: visit?.existingDeseases?.dyslipidemia?.duration?.numericValue,
          dyslipidemiaDurationUnit: visit?.existingDeseases?.dyslipidemia?.duration?.unit,
          dyslipidemiaStatus: visit?.existingDeseases?.dyslipidemia?.statusOfDisease,

          cldDuration: visit?.existingDeseases?.cld?.duration?.numericValue,
          cldDurationUnit: visit?.existingDeseases?.cld?.duration?.unit,
          cldStatus: visit?.existingDeseases?.cld?.statusOfDisease,

          ckdType: visit?.existingDeseases?.ckd?.typeofckd,
          ckdDuration: visit?.existingDeseases?.ckd?.duration?.numericValue,
          ckdDurationUnit: visit?.existingDeseases?.ckd?.duration?.unit,
          ckdStatus: visit?.existingDeseases?.ckd?.statusOfDisease,

          othersDiseaseE: visit?.existingDeseases?.others?.disease,
          othersDurationE: visit?.existingDeseases?.others?.duration?.numericValue,
          othersDurationUnitE: visit?.existingDeseases?.others?.duration?.unit,
          othersStatusE: visit?.existingDeseases?.others?.statusOfDisease,

          //Problem for consultation
          problem: 'Problem for consultation',

          sobDuration: visit?.problemForConsultation?.sob?.duration?.numericValue,
          sobDurationUnit: visit?.problemForConsultation?.sob?.duration?.unit,
          sobStatus: visit?.problemForConsultation?.sob?.statusOfDisease,

          // cough
          coughDuration: visit?.problemForConsultation?.cough?.duration?.numericValue,
          coughDurationUnit: visit?.problemForConsultation?.cough?.duration?.unit,
          coughStatus: visit?.problemForConsultation?.cough?.statusOfDisease,

          // bleeding with cough
          bleedingWithCoughDuration: visit?.problemForConsultation?.bleedingwithcough?.duration?.numericValue,
          bleedingWithCoughDurationUnit: visit?.problemForConsultation?.bleedingwithcough?.duration?.unit,
          bleedingWithCoughStatus: visit?.problemForConsultation?.bleedingwithcough?.statusOfDisease,

          // chest pain
          chestPainDuration: visit?.problemForConsultation?.chestpain?.duration?.numericValue,
          chestPainDurationUnit: visit?.problemForConsultation?.chestpain?.duration?.unit,
          chestPainStatus: visit?.problemForConsultation?.chestpain?.statusOfDisease,

          // wheeze
          wheezeDuration: visit?.problemForConsultation?.wheeze?.duration?.numericValue,
          wheezeDurationUnit: visit?.problemForConsultation?.wheeze?.duration?.unit,
          wheezeStatus: visit?.problemForConsultation?.wheeze?.statusOfDisease,

          // phlegm
          phlegmDuration: visit?.problemForConsultation?.phlagm?.duration?.numericValue,
          phlegmDurationUnit: visit?.problemForConsultation?.phlagm?.duration?.unit,
          phlegmStatus: visit?.problemForConsultation?.phlagm?.statusOfDisease,

          // nasal congestion
          nasalCongestionDuration: visit?.problemForConsultation?.nasalcongestion?.duration?.numericValue,
          nasalCongestionDurationUnit: visit?.problemForConsultation?.nasalcongestion?.duration?.unit,
          nasalCongestionStatus: visit?.problemForConsultation?.nasalcongestion?.statusOfDisease,

          // snoring
          snoringDuration: visit?.problemForConsultation?.snoring?.duration?.numericValue,
          snoringDurationUnit: visit?.problemForConsultation?.snoring?.duration?.unit,
          snoringStatus: visit?.problemForConsultation?.snoring?.statusOfDisease,

          // daytime sleepiness
          dayTimeSleepinessDuration: visit?.problemForConsultation?.daytimesleepiness?.duration?.numericValue,
          dayTimeSleepinessDurationUnit: visit?.problemForConsultation?.daytimesleepiness?.duration?.unit,
          dayTimeSleepinessStatus: visit?.problemForConsultation?.daytimesleepiness?.statusOfDisease,

          // weakness
          weaknessDuration: visit?.problemForConsultation?.weakness?.duration?.numericValue,
          weaknessDurationUnit: visit?.problemForConsultation?.weakness?.duration?.unit,
          weaknessStatus: visit?.problemForConsultation?.weakness?.statusOfDisease,

          // drowsiness
          drowsinessDuration: visit?.problemForConsultation?.drowsiness?.duration?.numericValue,
          drowsinessDurationUnit: visit?.problemForConsultation?.drowsiness?.duration?.unit,
          drowsinessStatus: visit?.problemForConsultation?.drowsiness?.statusOfDisease,

          // lethargy
          lethargyDuration: visit?.problemForConsultation?.lethargy?.duration?.numericValue,
          lethargyDurationUnit: visit?.problemForConsultation?.lethargy?.duration?.unit,
          lethargyStatus: visit?.problemForConsultation?.lethargy?.statusOfDisease,

          // low mood
          lowMoodDuration: visit?.problemForConsultation?.lowmood?.duration?.numericValue,
          lowMoodDurationUnit: visit?.problemForConsultation?.lowmood?.duration?.unit,
          lowMoodStatus: visit?.problemForConsultation?.lowmood?.statusOfDisease,

          // diarrhea
          diarrheaDuration: visit?.problemForConsultation?.diarrhoea?.duration?.numericValue,
          diarrheaDurationUnit: visit?.problemForConsultation?.diarrhoea?.duration?.unit,
          diarrheaStatus: visit?.problemForConsultation?.diarrhoea?.statusOfDisease,

          uncontrolledDiseaseDuration: visit?.problemForConsultation?.uncontrolleddisease[0]?.duration?.numericValue,
          uncontrolledDiseaseDurationUnit: visit?.problemForConsultation?.uncontrolleddisease[0]?.duration?.unit,
          uncontrolledDiseaseStatus: visit?.problemForConsultation?.uncontrolleddisease[0]?.statusOfDisease,
          uncontrolledDiseaseName: visit?.problemForConsultation?.uncontrolleddisease[0]?.name,

          othersDisease: visit?.problemForConsultation?.others?.disease,
          othersDuration: visit?.problemForConsultation?.others?.duration?.numericValue,
          othersDurationUnit: visit?.problemForConsultation?.others?.duration?.unit,
          othersStatus: visit?.problemForConsultation?.others?.statusOfDisease,

          history: 'History',

          allergyType: visit?.importantHistory?.allergy?.typeOfAllergy,
          allergyDuration: visit?.importantHistory?.allergy?.duration?.numericValue,
          allergyDurationUnit: visit?.importantHistory?.allergy?.duration?.unit,
          drugType: visit?.importantHistory?.drugReaction?.typeOfDrug,
          reactionType: visit?.importantHistory?.drugReaction?.typeOfReaction,
          pastSurgeryType: visit?.importantHistory?.pastSurgery?.typeOfSurgery,
          yearOfSurgery: visit?.importantHistory?.pastSurgery?.year,


          pastDisease: visit?.importantHistory?.pastDisease?.typeOfDisease,

          familyHistory: visit?.importantHistory?.familyHistory,
          occupation: visit?.importantHistory?.occupation,
          dustExposureDuration: visit?.importantHistory?.exposure?.dust?.duration?.numericValue,
          dustExposureUnit: visit?.importantHistory?.exposure?.dust?.duration?.unit,
          cottonDustExposureDuration: visit?.importantHistory?.exposure?.cottondust?.duration?.numericValue,
          cottonDustExposureUnit: visit?.importantHistory?.exposure?.cottondust?.duration?.unit,
          woodDustExposureDuration: visit?.importantHistory?.exposure?.wooddust?.duration?.numericValue,
          woodDustExposureUnit: visit?.importantHistory?.exposure?.wooddust?.duration?.unit,
          pigeonExposureDuration: visit?.importantHistory?.exposure?.pigeon?.duration?.numericValue,
          pigeonExposureUnit: visit?.importantHistory?.exposure?.pigeon?.duration?.unit,
          hayExposureDuration: visit?.importantHistory?.exposure?.hay?.duration?.numericValue,
          hayExposureUnit: visit?.importantHistory?.exposure?.hay?.duration?.unit,
          mouldsExposureDuration: visit?.importantHistory?.exposure?.moulds?.duration?.numericValue,
          mouldsExposureUnit: visit?.importantHistory?.exposure?.moulds?.duration?.unit,
          pollenExposureDuration: visit?.importantHistory?.exposure?.pollen?.duration?.numericValue,
          pollenExposureUnit: visit?.importantHistory?.exposure?.pollen?.duration?.unit,
          chemicalExposureDuration: visit?.importantHistory?.exposure?.chemical?.duration?.numericValue,
          chemicalExposureUnit: visit?.importantHistory?.exposure?.chemical?.duration?.unit,
          stoneDustExposureDuration: visit?.importantHistory?.exposure?.stonedust?.duration?.numericValue,
          stoneDustExposureUnit: visit?.importantHistory?.exposure?.stonedust?.duration?.unit,
          otherExposureType: visit?.importantHistory?.exposure?.others?.typeOfExposure,
          otherExposureDuration: visit?.importantHistory?.exposure?.others?.duration?.numericValue,
          otherExposureUnit: visit?.importantHistory?.exposure?.others?.duration?.unit,

          Hospitalization: 'Hospitalization',

          pastHospitalizationYear: visit?.pastHospitalization[0]?.yearOfHospitalization,
          hospitalizationDays: visit?.pastHospitalization[0]?.days,
          hospitalizationReason: visit?.pastHospitalization[0]?.reason,

          statusOfSickness: visit?.statusOfSickness,
          catScore: visit?.catScore,

        };

        //console.log(visit?.existingDeseases?.diabetes?.duration?.numericValue)


        worksheet.addRow(rowData);
        counter++;
      });
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


export const excelFileFeedback = async (req, res) => {
  //
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Feedback Details");

    worksheet.columns = [
      { header: "Sl No", key: "s_no" },
      { header: "Name", key: "name" },
      { header: "PatientId", key: "patientId" },
      { header: "Phone number", key: "phonenumber" },
      { header: "Date", key: "date" },
      { header: "Time", key: "time" },
      { header: "Rating", key: "rating" },
      { header: "Feedback", key: "feedback" },
    ]

    let counter = 1;
    const userData = await FeedbackSchema.find();

    userData.forEach((patient) => {
      const rowData = {
        s_no: counter,
        name: patient.name,
        patientId: patient.patientId,
        phonenumber: patient.phonenumber,
        date: patient.date,
        time: patient.time,
        rating: patient.rating,
        feedback: patient.feedback,
      };

      //console.log(visit?.existingDeseases?.diabetes?.duration?.numericValue)


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