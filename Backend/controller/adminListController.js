import AdminSchema from '../model/adminSchema.js'

export const adminregistration = async (req, res) => {
  try {
    //console.log('Request Body:', req.body)
    const { name, phNumber, educationQualification, gender, idNumber, date, time,picture } = req.body
    const newUser = await AdminSchema.create({
      name,
      phNumber,
      educationQualification,
      gender,
      idNumber,
      date,
      time,
      picture
    })

    //console.log('New User:', newUser)

    res
      .status(200)
      .json({ message: 'User created successfully', data: newUser })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'An error occurred while creating user' })
  }
}
