const blogModel = require('../model/blogModel')
const authorModel = require('../model/authorModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let authorId = data.authorId
        let isValid = mongoose.Types.ObjectId.isValid(authorId)
        if (isValid == false) return res.send({ msg: "Invalid length of authorId" })

        let result = await authorModel.findById(authorId)

        if (!result) return res.status(400).send({status: false, msg: "Enter registered AuthorId only!!" })
        if(data.isPublished == true || data.isDeleted == true){
            data.publishedAt = Date.now()
            data.deletedAt = Date.now()
        }

        let finalData = await blogModel.create(data)
        return res.status(201).send({status: true, data: finalData })

    }
    catch (error) {
        return res.status(500).send({ status: false,msg: error.message })
    }
}


//---------------------------getBlog-----------------

const getBlog = async function (req, res) {
    try {
        let data = req.query;
        let filter = {
            isdeleted: false,
            isPublished: true,

        };

        const { category, subcategory, tags, authorId , isPublished} = data

        if (category) {
            let verifyCategory = await blogModel.findOne({ category: category })
            if (!verifyCategory) {
                return res.status(400).send({ status: false, msg: 'No blogs in this category exist' })
            }
        }

        if (authorId ) {
            if(!req.query.authorId ) return res.status(400).send({status: false,msg : "authorId cant be null"})
            let isValid = mongoose.Types.ObjectId.isValid(authorId)
            if (isValid == false) return res.status(400).send({ status: false,msg: "Invalid length of authorId" })

            let verifyauthorId = await blogModel.findOne({ authorId: authorId })
            if (!verifyauthorId) {
                return res.status(404).send({ status: false, msg: 'No blogs with this authorId exist' })
            }
        }

        if (tags) {
            let verifyTags = await blogModel.findOne({ tags: tags })
            if (!verifyTags) {
                return res.status(400).send({ status: false, msg: 'No blogs in this category exist' })
            }
        }

        if (subcategory) {
            let verifysubcategory = await blogModel.findOne({ subcategory: subcategory })
            if (!verifysubcategory) {
                return res.status(400).send({ status: false, msg: 'No blogs in this subcategory exist' })
            }
        }

        filter = { ...data, ...filter }
        let getSpecificBlogs = await blogModel.find(filter);

        if (getSpecificBlogs.length == 0) {
            return res.status(400).send({ status: false, data: "No blogs can be found" });
        }
        else {
            return res.status(201).send({ status: true, data: getSpecificBlogs });
        }
    }
    catch (error) {
       return res.status(500).send({ status: false, err: error.message });
    }
};


//---------------------------Update Blog---------------


const getUpdated = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({status: false, msg: "You have not entered any data to modify" })

        if(data.title.trim().length ==0) return res.status(400).send({ status : false, msg :"Enter title"})
        let blogId = req.params.blogId
        let user = await blogModel.findById({ _id: blogId })

        if (!user || user.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Blog data not found" })
        }
        let result = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { publishedAt: new Date(), isPublished: true, title: data.title, body: data.body }, $push: { subcategory: data.subcategory, tags: data.tags} }, { new: true})
        return res.status(201).send({ status: true, msg: result })
    } catch (error) {
       return res.status(500).send({ status: false, error: error.message })
    }
}

//--------------------------delete-phase-1---------------------------------

const deleteBlog = async function (req, res) {
    try {

        let blogId = req.params.blogId
        console.log(blogId)

        let blog = await blogModel.findById(blogId)

        if (!blog  || blog.isDeleted == true) return res.status(404).send({status: false,msg :"blog document doesn't exists"})
    
        let data = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true , deletedAt : Date.now()}, { new: true })
       
        return res.status(201).send({ status: 201, msg: `blog has been deleted successfully` })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}


//--------------------------delete-phase-2----------------------------------


const deleteByQuery = async function (req, res) {
    try {

        const data = req.query
        const deleteData = await blogModel.updateMany(data, { isDeleted: true }, { new: true })
        if (deleteData.matchedCount == 0) return res.status(404).send({ status: 404, msg: "data not found" })
        return res.status(201).send({status : true, msg :deleteData})

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.getUpdated = getUpdated
module.exports.deleteBlog = deleteBlog
module.exports.deleteByQuery = deleteByQuery
