const express = require('express')
const app = express()
const fs = require('fs')

const connectToDatabase = require('./database/index.js')
const Book = require('./model/bookmodel.js')


// multerconfig imports
const {multer,storage} = require('./middleware/multerconfig.js')
const upload = multer({storage : storage})


// Alternative
//  const app =require('express')


// cors package
const cors = require('cors')
app.use(cors({
    origin : "*"
})
    )


app.use(express.json())



connectToDatabase()

app.get ("/",(req,res)=>{
    res.status(200).json({
        message : "Success"
    })
    
})


//  create a new book
app.post("/book", upload.single("image"),async(req,res)=>{
console.log(req.body)

let fileName ;
if(!req.file){
    fileName ="https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_640.jpg"
}else{
    fileName = "http://localhost:3000/" + req.file.filename
 }

    const {bookName,bookPrice} = req.body
    await Book.create({
         bookName,
         bookPrice,
         imageUrl : req.file.filename
       
        })
    res.status(201).json({
     message : "Book Created Successfully"
    })
 })


 
// all read
app.get("/book",async (req,res)=>{
    const books = await Book.find() // return array ma garxa 
    res.status(200).json({
        message : "Books fetched successfully",
        data : books
    })
})


// single read
app.get("/book/:id",async(req,res)=>{
    const id = req.params.id
   const book = await Book.findById(id) // return object garxa
   
   if(!book) {
    res.status(404).json({
        message : "Nothing found"
    })
   }else{
    res.status(200).json({
        message : "Single Book Fetched Successfully",
        data : book
    })
   }  
})


//delete operation 
app.delete("/book/:id",async(req,res)=>{
    const id = req.params.id
   await Book.findByIdAndDelete(id)
   res.status(200).json({
        message : "Book Deleted Successfully"
   })
})


// update operation 
app.patch("/book/:id",async (req,res)=>{
    const id = req.params.id // kun book update garney id ho yo
    const {bookName,bookPrice} = req.body
    const oldDatas = await Book.findById(id)
    let fileName;
    if(req.file){
        
        const oldImagePath = oldDatas.imageUrl
        console.log(oldImagePath)
    
    const localHostUrlLength = "http://localhost:3000/".length
    const newOldImagePath = oldImagePath.slice(localHostUrlLength)
    console.log(newOldImagePath)
    fs.unlink(`storage/${newOldImagePath}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("File Deleted Successfully")
        }
    })
    fileName = "http://localhost:3000/" + req.file.filename
}


    await Book.findByIdAndUpdate(id,{
        bookName : bookName,
        bookPrice : bookPrice,  
        imageUrl : req.file.filename 
    })
    res.status(200).json({
        message : "Book Updated Successfully"
    })
})

app.use(express.static("./storage/"))


app.listen(3001,()=>{
    console.log("server is running at port 3001")
}) 