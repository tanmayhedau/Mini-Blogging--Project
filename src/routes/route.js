const express = require('express');
const router = express.Router();
const authorController=require('/controller/authorController')

// dummy 
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//-------------------create author------------------
router.post('/authers',authorController.createAuthor)


module.exports = router