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


    const existingUser = await AdminSchema.findOne({ idNumber });
    if (existingUser) {
      return res.status(400).json({ message: "ID number already exists" });
    }
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
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const totalAdmins = await AdminSchema.countDocuments();

    const adminsArray = await AdminSchema.find()
      .skip((pageNum - 1) * limitNum) 
      .limit(limitNum);

    res.status(200).json({
      currentPage: pageNum,
      totalPages: Math.ceil(totalAdmins / limitNum),
      totalAdmins,
      admins: adminsArray,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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
