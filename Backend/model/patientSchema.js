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
  image: {
    type: String,
  },
  coordinator: {
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
            hypertension: {
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
            ihd: {
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
            allergicrhinitis: {
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
            hyperuricemia: {
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
            asthama: {
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
            tb: {
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
            copd: {
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
            ild: {
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
            bronchiectasis: {
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
            ibs: {
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
            inflammatoryboweldisease: {
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
            depression: {
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
            anxiety: {
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
            osa: {
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
            collagenvasculardisease: {
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
            dyslipidemia: {
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
            cld: {
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
            ckd: {
              typeofckd: {
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
            sob: {
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
            bleedingwithcough: {
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
            chestpain: {
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
            wheeze: {
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
            phlagm: {
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
            nasalcongestion: {
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
            snoring: {
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
            daytimesleepiness: {
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
            weakness: {
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
            drowsiness: {
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
            lethargy: {
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
            lowmood: {
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
            diarrhoea: {
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
            uncontrolleddisease: {
              type: [
                {
                  name: {
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
                  disease: {
                    type: String,
                    default: "NA",
                  },
                },
              ],
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
            cottondust: {
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
            wooddust: {
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
            pigeon: {
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
            hay: {
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
            moulds: {
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
            pollen: {
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
            chemical: {
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
            stonedust: {
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
              typeOfExposure: {
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
          },
        },
        pastHospitalization: {
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
