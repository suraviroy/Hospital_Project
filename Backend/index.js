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

const app = express()
dotenv.config()

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use(express.json())



//======================logs==================================================================
const formatDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  const time = now.toLocaleTimeString("en-GB", { hour12: false }); // Format: HH:MM:SS
  return { date, time };
};

const logFilePath = path.join("C:/hackathon/Hospital/Hospital_Project/Backend", "logs.txt");
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
const logFormat = 'Backend -> Time - :time , Date - :date , IP: :ip  , Method: :method  , URL: :url  , Status: :status , Response Time: :response-time ms\n';


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
