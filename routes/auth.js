const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString()
    })
    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
        console.log(savedUser)
    } catch(err){
        res.status(500).json(err)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
    const user = await User.findOne({
        username: req.body.username
        })
        !user && res.status(401).json('Wrong credentials')
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET)
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        originalPassword != req.body.password && res.status(401).json('Wrong credentials')
        // db ye bgalnınca kullanıcıya ait verileri _doc içerisinden çekiyoruz.
        const { password, ...other} = user._doc;
        res.status(200).json(other)
    }catch (err){
        res.status(500).json(err)
    }
})



module.exports = router;