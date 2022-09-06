const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        authorId: {
            type: ObjectId,
            ref: 'author',
            required: true,
        },
        tags: {
            type: [String],
            enum: ["Book", "Friends", "Self help"]
        },
        category: {
            type: String,
            required: true,
            enum: ["technology", "entertainment", "life style", "food", "fashion"]
        },
        subcategory: {
            type: [ String],
            required : true
        },

        deletedAt: {
            type: Date
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        publishedAt: {
            type: Date
        },
    }, { timestamps: true })

module.exports = mongoose.model("blog", blogSchema)