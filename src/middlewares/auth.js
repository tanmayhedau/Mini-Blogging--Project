
const jwt =require('jsonwebtoken')
const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')

const validate = async function (req,res,next){
    let token = req.headers["x-api-key"]
    if(!token) return res.status(401).send({msg : "Token must be present"})
    next()
}



module.exports.validate = validate