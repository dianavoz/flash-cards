const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug'); //set method indicates which template to use: pug

//call the routes from routes/index.js and routes/cards.js
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
app.use(mainRoutes);
app.use('/cards', cardRoutes);
app.use('/static', express.static('public'));

app.use((res, req, next) => {
    // console.log('hello');
    const err = new Error('Oh no!');
    err.status = 400;
    next(err);
});

//handle the error
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

//listen the port at this port
app.listen('3000', () => {
    console.log('The app is running on localhost:3000');
});
