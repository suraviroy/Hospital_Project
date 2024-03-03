import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  patientId: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  consultingDoctor: {
    type: String,
  },
  localContactName: {
    type: String,
  },
  localContactRelation: {
    type: String,
  },
  localContactNumber: {
    type: Number,
  },
  extistingPatientDiagnosis: {
    type: String,
  },
  status: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
  visitCount: {
    type: [
      {
        visitDate: {
          type: String,
        },
        visitTime: {
          type: String,
        },
        existingDeseases: {
          type: {
            hypothyroidism: {
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
              statusOfDisease: {
                type: String,
              },
            },
            diabetes: {
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
              statusOfDisease: {
                type: String,
              },
            },
            malignancy: {
              organ: {
                type: String,
              },
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
              statusOfDisease: {
                type: String,
              },
            },
            others: {
              disease: {
                type: String,
              },
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
              statusOfDisease: {
                type: String,
              },
            },
          },
        },
        problemForConsultation: {
          type: {
            cough: {
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
              statusOfDisease: {
                type: String,
              },
            },
            uncontrolledDisease: {
              type: {
                type: String,
              },
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
              statusOfDisease: {
                type: String,
              },
            },
            others: {
              disease: {
                type: String,
              },
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
              statusOfDisease: {
                type: String,
              },
            },
          },
        },
        importantHistory: {
          allergy: {
            typeOfAllergy: {
              type: String,
            },
            duration: {
              numericValue: {
                type: Number,
              },
              unit: {
                type: String,
              },
            },
          },
          drugReaction: {
            typeOfDrug: {
              type: String,
            },
            typeOfReaction: {
              type: String,
            },
          },
          pastSurgery: {
            typeOfSurgery: {
              type: String,
            },
            year: {
              type: Number,
            },
          },
          pastDisease: {
            typeOfDisease: {
              type: String,
            },
          },
          familyHistory: {
            type: {
              String,
            },
          },
          occupation: {
            type: String,
          },
          exposure: {
            dust: {
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
            },
            others: {
              type: String,
              duration: {
                numericValue: {
                  type: Number,
                },
                unit: {
                  type: String,
                },
              },
            },
          },
        },
        postHospitalization: {
          type: [
            {
              yearOfHospitalization: {
                type: Number,
              },
              days: {
                type: Number,
              },
              reason: {
                type: String,
              },
              dischargeCertificate: {
                type: String,
              },
            },
          ],
        },
        statusOfSickness: {
          type: String,
        },
        catScore: {
          type: Number,
        },
      },
    ],
  },
});

const PatientSchema = mongoose.model("PatientList", patientSchema);
export default PatientSchema;
