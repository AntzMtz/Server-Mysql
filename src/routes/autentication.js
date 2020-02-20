const express = require('express');
const router = express.Router();

router.get('/singup', (req, res) => {
    res.render('Auth/singup')
});

router.post('/singup', (req, res) => {
    console.log(req.body);

    res.send('resibido');
});

module.exports = router;