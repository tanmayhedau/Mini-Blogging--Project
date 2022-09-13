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

//-------------------create author--------------------------------------------

router.post('/authors',validators.authorValidator,authorController.createAuthor)


// -------------------- login -------------------------------------------------

router.post("/login", authorController.login)


//-------------------create blog----------------------------------------------

router.post('/blogs',auth.authenticate, validators.blogValidator, blogController.createBlog)

//----------------------get-blog----------------------------------------------

router.get('/blogs',auth.authenticate, blogController.getBlog)

// ------------------- update blog -------------------------------------------

router.put('/blogs/:blogId',auth.authenticate, auth.authorise, blogController.getUpdated)


//--------------------Delete-Blog----------------------------------------------

router.delete('/blogs/:blogId' ,auth.authenticate, auth.authorise,blogController.deleteBlog)


//----------------- blogDelete based on category, authorid, tag name, subcategory name, unpublished ------------

router.delete('/blogs', auth.authoriseforDelete, blogController.deleteByQuery)





module.exports = router