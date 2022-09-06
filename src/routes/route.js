const express = require('express');
const router = express.Router();
const authorController=require('../controllers/authorController')
const blogController = require('../controllers/blogController')

// dummy 
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//-------------------create author------------------
router.post('/authers',authorController.createAuthor)

//-------------------create blog--------------------
router.post('/createBlog', blogController.createBlog)

router.get('/getBlog', blogController.getBlog)



module.exports = router