const mongoose = require('mongoose')
const emailValidator = require('email-validator')

const authorSchema = new mongoose.Schema({
     fname:{
        type : String ,
        required : true
     },
      lname: {
        type : String ,
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
        required: true,
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/]
      }, 
        password: {
            type : String,
            required : true
        }

} , {timestamps: true} )

module.exports = mongoose.model('author' , authorSchema)





// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }