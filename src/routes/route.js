const express = require('express');
const router = express.Router();
const authorController=require('../controllers/authorController')
const blogController = require('../controllers/blogController')

// dummy 
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//-------------------create author------------------
router.post('/createAuthor',authorController.createAuthor)

//-------------------create blog--------------------
router.post('/createBlog', blogController.createBlog)



//==================== blogDetet based on category, authorid, tag name, subcategory name, unpublished =============
router.post('/blogs/delete', blogController.blogDelete)
module.exports = router