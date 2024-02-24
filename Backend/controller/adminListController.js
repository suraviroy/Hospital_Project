import AdminSchema from '../model/adminSchema.js'

//single admin registeration controller
export const adminregistration = async (req, res) => {
  try {
    const {
      name,
      phNumber,
      educationQualification,
      gender,
      idNumber,
      picture
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

    const newUser = await AdminSchema.create({
      name,
      phNumber,
      educationQualification,
      gender,
      idNumber,
      date: currentDate,
      time: currentTime,
      picture
    })

    res
      .status(200)
      .json({ message: 'User created successfully', data: newUser })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'An error occurred while creating user' })
  }
}

//admin list fetch controller
export const adminList = async (req, res) => {
  try {
    const adminsArray = await AdminSchema.find()

    res.status(200).json(adminsArray)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
