const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router')
const app = express();

/***************
 * bodyparser
 ***************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*************
 * mongoDB
 *************/
const mongoURI = 'mongodb://localhost/files';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;




/** static route */
let rootpath = __dirname+'/..';
console.log(rootpath);
app.use('/', express.static(`${rootpath}/UI-components/build`));

/***********
 * Routes
 ***********/
router.routes(app);


app.listen(3002, () => {
    console.log('listening to port 3002');
})