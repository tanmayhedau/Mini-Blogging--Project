const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
     fname:{
        type : String ,
        match : [/^[a-z ,.'-]+$/i],  // regex for fname
        required : true
     },
      lname: {
        type : String ,
        match : [/^[a-z ,.'-]+$/i], // regex for lname
        required : true
      }, 
      title: {
        type : String ,
        required : true,
        enum : ["Mr", "Mrs", "Miss"]
      }, 
      email: {
        type : String,
        unique: true,
        match: [/^(?:[a-zA-Z]{3})\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/], // regex for email
        required: true
      }, 
        password: {
            type : String,
            //match :[/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/],  // regex for password
            required : true
        }

} , {timestamps: true} )

module.exports = mongoose.model('author' , authorSchema)





// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
