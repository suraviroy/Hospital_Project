import PatientSchema from "../model/patientSchema.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await PatientSchema.findOne({ email });
    if (!existingUser)
      return res.json({ status: "error", message: "Patient does not exist" });

    if (password != existingUser.password)
      return res.json({ status: "error", message: "Invalid credentials" });

    res.status(200).json({ status: "success", existingUser });
  } catch (error) {
    res.status(500).json(error);
  }
};
