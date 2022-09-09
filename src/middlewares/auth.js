
const jwt = require('jsonwebtoken')
const blogModel = require('../model/blogModel')

const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]

        if (!token) return res.status(401).send({ msg: "Token must be present" })

        decodedtoken = jwt.verify(token, "Project -1 Blogging Project")
        if (!decodedtoken) return res.send({ msg: "Invalid token" })

        next()
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

const authorise = async function (req, res, next) {
try
    {let blogId = req.params.blogId

    if (blogId.length == 24) {

        let data = await blogModel.findById(blogId)    //search doc with that given blogId
        if (data == null) return res.send({ msg: "No blog available with this BlogId" })
        let loggedInAuthor = data.authorId.toString()  //person who want to access to resource
        let priviledgedAuthor = decodedtoken.authorId   //person who is loggedIn (has token)

        if (loggedInAuthor != priviledgedAuthor) return res.status(403).send({ msg: "You are not authorised for this operation" })
        next()
    }
    else {
        return res.status(400).send({ msg: "Invalid length of blogId" })
    }}catch(error){
        res.status(500).send(error.message)
    }
}


const authoriseforDelete = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(401).send({ msg: "Token must be present" })

        decodedtoken = jwt.verify(token, "Project -1 Blogging Project")
        if (!decodedtoken) return res.send({ msg: "Invalid token" })

        let priviledgedAuthor = decodedtoken.authorId      //person who is loggedIn (has token)
        let data = req.query

        // length of data object must be grater than Zero
        if (Object.keys(data).length == 0) return res.status(400).send({ msg: "Please enter the filter for deletion" })

        //destructure the array of variable of data
        const { category, authorId, tags, subcategory, isPublished } = data
        let mainData = {}
        if (category) { mainData.category = category }
        if (tags) { mainData.tags = tags }
        if (subcategory) { mainData.subcategory = subcategory }
        if (isPublished) { mainData.isPublished = isPublished }
        if (authorId) { mainData.authorId = authorId }

        // must be assign at least one items in the main data
        if (Object.keys(mainData).length == 0) return res.send({ status: false, msg: "please enter the valid keys" })

        mainData.isDeleted = false
        mainData.isPublished = true

        let result = await blogModel.findOne(mainData)
        if (result == null) return res.status(404).send({ msg: "No data found to be deleted" })

        const id = result.authorId.toString()          //person who want to access to resource

        if (priviledgedAuthor != id) return res.send({ msg: "You can not other author's data" })

        next()

    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}
module.exports.authenticate = authenticate
module.exports.authorise = authorise
module.exports.authoriseforDelete = authoriseforDelete

