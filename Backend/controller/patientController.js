import PatientSchema from "../model/patientSchema.js";

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
  console.log(patientId, password);
  try {
    const existingUser = await PatientSchema.findOne({ patientId });
    if (!existingUser)
      return res.status(404).json({ status: "error", message: "Patient does not exist" });

    if (password !== existingUser.password)
      return res.status(401).json({ status: "error", message: "Invalid credentials" });

    const { name, gender, age, contactNumber, bloodGroup, image } = existingUser;

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
        image: 1,
        _id: 0,
        consultingDoctor: 1,
        date: 1,
        time: 1,
      }
    );
    res.status(200).json(registeredPatientsName);
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

export const PatientsAllAppointments = async (req, res) => {
  try {
    const id = req.params.id;

    const patientExists = await PatientSchema.exists({ patientId: id });
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientInfo = await PatientSchema.findOne(
      { patientId: id },
      {
        name: 1,
        patientId: 1,
        consultingDoctor: 1,
        _id: 0,
      }
    );

    const patientAppointments = await PatientSchema.findOne(
      { patientId: id },
      { visitCount: 1, _id: 0 }
    );

    const allAppointments = patientAppointments.visitCount.map((visit) => ({
      visitDate: visit.visitDate,
      visitTime: visit.visitTime,
    }));
    res
      .status(200)
      .json({ patientInfo: patientInfo, appointments: allAppointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
