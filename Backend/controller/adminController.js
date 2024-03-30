import PatientSchema from "../model/patientSchema.js";
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
    patient.visitCount.push(newVisit);
    patient.status = "Updated";

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


export const excelFile = async (req, res) => {

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
      { header: "Visit Date", key: "visitDate" },
      { header: "Visit Time", key: "visitTime" },

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
        localContactNumber: visit.localContactNumber,
        visitDate: visit?.visitCount[0]?.visitDate,
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

        allergicRhinitisDuration: visit?.visitCount[0]?.existingDeseases?.allergicRhinitis?.duration?.numericValue,
        allergicRhinitisDurationUnit: visit?.visitCount[0]?.existingDeseases?.allergicRhinitis?.duration?.unit,
        allergicRhinitisStatus: visit?.visitCount[0]?.existingDeseases?.allergicRhinitis?.statusOfDisease,

        hyperuricemiaDuration: visit?.visitCount[0]?.existingDeseases?.ihd?.duration?.numericValue,
        hyperuricemiaDurationUnit: visit?.visitCount[0]?.existingDeseases?.ihd?.duration?.unit,
        hyperuricemiaStatus: visit?.visitCount[0]?.existingDeseases?.ihd?.statusOfDisease,
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