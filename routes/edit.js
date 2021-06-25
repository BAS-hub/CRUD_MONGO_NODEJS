import express from "express"
import {BookModel} from '../model/books'
import path from 'path'
import fs from 'fs'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage })


const route = express.Router()

route.get('/',(req,res)=>{
    res.render('edit')
})

route.post('/each/',upload.single('image'),(req,res)=>{
    
    var id = req.body.id
    var obj = {
      title: req.body.title,
      description: req.body.desc,
      image: {
          data: fs.readFileSync(path.join(__dirname +'/..'+'/uploads/' + req.file.filename)),
          contentType: 'image/png'
      },
      price: req.body.price,
      updated_at: Date.now()
  }
    BookModel.findByIdAndUpdate(id, obj, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.render('edit',{
          message: `Cannot update Book with id=${id}. Maybe Book was not found!`
        });
      } else res.render('edit',{ message: "Book was updated successfully." });
    })
    .catch(err => {
      res.render('edit',{
        message: "Error updating Book with id=" + id
      });
    });
  
})

module.exports = {
    route
}