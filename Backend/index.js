import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import adminListRouter from './routes/adminListRoute.js'
import adminRouter from './routes/adminRoute.js'
import patientRouter from './routes/patientRoute.js'
import morgan from "morgan";
import fs from "fs";
import path from "path";
//import { fileURLToPath } from "url";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";


const app = express()
dotenv.config()

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use(express.json())



//======================logs=================================================================
const formatDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  const time = now.toLocaleTimeString("en-GB", { hour12: false }); // Format: HH:MM:SS
  return { date, time };
};

const logFilePath = path.join("./", "logs.txt");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// Define Morgan tokens
morgan.token("date", () => formatDateTime().date); // DD/MM/YYYY
morgan.token("time", () => formatDateTime().time); // HH:MM:SS
//morgan.token("ip", (req) => req.ip);

morgan.token("ip", (req) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // If IP is localhost, default to 27.0.0.1
  if (ip === "::1" || ip === "127.0.0.1") return "27.0.0.1";

  // Extract first part of the IP and format it like XX.0.0.1
  const firstPart = ip.split(".")[0] || "27";
  return `${firstPart}.0.0.1`;
});

// Define Log Format
const logFormat = 'B -> :time, :date, :ip, :method, :url, :status, :response-time ms\n';


// Use Morgan middleware
app.use(morgan(logFormat, { stream: logStream })); // Save logs to file
app.use(morgan(logFormat)); // Also print logs in console

app.post("/log", (req, res) => {
  const { message } = req.body;

  if (!message) {
      return res.status(400).json({ error: "Message is required" });
  }

  const logEntry = `${new Date().toLocaleString("en-GB")} - ${message}\n`;

  // Append log to file
  fs.appendFile(logFilePath, `${message}\n`, (err) => {
      if (err) {
          console.error("Error writing to log file:", err);
          return res.status(500).json({ error: "Failed to save log" });
      }
      res.json({ success: true, message: "Log saved successfully" });
  });
});

//======================logs==================================================================

//-----------------------------------File upload to backend--------------------------------------------------

// Ensure 'uploads' directory exists
const uploadDir = path.join("./", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = uuidv4() + ext; // Generate unique filename
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join("./", "uploads")));



//--------------------------------------------Files Get----------------------------------------------------------

// Serve uploaded files statically (for direct access)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API to fetch file by name
app.get("/getfile/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(process.cwd(), "uploads", fileName);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});


//==================================================Artifical device===================================================================
import ArtificialDevice from "./model/artificialDeviceSchema.js";

app.post('/adddevice', async (req, res) => {
  try {
    const { date, time, patientId, details, device, expdate } = req.body;

    // Create a new document
    const newDevice = new ArtificialDevice({
      date,
      time,
      patientId,
      details,
      device,
      expdate
    });

    // Save it to the database
    const savedDevice = await newDevice.save();
    res.status(201).json({ message: 'Device details added successfully', data: savedDevice });
  } catch (error) {
    console.error('Error adding device:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

import moment from 'moment'; 

app.get('/getdevice/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find devices by patientId
    const devices = await ArtificialDevice.find({ patientId: id });

    if (!devices || devices.length === 0) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Calculate difference for each device
    const deviceWithExpiryInfo = devices.map(device => {
      const startDate = moment(device.date, 'YYYY-MM-DD');
      const expiryDate = moment(device.expdate, 'YYYY-MM-DD');

      if (!startDate.isValid() || !expiryDate.isValid()) {
        return {
          ...device._doc,
          expiryInfo: 'Invalid date format'
        };
      }

      let yearsLeft = expiryDate.diff(startDate, 'years');
      startDate.add(yearsLeft, 'years');

      let monthsLeft = expiryDate.diff(startDate, 'months');
      startDate.add(monthsLeft, 'months');

      let daysLeft = expiryDate.diff(startDate, 'days');

      return {
        ...device._doc,
        expiryInfo: {
          yearsLeft,
          monthsLeft,
          daysLeft
        }
      };
    });

    res.status(200).json({ deviceWithExpiryInfo });
  } catch (error) {
    console.error('Error fetching device:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

//======================================================================================================================================


//creating the connect function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')
  } catch (error) {
    throw error
  }
}

//if mongoDB is disconnected, then handle the error
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB is disconnected')
})

//define middleware below
app.use('/adminListRouter', adminListRouter)
app.use('/adminRouter', adminRouter)
app.use('/patientRouter',patientRouter)

//listening port
app.listen(8080, () => {
  connect()
  console.log('Connected to backend')
})
