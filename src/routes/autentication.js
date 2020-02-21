const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/singup', (req, res) => {
    res.render('Auth/singup')
});

router.post('/singup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/singup',
    failureFlash: true
}))

// router.post('/singup', (req, res) => {
//     passport.authenticate('local.singup',{
//         successRedirect: '/profile',
//         failureRedirect: '/singup',
//         failureFlash:true
//     })
//     res.send('resibido');
// });
router.get('/profile', (req, res) => {
    res.send('Profile')
})
module.exports = router;