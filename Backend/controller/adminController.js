import PatientSchema from '../model/patientSchema.js'

export const patientregistration = async (req, res) => {
  try {
    const {
      name,
      gender,
      patientId,
      contactNumber,
      email,
      bloodGroup,
      password,
      age,
      address,
      state,
      country,
      image,
      consultingDoctor,
      localContactName,
      localContactRelation,
      localContactNumber,
      extistingPatientDiagnosis,
    } = req.body

    // Get current date in the specified format
    const currentDate = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    // Get current time in the specified format
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    const finduser = await PatientSchema.findOne({ patientId: patientId });
    if (finduser) {
      console.log("user exist")
      return res.status(200).json({ message: "ID already exists" });
    }
    else {
      const newUser = await PatientSchema.create({
        name,
        gender,
        patientId,
        contactNumber,
        email,
        bloodGroup,
        password,
        age,
        address,
        state,
        country,
        image,
        consultingDoctor,
        localContactName,
        localContactRelation,
        localContactNumber,
        extistingPatientDiagnosis,
        date: currentDate,
        time: currentTime,
        status: "Registered"
      })

      res
        .status(200)
        .json({ message: 'User created successfully', data: newUser })
    }

    // const newUser = await PatientSchema.create({
    //   name,
    //   gender,
    //   patientId,
    //   contactNumber,
    //   email,
    //   bloodGroup,
    //   password,
    //   age,
    //   address,
    //   state,
    //   country,
    //   image,
    //   consultingDoctor,
    //   localContactName,
    //   localContactRelation,
    //   localContactNumber,
    //   extistingPatientDiagnosis,
    //   date: currentDate,
    //   time: currentTime,
    //   status: "Registered"
    // })

    // res
    //   .status(200)
    //   .json({ message: 'User created successfully', data: newUser })
  }
  catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'An error occurred while creating user' })
  }
}


