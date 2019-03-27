const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

//@route Get /users
//@ desc Test route
//@access Public
router.get('/', (req, res) => {
    console.log(req)
    res.send({
        msg: 'Users works'
    })
})

//@route Get /users/register
//@ desc register a user
//@access Public

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email})
    .then(user => {
        if (user) {
            return res.status(400).send({
                email: "E-mail Already Exists"
            })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // if (err) throw err;
                    newUser.password = hash
                    newUser.save()
                    .then(user => res.send(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})




module.exports = router