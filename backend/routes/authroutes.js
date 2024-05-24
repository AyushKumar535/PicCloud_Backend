const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth')
router.get('/', (req, res) => {
    res.send("Auth routes is working")
})

// Sign up Api
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({
                message: "Email Already Exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashPass
        })
        await newUser.save();
        return res.status(200).json({
            message: "Sign up Successsully"
        })

    } catch (error) {
        return res.status(505).json({
            message: "Error in sign up"
        })
    }

})


// Sign in Api

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(405).json({
                message: "Invalid Credentials"
            })
        }
        const isPassCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPassCorrect) {
            return res.status(401).json({
                message: "Password is not correct"
            })
        }
        const token = jwt.sign({
            _id: existingUser.id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '50m' });
        existingUser.token = token
        await existingUser.save();
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({
            message: "Login Successfully",
            token
        })
    } catch (error) {
        return res.status(505).json({
            message: "Error in login"
        })
    }
})

router.get('/checkLogin', checkAuth, async (req, res) => {
    res.status(200).json({ message: "User is logged in" });
})
module.exports = router