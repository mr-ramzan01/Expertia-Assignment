const ErrorHandler = require("../middlewares/ErrorHandler.js");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Users = require("../models/userModel.js");
dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;


async function LoginUser(req, res) {
    try {
        // Checking User email
        let existingUser = await Users.findOne({email: req.body.email});
        if(!existingUser) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const passwordMatches = await bcrypt.compare(req.body.password, existingUser.password);
        if(passwordMatches) {

            // Generating token
            const token = jwt.sign({
                email: existingUser.email,
                _id: existingUser._id,
            }, jwt_secret_key);
            
            const options = {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                // maxAge: 500000000,
                httpOnly: true,
                // secure: true
            };
            res.status(200).cookie("ocialMedia_token", token, {...options}).send({
                success: true,
                message: 'Login Successfully',
            })
        }
        else {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



async function SignUPUser(req, res) {
    try {
        // Checking User
        let user = await Users.findOne({ email: req.body.email });
        if(user) {
            return res.status(403).send({
                success: false,
                message: 'User already exists'
            })
        }
        // Checking username
        let username = await Users.findOne({ username: req.body.username})
        if(username) {
            return res.status(400).send({
                success: false,
                message: 'Username already taken'
            })
        }
        // Hashing Password
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Creating User
        const newUser = await Users.create({...req.body, password: hashPassword});

        // Generating token
        const token = jwt.sign({
            email: newUser.email,
            _id: newUser._id,
            password: newUser.password
        }, jwt_secret_key);

        const options = {
            expires: new Date(Date.now() + 30*24*60*60*1000),
            // maxAge: 500000000,
            httpOnly: true,
            // secure: true
        };
        res.status(200).cookie("ocialMedia_token", token, {...options}).send({
            success: true,
            message: 'Signup successfully',
        })
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



module.exports = { SignUPUser, LoginUser };