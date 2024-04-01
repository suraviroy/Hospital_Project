import PatientSchema from "../model/patientSchema.js";

export const login = async (req, res) => {
  const { patientId, password } = req.body;

  try {
    const existingUser = await PatientSchema.findOne({ patientId });
    if (!existingUser)
      return res.json({ status: "error", message: "Patient does not exist" });

    if (password != existingUser.password)
      return res.json({ status: "error", message: "Invalid credentials" });

    const { patientId, name, gender, age, contactNumber, bloodGroup, image } =
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
    res.status(500).json(error);
  }
};
