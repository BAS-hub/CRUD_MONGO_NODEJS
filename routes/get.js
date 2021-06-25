import express from "express"
import {BookModel} from '../model/books'
const route = express.Router()

route.get('/',(req,res)=>{
    res.render('get')
})


route.get('/all',(req,res)=>{
    BookModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.render('get',{message:err});
        }
        else {
            console.log('====================================');
            console.log(items);
            console.log('====================================');
            res.render('get', { items: items });
        }
    });
})

route.get('/:id', (req, res) => {
    const { id } = req.params

    BookModel.findById(id)
      .then(data => {
        if (!data)
          res.render('get',{ message: "Not found Book with id " + id });
        else res.render('get', { items: items });
      })
      .catch(err => {
        res.render('get',{ message: "Error retrieving Book with id=" + id });
      });
})

module.exports = {
    route
}