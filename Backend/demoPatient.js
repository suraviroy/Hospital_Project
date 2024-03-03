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