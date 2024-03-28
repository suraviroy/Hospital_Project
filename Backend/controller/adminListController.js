import AdminSchema from "../model/adminSchema.js";
import moment from "moment-timezone";

//single admin registeration controller
export const adminregistration = async (req, res) => {
  try {
    const {
      name,
      phNumber,
      educationQualification,
      gender,
      idNumber,
      picture,
    } = req.body;

    // Get the desired time zone (e.g., server's time zone or a specific time zone)
    const desiredTimezone = "Asia/Kolkata"; // Replace with your desired time zone

    // Get the current date and time in the desired time zone
    const currentDate = moment().tz(desiredTimezone).format('MMMM D, YYYY');
    const currentTime = moment().tz(desiredTimezone).format("hh:mm A");

    const newUser = await AdminSchema.create({
      name,
      phNumber,
      educationQualification,
      gender,
      idNumber,
      date: currentDate,
      time: currentTime,
      picture,
    });

    res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred while creating user" });
  }
};

//admin list fetch controller
export const adminList = async (req, res) => {
  try {
    const adminsArray = await AdminSchema.find();

    res.status(200).json(adminsArray);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const adminNames = async (req, res) => {
  try {
    const admins = await AdminSchema.find({}, "name");
    const adminNames = admins.map((admin) => admin.name);
    res.status(200).json(adminNames);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
