const mongoose = require('mongoose');
const Product = require('../models/productModel');


exports.get_product_all = (req, res, next) => {
    Product.find()
    .select("_id name author desc price productImg").exec()
    .then(result => {
        const response = {
            count : result.length,
            products : result.map( r => {
              return {
                _id : r._id,
                name : r.name,
                author : r.author,
                desc : r.desc,
                price : r.price,
                productImg : r.productImg,
                detailedInfo : {
                 type : 'GET',
                 url : 'http://localhost/products/'+r._id
                }
              }
            }),
        };
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            message : err
        });
    });
}

exports.post_product_data = (req,res,next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        author : req.body.author,
        desc : req.body.desc,
        price : req.body.price,
        productImg : req.file.path
    });
    product.save()
    .then( result => {
        res.status(201).json({
            message : ' Product submitted Successfully',
            productDetails : {
                _id : result._id,
                name : result.name,
                author : result.author,
                desc : result.desc,
                price : result.price,
                productImg : result.productImg
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message : 'Internal Server Error!'
        });
    });
}

exports.get_product_byId = (req,res,next) => {
    const id = req.params.id;
    Product.findById(id).select('_id name author desc price productImg').exec()
    .then(result => {
        if(result){
        res.status(200).json({
            productDetail : {
                _id : result._id,
                name : result.name,
                author : result.author,
                desc : result.desc,
                price : result.price,
                productImg : result.productImg
            }
        });
        }
        else {
            res.status(404).json({
                message : 'No Products Found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message : err
        });
    });
}



exports.update_product_byId = (req,res,next) => {
    const id = req.params.id;
    const UpdateObj = {};
    for (obj of req.body){
        UpdateObj[obj.dataName] = obj.value;
    }
    Product.updateOne({_id : id}, { $set :UpdateObj}).exec()
    .then( result => {
        res.status(200).json({
            message : 'Product Updated',
            info : {
                type : 'GET',
                url : 'http://localhost:3000/'+id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message : err
        });
    });
}

exports.delete_product_byId = (req,res,next) => {
    const id = req.params.id;
    Product.deleteOne({_id : id}).exec()
    .then(result => {
        res.status(200).json({
            message : 'Product Deleted!',
        });
    })
    .catch( err => {
        res.status(500).json({
            message : 'Unable to delete'
        });
    });
}


