import express from "express"
import {BookModel} from '../model/books'
const route = express.Router()

route.get('/',(req,res)=>{
    res.render('delete')
})

route.get('/each/',(req,res)=>{
    const  id  = req.query.id

    BookModel.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.render('delete',{
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
        })
      } else {
        res.render('delete',{
          message: "Book was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id
      });
    });
})

module.exports = {
    route
}