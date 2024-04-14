//async function connectToDatabase()

const mongoose = require('mongoose')
const ConnectionString ="mongodb+srv://anu:345@cluster0.nqrwx32.mongodb.net/?retryWrites=true&w=majority"
 async function connectToDatabase(){
   await  mongoose.connect(ConnectionString)
    console.log("connected to database")
}
module.exports = connectToDatabase;