const express = require('express');
const router = express.Router();
const {isNotLoggedIn} = require('../lib/auth');
router.get('/',  isNotLoggedIn ,(req, res) => {
    res.redirect('/singin')
});


module.exports = router;