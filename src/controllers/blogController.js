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
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}




const getBlog = async function (req, res) {
    try {
        let data = req.query;
        let filter = {
            isdeleted: false,
            isPublished: true,

        };

        const { category, subcategory, tags, authorId } = data

        if (category) {
            let verifyCategory = await blogModel.findOne({ category: category })
            if (!verifyCategory) {
                return res.status(400).send({ status: false, msg: 'No blogs in this category exist' })
            }
        }

        if (authorId) {
            let isValid = mongoose.Types.ObjectId.isValid(authorId)
            if (isValid == false) return res.send({ msg: "Invalid length of authorId" })

            let verifyauthorId = await blogModel.findOne({ authorId: authorId })
            if (!verifyauthorId) {
                return res.status(400).send({ status: false, msg: 'No blogs with this authorId exist' })
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
                return res.status(400).send({ status: false, msg: 'No blogs in this category exist' })
            }
        }
        let getSpecificBlogs = await blogModel.find(filter);

        if (getSpecificBlogs.length == 0) {
            return res.status(400).send({ status: false, data: "No blogs can be found" });
        }
        else {
            console.log(getSpecificBlogs.length)
            return res.status(200).send({ status: true, data: getSpecificBlogs });
        }
    }
    catch (error) {
        res.status(500).send({ status: false, err: error.message });
    }
};


module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
