//call express
const express = require('express');

//create router
const router = express.Router();

//routes
//get the root route
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    // res.render('hello');
    const name = req.cookies.username;
    if (name) {
        res.redirect('/', { name });
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    // res.cookie('username', req.body.username);
    res.clearCookie('username');
    res.redirect('/hello');
});

//export router to app.js
module.exports = router;