const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const router = new express.Router();

router.post('/register', async(req, res, next) => {
    try{
        const {email, name, password} = req.body;
        const userExists = await UserModel.findOne({email});
        if(userExists){
            throw new Error('User already exists');
        }
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

router.post('/login', async(req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.CheckUserCredentials(email, password);
        const token = await jwt.sign({email: user.email}, process.env.SECRET_KEY, {expiresIn: '20s'});
        res.status(200).send({
            user: {
                email: user.email,
                token
            },
            message: 'Successfully logged in'
        });
    }catch(err){
        next(err);
    }
});

module.exports = router;