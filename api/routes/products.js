const express = require('express');
const router = express.Router();
const multer = require('multer');
const Products = require('../controllers/Products');

const checkAuth = require('../Auth/checkAuth');
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename : function(req, file, cb) {
        cb(null, new Date().toISOString()+ file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('File Type Not Supported'), false);
    }
}

const upload = multer({storage : storage, limits : {fileSize : 1024 * 1024 * 5}, fileFilter : fileFilter});


router.get('/', Products.get_product_all);
router.post('/', checkAuth, upload.single('productImg'), Products.post_product_data);
router.get('/:id', Products.get_product_byId);
router.patch('/:id', checkAuth, Products.update_product_byId);
router.delete('/:id', checkAuth, Products.delete_product_byId);

module.exports = router;
