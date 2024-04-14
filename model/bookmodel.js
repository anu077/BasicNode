const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bookSchema = new Schema({
   bookName: {
        type: String,
        unique: true
    },
  bookPrice: {
        type: Number,
    },  
    imageUrl : {
        type : String
    } 
   


})
 const Book = mongoose.model('book', bookSchema)
module.exports = Book;
