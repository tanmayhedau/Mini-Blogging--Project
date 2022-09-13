const authorModel = require('../model/authorModel')
const jwt = require('jsonwebtoken')

// creating entries for author

const createAuthor = async function (req, res) {
   try {
      let data = req.body
      let save = await authorModel.create(data)
     return res.status(201).send({status : true, data :save})
   }
   catch (error) {
      return res.status(500).send({ msg: error.message })
   }
}

// login for author

const login = async function (req, res) {

   let emailId = req.body.email
   let password = req.body.password

   if (!emailId || !password) return res.status(400).send({ status : false, msg: "Enter emailId and password" })

   let author = await authorModel.findOne({ email: emailId , password: password })
   if (!author) return res.status(400).send({status : false, msg: "Invalid email or password" })

   let token = jwt.sign(
      {
         authorId: author._id.toString(),
         project: "Blogging site",
         teamNo: "32"

      },
      "Project -1 Blogging Project"
      
   )
   res.setHeader("x-api-key", token)
  return res.status(201).send({ status: true, data : {"token" : token} })

}





// exporting createAuthor-----
module.exports.createAuthor = createAuthor

// ecporting login -----------
module.exports.login = login


