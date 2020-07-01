const express = require('express');
const router = express.Router();

const Users = require('../controllers/Users');
const checkAuth = require('../middleware/Auth/checkAuth');

router.get('/', Users.get_user_all);
router.post('/signup', Users.post_user_data);
router.post('/login', Users.login_user);

router.delete('/:userId',checkAuth, Users.delete_user_byId);

module.exports = router;
