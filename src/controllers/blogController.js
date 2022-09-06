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

const blogDelete=async function(req,res){
//     ### DELETE /blogs?queryParams
// - Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// - If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure)
try{

const data=req.query
const deleteData=await blogModel.updateMany(data,{isDeleted:true},{new:true})
if(deleteData.matchedCount==0) return res.status(404).send({status:404,msg:"data not found"})
res.send(deleteData)
}catch(error){
    res.status(500).send({status:false,msg:error.message})
}
}

module.exports.createBlog = createBlog
module.exports.blogDelete = blogDelete