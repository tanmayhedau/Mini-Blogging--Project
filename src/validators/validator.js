const authorModel = require("../model/authorModel")


const authorValidator = async function (req, res, next) {

    try {
        data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({status : false, msg: "You have not entered any data" })

        if(!data.fname) return res.status(400).send({status : false, msg : "enter firstname"})
        let regexFname = /^[a-z.'-]+$/i    // regex for fname
        if (!data.fname.match(regexFname))
            return res.status(400).send({ status : false, msg: "Enter FirstName in valid format" })

            if(!data.lname) return res.status(400).send({status : false, msg : "enter LastName"})
        let regexLname = /^[a-z.'-]+$/i   // regex for lname
        if (!data.lname.match(regexLname))
            return res.status(400).send({ status : false, msg: "Enter LastName in valid format" })

            if(!data.title) return res.status(400).send({status : false, msg : "enter title"})
        let title = ["Mr", "Mrs", "Miss"]    // if wrong title entered
        let inputTitle = title.filter(word => word == data.title)
        if (inputTitle.length == 0) return res.status(400).send({ status : false, msg: "Enter a valid title -Mr, Mrs, Miss" })

        if(!data.email) return res.status(400).send({status : false, msg : "enter email"})
        let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/ // regex for email
        if (!data.email.match(regexEmail))
            return res.status(400).send({ status : false, msg: "Enter valid emailId" })

        let validEmail = await authorModel.findOne({email : data.email})  // if author is registered
        if(validEmail) return res.status(400).send({status : false, msg : "Author already registered with this email , please login"})

        if(!data.password) return res.status(400).send({status : false, msg : "enter password"})
        let regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/        // regex for password
        if (!data.password.match(regexPassword))
            return res.status(400).send({status : false, msg: "The password must contain atleast One UpperCase , One LowerCase , One Numeric Value and One Special Character." })

        next()
    } catch (error) {
         return res.status(500).send({ status: false, msg: error.message })
    }
}

const blogValidator = function (req, res, next) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({status : false,msg: "Enter data to create blog" })
        if (!data.title) return res.status(400).send({status : false, msg: "Enter title" })
        if (!data.body) return res.status(400).send({status : false, msg: "Enter body" })
        if (!data.authorId) return res.status(400).send({status : false, msg: "Enter authorId" })
        if (!data.category) return res.status(400).send({status : false, msg: "Enter category" })

        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.authorValidator = authorValidator
module.exports.blogValidator = blogValidator
