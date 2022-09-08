

const validate = function (req, res, next) {

    try {
        data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ msg: "You have not entered any data" })

        let regexFname = /^[a-z.'-]+$/i    // regex for fname
        if (!data.fname.match(regexFname))
            // data.fname
            return res.status(400).send({ msg: "Enter valid FirstName" })

        let regexLname = /^[a-z.'-]+$/i   // regex for lname
        if (!data.lname.match(regexLname))
            return res.status(400).send({ msg: "Enter valid LastName" })

        let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/ // regex for email
        if (!data.email.match(regexEmail))
            return res.status(400).send({ msg: "Enter valid emailId" })

        let regexPassword = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=.!<>?*]).*$/    // regex for password
        if (!data.password.match(regexPassword))
            return res.status(400).send({ msg: "The password must contain atleast One UpperCase , One LowerCase , One Numeric Value and One Special Character." })

        next()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const blogValidator = function (req, res, next) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.send({ msg: "Enter data to create blog" })
        if (!data.body) return res.status(400).send({ msg: "Enter body" })
        if (!data.authorId) return res.status(400).send({ msg: "Enter authorId" })
        if (!data.category) return res.status(400).send({ msg: "Enter category" })
        if (!data.subcategory) return res.status(400).send({ msg: "Enter subcategory" })

        const categoryArr = ["technology", "entertainment", "lifeStyle", "food", "fashion"]
        const categoryData = categoryArr.filter(word => word == data.category)
        if (categoryData.length == 0) return res.send({ msg: "Enter among these category - technology, entertainment, lifeStyle, food, fashion" })

        const tagArray = ["Book", "Friends", "Self help"]
        const tagData = tagArray.filter(word => word == data.tags)
        if (tagData.length == 0) return res.status(400).send({ msg: "Enter among these tags -Book, Friends, Self help" })

        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.validate = validate
module.exports.blogValidator = blogValidator
