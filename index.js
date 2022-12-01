// uygulama routing yapısı için
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Routes import
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('db connection successfull')
    })
    .catch((err) => {console.log(err)});
app.use(express.json())
// usage of userRoute
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running ')
});