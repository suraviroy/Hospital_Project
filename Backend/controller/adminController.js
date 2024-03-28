import PatientSchema from "../model/patientSchema.js";
import moment from "moment-timezone";

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
