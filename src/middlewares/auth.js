
const jwt = require('jsonwebtoken')
const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')

const authenticate = async function (req, res, next) {
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

    let blogId = req.params.blogId

    let data = await blogModel.findById(blogId)    //search doc with that given blogId

    let loggedInAuthor = data.authorId.toString()  //person who want to access to resource

    let priviledgedAuthor = decodedtoken.authorId   //person who is loggedIn (has token)

    if (loggedInAuthor != priviledgedAuthor) return res.status(403).send({ msg: "You are not authorised for this operation" })
    next()
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise
