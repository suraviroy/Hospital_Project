import AdminSchema from '../model/adminSchema.js'

export const registration = async (req, res) => {
  try {
    // Ensure that request body contains the required fields
    console.log('Request Body:', req.body)

    // Extract data from request body
    const { name, age } = req.body

    // Create a new user using Mongoose model
    const newUser = await AdminSchema.create({ name, age })

    // Log the newly created user
    console.log('New User:', newUser)

    // Respond with success message and data
    res
      .status(200)
      .json({ message: 'User created successfully', data: newUser })
  } catch (error) {
    // Log any errors that occur during user creation
    console.error('Error creating user:', error)

    // Respond with an error message
    res.status(500).json({ error: 'An error occurred while creating user' })
  }
}
