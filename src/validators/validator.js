const authorModel = require("../model/authorModel")


const validate = async function (req, res, next) {

    try {
        data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ msg: "You have not entered any data" })

        let regexFname = /^[a-z.'-]+$/i    // regex for fname
        if (!data.fname.match(regexFname))
            return res.status(400).send({ status : false, msg: "Enter valid FirstName in valid format" })

        let regexLname = /^[a-z.'-]+$/i   // regex for lname
        if (!data.lname.match(regexLname))
            return res.status(400).send({ status : false, msg: "Enter valid LastName in valid format" })

        let title = ["Mr", "Mrs", "Miss"]    // if wrong title entered
        let inputTitle = title.filter(word => word == data.title)
        if (inputTitle.length == 0) return res.status(400).send({ status : false, msg: "Enter a valid title -Mr, Mrs, Miss" })

        let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/ // regex for email
        if (!data.email.match(regexEmail))
            return res.status(400).send({ status : false, msg: "Enter valid emailId" })

        let validEmail = await authorModel.findOne({email : data.email})  // if author is registered
        if(validEmail) return res.status(400).send({status : false, msg : "Author already registered with this email , please login"})

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
        if (!data.body) return res.status(400).send({status : false, msg: "Enter body" })
        if (!data.authorId) return res.status(400).send({status : false, msg: "Enter authorId" })
        if (!data.category) return res.status(400).send({status : false, msg: "Enter category" })

        const categoryArr = ["technology", "entertainment", "lifeStyle", "food", "fashion"]
        const categoryData = categoryArr.filter(word => word == data.category)
        if (categoryData.length == 0) return res.send({status : false, msg: "Enter among these category - technology, entertainment, lifeStyle, food, fashion" })

        const tagArray = ["Book", "Friends", "Self help", "Communication"]
        const tagData = tagArray.filter(word => word == data.tags)
        if (tagData.length == 0) return res.status(400).send({status : false, msg: "Enter among these tags -Book, Friends, Self help,Communication" })

        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.validate = validate
module.exports.blogValidator = blogValidator
