import {Schema,model} from 'mongoose';

// Books
// - _id
// - title
// - description
// - image
// - price
// - created_at
// - updated_at

const Books = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    image :  {
        data: Buffer,
        contentType: String,
    },
    price : {
        type: Number,
        required: true
    },
    created_at : {
        type: Number,
        default: Date.now()
    },
    updated_at : {
        type: Date,
        default: null
    },
    
})


export const BookModel = model('BookModel', Books)
