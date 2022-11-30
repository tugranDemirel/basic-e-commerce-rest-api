// uygulama routing yapısı için
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('db connection successfull')
    })
    .catch((err) => {console.log(err)});

app.get('/api/test', () => {
    console.log('test is succesfull');
});

app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running ')
});