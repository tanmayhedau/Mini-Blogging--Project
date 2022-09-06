const authorModel=require('../model/authorModel')
// creating entries for author

const createAuthor=async function(req,res){
   try{
    let data=req.body
    let save=await authorModel.create(data)
    res.send(save)
   }
   catch(error){
    res.status(500).send({msg : error.message})
   }
}






















// exporting createAuthor-----
module.exports.createAuthor=createAuthor