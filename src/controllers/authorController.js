const authorModel=require('../model/authorModel')
// creating entries for author
const createAuthor=async function(req,res){
    let data=req.body
    let save=await authorModel.create(data)
    res.send(save)
}






















// exporting createAuthor-----
module.exports.createAuthor=createAuthor