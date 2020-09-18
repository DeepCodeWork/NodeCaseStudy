const express = require('express');
const router = express.Router();
const {RegisterUser, LoginUser, LogoutUser, LogoutUserFromAllDevice} = require('../controllers/user');
const upload = require('../GridFS/GridFs');
const {isLoggedIn, isAdmin, isUser} = require('../middleware/auth');


//@Routes

//@router   api/user
//@desc     Register a user
//@access   public
//@method   POST
router.post('/user', RegisterUser);

//@router   api/user/login
//@desc     Login a user
//@access   public
//@method   POST
router.post('/user/login', LoginUser);

//@router   api/user/login
//@desc     Login a user
//@access   public
//@method   GET
router.get('/user/logout',isLoggedIn ,LogoutUser);

//@router   api/user/login
//@desc     Login a user
//@access   public
//@method   GET
router.get('/user/logoutAll',isLoggedIn ,LogoutUserFromAllDevice);

module.exports = router;