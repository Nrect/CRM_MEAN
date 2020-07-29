const express = require('express');

const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/client');


const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

//plagins
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use('/uploads',express.static('uploads'));
app.use(require('cors')());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);



module.exports = app;