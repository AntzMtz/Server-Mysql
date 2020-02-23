const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn , isNotLoggedIn}=require('../lib/auth')

router.get('/singup', isNotLoggedIn,(req, res) => {
    res.render('Auth/singup')
});

router.post('/singup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/singup',
    failureFlash: true
}))

router.get('/singin', isNotLoggedIn, (req, res) => {
    res.render('Auth/singin')
});

router.post('/singin', isNotLoggedIn, passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/singin',
    failureFlash: true
}));



router.get('/profile',isLoggedIn, (req, res) => {
    res.render('profile')
});

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/singin');
});

module.exports = router;