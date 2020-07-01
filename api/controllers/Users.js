const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel.js');


exports.get_user_all = ( req, res, next) => {
    User.find().exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
}
exports.post_user_data = (req, res, next) => {
   User.find({email : req.body.email}).exec()
    .then( user => {
        if(user.length >= 1) {
            return res.status(422).json({
                message : 'User Already Exist!',
            });
        }
        else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
            if(error) {
                return res.status(500).json({
                    message : error
                });
            }
            else {
                const user = new User({
                    _id : new mongoose.Types.ObjectId(),
                    name : req.body.name,
                    phone : req.body.phone,
                    email : req.body.email,
                    password : hash
                }).save()
                .then(usr => {
                    //console.log(usr);
                    res.status(201).json({
                        message : 'User Created!',
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message : err
                    });
                });
            }
        });
      }
    });
}


exports.login_user = (req, res, next) => {
    User.find({ email : req.body.email}).exec()
    .then( usr => {
        if(usr.length < 1) {
            return res.status(401).json({
                message : 'Authentication Failed!'
            })
        }
        else {
            bcrypt.compare(req.body.password, usr[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message : 'Authentication Failed!'
                    });
                }
                if(result) {
                   const token = jwt.sign({userId : usr[0]._id, email:usr[0].email},'secretkey', {expiresIn : '1h'});
                    return res.status(200).json({
                        message : 'User Logged In',
                        token : token
                    });               
                }
                res.status(401).json({
                    message : 'Authentication Failed'
                })
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message : err
        });
    });
}

exports.delete_user_byId = (req, res, next) => {

    User.deleteOne({_id : req.params.userId}).exec()
    .then( usr => {
        res.status(200).json({
            message : 'User Deleted!',
        });
    })
    .catch( err => {
        res.status(500).json({
            message : err
        });
    });
}





