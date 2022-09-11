const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//const passport = require('passport')
const connectDB = require('./config/db');
//const cookieSession = require('cookie-session');

require('dotenv').config({
    path: './config.env'
})

connectDB();

const authRoute = require('./routes');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'));
}

app.use(express.json());
//app.use(cookieSession({
   // name: 'session',
   // keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
//}));
//app.use(passport.initialize());
//app.use(passport.session());

app.use('/stark', authRoute);

app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        messsage: "Page not found"
    })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running at:  ${process.env.PORT}`);
});
