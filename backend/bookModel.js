let mongoose = require('mongoose');

let bookSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },    
    
    year : {
        type : Date,
        required : true
    },
    image : {
        type : String,
        required : true
    },

    desc : {
        type : String,
        required : true
    }
}, {timestamps : true});


let myBookModel = mongoose.model('books', bookSchema);

module.exports={myBookModel};