const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const router = new express.Router();

router.post('/register', async(req, res, next) => {
    try{
        const {email, name, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = await new UserModel({email, name, password: hashedPassword}).save();
        const token = await jwt.sign({email: newUser.email}, process.env.SECRET_KEY, {expiresIn: '20s'});
        res.status(201).send({
            user: {
                email: newUser.email,
                token
            },
            message: 'A new user has been created'
        });
    }catch(err){
        next(err);
    }
});

module.exports = router;