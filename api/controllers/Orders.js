const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.get_order_all = (req, res, next) => {
    Order.find().select('_id product quantity')
        .populate('product','name').exec()
    .then(result => {
        res.status(200).json({
            count : result.length,
            orders : result.map(r => {
                return {                                              _id : r._id,
                    product : r.product,                              quantity : r.quantity,
                    info : {
                        type : 'GET',
                        url : 'http://localhost:3000/orders/'+ r._id,
                    }                                             }
            }),
        });
    })
    .catch(err => {
        res.status(500).json({
            error :{
                message : err
            }
        });
    });
}


exports.post_order_data = (req, res, next) => {
    Product.findById(req.body.product)
    .then( prod => {
        if (!prod) {
            return res.status(404).json({
                message : 'Product Not Found'
            });
        }
        const orders = new Order({                            _id : new mongoose.Types.ObjectId(),
            product : req.body.product,                       quantity : req.body.quantity,
        });
        orders.save()
       .then(result => {
        res.status(201).json({
            message : 'Order has been Placed',
            orderDetail :{ 
                _id : result._id,
                product : result.product,
                quantity : result.quantity,
            },
        });
    })
    .catch(err => {
        res.status(500).json({
            error : {
                message : err
            }
        });
    });
    });
}

exports.get_order_byId = (req, res, next) => {
    const id = req.params.id;
    Order.findById({_id : id}).select('_id quantity product').populate('product','name author desc price productImg').exec()
    .then(result => { 
        if(result) {
            res.status(200).json({
                orders : result,
            });
        }
        else {                                                res.status(404).json({                                message : 'No such Order Found'                 });
        }
    })
    .catch(err => {
        res.status(500).json({
            error : {
                message : err,
            }
        });
    });
}

exports.update_order_byId = (req, res, next) => {
    const id = req.params.id;
    const updatedObject = {};

    for ( const obj of req.body ) {
        updatedObject[obj.dataName] = obj.value;
    }
    Order.updateOne({_id : id}, {$set : updatedObject}).exec()
    .then(result => {
        res.status(201).json({
            message : 'Order Updated !',
            info : {
                type : 'GET',
                url : 'http://locahost:3000/orders/'+ id,
            },
        });
    })
    .catch(err => {
        res.status(500).json({
            error : {
                message : err,
            }
        });
    });
}

exports.delete_order_byId = (req, res, next) => {
    const id = req.params.id;
    Order.deleteOne({_id : id }).exec()
    .then( result => {
        res.status(200).json({
        message : 'Order deleted!',
        });
    })
    .catch( err => {
        res.status(500).json({
            error : {
                message : err
            }
        });
    });
}









