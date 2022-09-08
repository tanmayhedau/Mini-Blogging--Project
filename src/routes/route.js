const express = require('express');
const router = express.Router();
const authorController=require('../controllers/authorController')
const blogController = require('../controllers/blogController')
const auth = require('../middlewares/auth')
const validators = require('../validators/validator')


// dummy 
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//-------------------create author------------------
router.post('/authors',validators.validate,authorController.createAuthor)

//-------------------create blog--------------------
router.post('/createBlog',auth.authenticate, blogController.createBlog)

//----------------------get-blog-------------------
router.get('/getBlog',auth.authenticate, blogController.getBlog)

// ------------------- update blog --------------
router.put('/blogs/:blogId',auth.authenticate, auth.authorise, blogController.getUpdated)


//--------------------Delete-Blog--------------

router.delete('/deleteBlog/:blogId' ,auth.authenticate, auth.authorise,blogController.deleteBlog)


//==================== blogDetet based on category, authorid, tag name, subcategory name, unpublished =============
router.post('/blogs',auth.authoriseforDelete, blogController.deleteByQuery)


// -------------------- login --------------------------
router.post("/login", authorController.login)

module.exports = router