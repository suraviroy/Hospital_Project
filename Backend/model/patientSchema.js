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
  status: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
  image :{
    type: String,
  },
  coordinator :{
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
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
              statusOfDisease: {
                type: String,
                default: "NA",
              },
            },
            diabetes: {
              duration: {
                numericValue: {
                  type: Number,
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
              statusOfDisease: {
                type: String,
                default: "NA",
              },
            },
            malignancy: {
              organ: {
                type: String,
                default: "NA",
              },
              duration: {
                numericValue: {
                  type: Number,
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
              statusOfDisease: {
                type: String,
                default: "NA",
              },
            },
            others: {
              disease: {
                type: String,
                default: "NA",
              },
              duration: {
                numericValue: {
                  type: Number,
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
              statusOfDisease: {
                type: String,
                default: "NA",
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
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
              statusOfDisease: {
                type: String,
                default: "NA",
              },
            },
            uncontrolledDisease: {
              type: {
                type: String,
                default: "NA",
              },
              duration: {
                numericValue: {
                  type: Number,
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
              statusOfDisease: {
                type: String,
                default: "NA",
              },
            },
            others: {
              disease: {
                type: String,
                default: "NA",
              },
              duration: {
                numericValue: {
                  type: Number,
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
              statusOfDisease: {
                type: String,
                default: "NA",
              },
            },
          },
        },
        importantHistory: {
          allergy: {
            typeOfAllergy: {
              type: String,
              default: "NA",
            },
            duration: {
              numericValue: {
                type: Number,
                default: 0,
              },
              unit: {
                type: String,
                default: "NA",
              },
            },
          },
          drugReaction: {
            typeOfDrug: {
              type: String,
              default: "NA",
            },
            typeOfReaction: {
              type: String,
              default: "NA",
            },
          },
          pastSurgery: {
            typeOfSurgery: {
              type: String,
              default: "NA",
            },
            year: {
              type: Number,
              default: 0,
            },
          },
          pastDisease: {
            typeOfDisease: {
              type: String,
              default: "NA",
            },
          },
          familyHistory: {
            type: String,
            default: "NA",
          },
          occupation: {
            type: String,
            default: "NA",
          },
          exposure: {
            dust: {
              duration: {
                numericValue: {
                  type: Number,
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
                },
              },
            },
            others: {
              type: String,
              default: "NA",
              duration: {
                numericValue: {
                  type: Number,
                  default: 0,
                },
                unit: {
                  type: String,
                  default: "NA",
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
                default: 0,
              },
              days: {
                type: Number,
                default: 0,
              },
              reason: {
                type: String,
                default: "NA",
              },
              dischargeCertificate: {
                type: String,
                default: "NA",
              },
            },
          ],
        },
        statusOfSickness: {
          type: String,
          default: "NA",
        },
        catScore: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});

const PatientSchema = mongoose.model("PatientList", patientSchema);
export default PatientSchema;
