import express from "express"
import multer  from 'multer'
import path from 'path'
import fs from 'fs'
import {BookModel} from '../model/books'

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
    res.render('add', {
        title: 'This is message sent from app.js'
      })
})

route.post('/', upload.single('image'), (req,res)=>{
    

    if (!req.body.title) {
        res.render('add',{ message: "Content can not be empty!" });
        return;
      }    

    var obj = {
        title: req.body.title,
        description: req.body.desc,
        image: {
            data: fs.readFileSync(path.join(__dirname +'/..'+'/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        price: req.body.price
    }
     BookModel.create(obj, (err, item) => {
        if (err) {
            res.render('add',{ message: err });
        }
        else {  
            res.render('add',{ message: "Successfully" });
        }   
    })
})
    
module.exports = {
    route
}