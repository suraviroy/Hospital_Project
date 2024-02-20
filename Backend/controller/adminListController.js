import AdminSchema from '../model/adminSchema.js'

export const registration = async (req, res) => {
  //console.log(req.body)
  try {
    // const doctorName = req.body.doctorName
    const name = req.body.name
    const age = req.body.age
    // const contactNumber = req.body.contactNumber
    // const email = req.body.email
    // const nagency = req.body.nagency
    // const idNumber = req.body.idNumber
    // const aadharNumber = req.body.aadharNumber
    // const pin = req.body.pin
    // const address = req.body.address
    // const guardianName = req.body.guardianName
    // const guardianRelation = req.body.guardianRelation
    // const storU = req.body.storU
    // const storP = req.body.storP
    // const lat = req.body.lat
    // const lon = req.body.lon
    // const imageC = req.body.imageC
    // const imageP = req.body.imageP
    // const state = req.body.state
    // const statuss = req.body.statuss
    //   //const finduser = await Student.findOne({ studentid: studentid });

    const newuser = await AdminSchema.create({
    //   doctorName,
      name,
      age
    //   contactNumber,
    //   email,
    //   nagency,
    //   idNumber,
    //   aadharNumber,
    //   pin,
    //   address,
    //   guardianName,
    //   guardianRelation,
    //   storU,
    //   storP,
    //   lat,
    //   lon,
    //   imageC,
    //   imageP,
    //   state,
    //   statuss
    })
    //   //console.log(req.body);
    console.log(newuser)
    //   //res.json(req.body)
    res.status(200).json({ message: 'fetch', data: newuser })
  } catch (error) {
    console.log(error)
  }
}