const authorModel = require('../model/authorModel')
const jwt = require('jsonwebtoken')

// creating entries for author

const createAuthor = async function (req, res) {
   try {
      let data = req.body
      // if (Object.keys(data).length == 0) return res.status(400).send({ msg: "You have not entered any data" })

      // let regexFname = /^[a-z.'-]+$/i    // regex for fname
      // if (!data.fname.match(regexFname))
      //    return res.status(400).send({ msg: "Enter valid FirstName" })

      // let regexLname = /^[a-z.'-]+$/i   // regex for lname
      // if (!data.lname.match(regexLname))
      //    return res.status(400).send({ msg: "Enter valid LastName" })

      // let regexEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/ // regex for email
      // if (!data.email.match(regexEmail))
      //    return res.status(400).send({ msg: "Enter valid emailId " })

      // let regexPassword = /^(?=.*[A-Z])(?=.*[A-Z])(?=.{8,})/ // regex for password
      // if (!data.password.match(regexPassword))
      //    return res.status(400).send({ msg: "Enter valid password" })

      let save = await authorModel.create(data)
      res.send(save)
   }
   catch (error) {
      res.status(500).send({ msg: error.message })
   }
}

const login = async function (req, res) {

   let emailId = req.body.email
   let password = req.body.password

   if (!emailId || !password) return res.send({ msg: "Enter emailId and password" })

   let author = await authorModel.findOne({ email: emailId }, { password: password })
   if (!author) return res.send({ msg: "Invalid email or password" })

   let token = jwt.sign(
      {
         authorId: author._id.toString(),
         project: "Blogging site",
         teamNo: "32"

      },
      "Project -1 Blogging Project"
   )
   res.setHeader("x-api-key", token)
   res.send({ status: true, msg: token })

}





// exporting createAuthor-----
module.exports.createAuthor = createAuthor

module.exports.login = login


