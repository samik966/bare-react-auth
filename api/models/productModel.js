const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type : String, required : true},
    author : {type : String, required : true},
    desc : {type : String, reuired : true},
    price : {type : Number, required : true},
    productImg : {type : String , required : true}

});

module.exports = mongoose.model('Product',productSchema);
