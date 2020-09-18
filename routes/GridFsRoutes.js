const express = require('express');
const router = express.Router();
const {getFiles, upload} = require('../GridFS/GridFs');

//@router   api/user/login
//@desc     upload a file
//@access   USER
//@method   POST
router.post('/user/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
})

//@router   api/user/login
//@desc     upload a file
//@access   USER
//@method   POST
router.get('/user/files', getFiles);

module.exports = router;