const demoPatient = {
  name: "John Doe",
  gender: "Male",
  age: 35,
  patientId: "P123456",
  contactNumber: 1234567890,
  email: "johndoe@example.com",
  bloodGroup: "AB+",
  state: "California",
  country: "USA",
  date: "2024-03-03",
  time: "10:00 AM",
  consultingDoctor: "Dr. Smith",
  localContactName: "Jane Doe",
  localContactRelation: "Spouse",
  localContactNumber: 9876543210,
  existingPatientDiagnosis: "Hypertension",
  status: "Active",
  address: "123 Main St, Anytown",
  password: "hashedpassword123",
  visitCount: [
    {
      visitDate: "2024-01-15",
      visitTime: "11:30 AM",
      existingDeseases: {
        hypothyroidism: {
          duration: {
            numericValue: 2,
            unit: "years",
          },
          statusOfDisease: "Under Control",
        },
        diabetes: {
          duration: {
            numericValue: 5,
            unit: "years",
          },
          statusOfDisease: "Stable",
        },
        malignancy: {
          organ: "Lung",
          duration: {
            numericValue: 1,
            unit: "year",
          },
          statusOfDisease: "In Remission",
        },
        others: {
          disease: "Asthma",
          duration: {
            numericValue: 10,
            unit: "years",
          },
          statusOfDisease: "Controlled",
        },
      },
      problemForConsultation: {
        cough: {
          duration: {
            numericValue: 2,
            unit: "weeks",
          },
          statusOfDisease: "Improving",
        },
        uncontrolledDisease: {
          type: "Hypertension",
          duration: {
            numericValue: 1,
            unit: "month",
          },
          statusOfDisease: "Stable",
        },
        others: {
          disease: "Migraine",
          duration: {
            numericValue: 3,
            unit: "years",
          },
          statusOfDisease: "Under Control",
        },
      },
      importantHistory: {
        allergy: {
          typeOfAllergy: "Peanuts",
          duration: {
            numericValue: 5,
            unit: "years",
          },
        },
        drugReaction: {
          typeOfDrug: "Penicillin",
          typeOfReaction: "Rash",
        },
        pastSurgery: {
          typeOfSurgery: "Appendectomy",
          year: 2010,
        },
        pastDisease: {
          typeOfDisease: "Bronchitis",
        },
        familyHistory: "Heart Disease",
        occupation: "Engineer",
        exposure: {
          dust: {
            duration: {
              numericValue: 2,
              unit: "years",
            },
          },
          others: {
            type: "Chemicals",
            duration: {
              numericValue: 1,
              unit: "year",
            },
          },
        },
      },
      postHospitalization: [
        {
          yearOfHospitalization: 2023,
          days: 5,
          reason: "Pneumonia",
          dischargeCertificate: "Link to certificate",
        },
      ],
      statusOfSickness: "Stable",
      catScore: 7,
    },
  ],
};



const data = [
  {
      "name": "Suravi",
      "gender": "Female",
      "age": 27,
      "patientId": "123",
      "date": "March 03, 2024",
      "time": "11:21 AM",
      "image": "https://www.instyle.com/thmb/UKFx87vh4vv2NFXXJpXNbAWGUlQ=/1500x0/filters:no_upscale():max_bytes(200000):strip_icc()/072523-Alia-Bhatt-Small-Talk-recirc-f10534bb2898449c97afb17931810f06.jpg"
  },
  {
      "name": "Sakshi Srivastava",
      "gender": "Female",
      "patientId": "124",
      "date": "March 01, 2024",
      "time": "06:32 PM",
      "image": "https://www.instyle.com/thmb/UKFx87vh4vv2NFXXJpXNbAWGUlQ=/1500x0/filters:no_upscale():max_bytes(200000):strip_icc()/072523-Alia-Bhatt-Small-Talk-recirc-f10534bb2898449c97afb17931810f06.jpg"
  },
  {
      "name": "Rimeeta Dusgupta",
      "gender": "Female",
      "patientId": "125",
      "date": "March 03, 2024",
      "time": "06:34 PM",
      "image": "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
      "age": 27
  },
  {
      "name": "Ashutosh evening data",
      "gender": "Female",
      "age": 27,
      "patientId": "136",
      "date": "March 03, 2024",
      "time": "07:30 PM",
      "image": "img"
  }
];

// Sort the data first by date, then by time if dates are same
data.sort((a, b) => {
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

// Function to parse time string and convert it into a comparable format
function parseTime(timeStr) {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let hourIn24Format = hours;
  // Check if period exists and convert it to lowercase
  const periodLowerCase = period ? period.toLowerCase() : null;
  if (periodLowerCase === 'pm' && hours !== 12) {
      hourIn24Format += 12;
  } else if (periodLowerCase === 'am' && hours === 12) {
      hourIn24Format = 0;
  }
  return hourIn24Format * 60 + minutes;
}

console.log(data);
