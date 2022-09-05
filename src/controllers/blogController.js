const blogModel = require('../model/blogModel')
const authorModel = require('../model/authorModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const createBlog = async function (req, res) {
    try {
        let data = req.body
    let authorId = req.body.authorId
    let isValid = mongoose.Types.ObjectId.isValid(authorId)
    if (isValid == false) return res.send({ msg: "Invalid length of authorId" })
    
    let result = await authorModel.findById(authorId)

    if (!result) return res.send({ msg: "Enter Vaild AuthorId" })
    
        let finalData = await blogModel.create(data)
        res.status(201).send({ data: finalData })
    
    }
    catch(error){
        res.status(500).send({msg :error.message})
    }
}

const getBlog = async function(req,res){
    let 
}

module.exports.createBlog = createBlog