const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../Auth/checkAuth');
const Orders = require('../controllers/Orders');


router.get('/', checkAuth, Orders.get_order_all );
router.post('/', checkAuth, Orders.post_order_data);
router.get('/:id', checkAuth, Orders.get_order_byId);
router.patch('/:id', checkAuth, Orders.update_order_byId);
router.delete('/:id', checkAuth, Orders.delete_order_byId);



module.exports = router;
